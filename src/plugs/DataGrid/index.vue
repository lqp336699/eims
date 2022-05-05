<template>
  <div>
    <data-table :rows="rows" />
  </div>
</template>

<script>
import DataTable from './DataTable'
import { tolist } from '@/utils/'
export default {
  name: 'DataGrid',
  components: { DataTable },
  props: {
    cols: { type: Array, default: () => [] },
    rows: { type: Array, default: () => [] },
    border: { type: Boolean, default: true },
    showSummary: { type: Boolean, default: false },
    summaryMethod: { type: Function },
    stripe: { type: Boolean, default: false },
    rowKey: { type: String, default: 'Id' },
    treeProps: { type: Object },
    defaultExpandAll: { type: Boolean, default: false },
    pagination: {
      type: [Object, Boolean, String],
      default: {
        sizeList: [10, 15, 20, 50, 100, 200],
        layout: 'total, sizes, prev, pager, next, jumper'
      }
    },
    rowClassName: { type: [Function, Object] },
    rowStyle: { type: [Function, Object] },
    cellClassName: { type: [Function, Object] },
    cellStyle: { type: [Function, Object] },
    loadData: { type: Function },
    loadSuccess: { type: Function }
  },
  data() {
    return {
      msg: 'test',
      edit_id: -1, // 999:总是显示
      row_index: -1, // 当前行ID
      data: {
        rows: [],
        selection: [1]
      },
      page: 1,
      size: 15,
      total: 0,
      url: '',
      qry: {},
      method: 'post',
      backCall: null,
      expands: []
    }
  },
  watch: {
    rows(v) {
      this.data.rows = v
    }
  },

  mounted() {
    for (var i = 0; i < this.cols.length; i++) {
      if (this.cols[i].prop) {
        this.cols[i].property = this.cols[i].prop
        // this.item.prop = undefined;
      }
    }
    //
    if (this.rows) {
      for (var i = 0; i < this.rows.length; i++) {
        this.rows[i].$row_id = i + 1 + (this.page - 1) * this.size
      }
      this.data.rows = this.rows
    }
  },
  created() {
    if (typeof this.pagination === 'string') {
      if (this.pagination.toLowerCase() == 'false') this.pagination = false
    }
  },
  methods: {

    // 函数接口
    // 使用POST方式获取数据列表
    setEmpty: function(msg) {
      if (this.$refs.empty) this.$refs.empty.innerHTML = msg
    },
    post: function(url, params, done) {
      this.edit_id = -1
      this.setEmpty('<span>努力加载中...</span>')
      this.url = url
      this.qry = params
      // this.baclCall = done;
      this.method = 'post'
      //
      var p = params
      if (this.pagination) {
        p.page = p.page ? p.page : this.page
        p.size = p.size ? p.size : this.size
        // p = mergeJSON(params, { page: this.page, size: this.size });
      }
      this.qry = p
      this.$axios
        .post(url, p)
        .then((rsp) => {
          this.setEmpty('（暂无数据）')
          console.log('LoadData', rsp)

          this.onloadData(rsp)
          if (done) {
            done({
              rows: this.data.rows,
              page: this.page,
              size: this.size,
              total: this.total
            })
          }
        })
        .catch((rsp) => {
          console.log(rsp)
          this.setEmpty('<span style="color:red;">加载错误！</span>')
        })
    },
    // 使用GET方法获取数据列表
    get: function(url, params, done) {
      this.edit_id = -1
      this.setEmpty('<span>努力加载中...</span>')
      this.url = url
      this.qry = params
      // this.backCall = done;
      this.method = 'get'
      //
      var p = params
      if (this.pagination) {
        //   p = mergeJSON(params, { page: this.page, size: this.size });
        p.page = p.page ? p.page : this.page
        p.size = p.size ? p.size : this.size
      }
      this.qry = p
      this.$axios
        .get(url, p)
        .then((rsp) => {
          // console.log('返回结果：', rsp.data);
          this.setEmpty('（暂无数据）')
          onloadData(rsp)
          if (done) {
            this.done(rsp.data, this.page, this.size)
          }
        })
        .catch((rsp) => {
          console.log(rsp)
          this.setEmpty('<span style="color:red;">加载错误！</span>')
        })
    },
    onloadData: function(rsp) {
      var { success, result, total } = rsp
      if (success) {
        this.data.rows = toList(result)
        this.total = total
        //
        if (this.total / this.size < this.page - 1) { this.page = parseInt(this.total / this.size) + 1 }
        for (var i = 0; i < this.data.rows.length; i++) {
          this.data.rows[i].$row_id = i + 1 + (this.page - 1) * this.size
          // console.log('#' + i, (i + 1) + (this.page - 1) * this.size);
        }
        if (this.loadSuccess) {
          this.loadSuccess({
            rows: this.data.rows,
            page: this.page,
            size: this.size,
            total: this.total
          })
        }
      } else {
        this.setEmpty('<span style="color:red;">加载失败！</span>')
      }
    },
    reload: function() {
      this.qry.page = this.page
      this.qry.size = this.size
      if (this.loadData) {
        this.edit_id = -1
        this.loadData()
      } else {
        switch (this.method) {
          case 'get':
            this.get(this.url, this.qry)
          case 'post':
            this.post(this.url, this.qry)
        }
      }
    },
    exportXls: function(cmd) {
      switch (cmd) {
        case 0:
          ExportCSV(this.cols, this.data.rows)
          break
        case 1:
          ExportXls(this.cols, this.data.rows)
          break
      }
    },
    printTable: function() {
      PrintTable(this.cols, this.data.rows)
    },
    handleSelectionChange: function(val) {
      this.data.selection = val
    },
    getSelection: function() {
      return this.data.selection
    },
    handleRowClick: function(row, column, event) {
      // console.log('点击行', row);
      this.row_index = row.row_index
      this.$emit('row-click', row, column, event)
    },
    getEditIndex: function() {
      return this.edit_id
    },
    // 设置编辑行ID，如果设false，则所有处于编辑状态
    setEditIndex: function(id) {
      this.edit_id = id
    },
    getData: function() {
      return this.data.rows
    },
    setData: function(v) {
      this.data.rows = v
    },
    handleCellClick: function(row, column, cell, event) {
      this.$emit('cell-click', row, column, cell, event)
    },
    handleCellDblClick: function(row, column, cell, event) {
      this.$emit('cell-dblclick', row, column, cell, event)
    },
    handleContextMenu: function(row, column, event) {
      this.$emit('row-contextmenu', row, column, event)
    },
    handleRowStyle: function(obj) {
      this.$emit('row-style', obj)
    },
    setRowClassName: function(p) {
      // 当前行号写到记录行中
      p.row.row_index = p.rowIndex
      p.row.$index = p.rowIndex
      if (this.rowClassName) return this.rowClassName(p)
      return ''
    },
    handlePageSize: function(v) {
      this.size = v
      this.reload()
    },
    handlePageChange: function(v) {
      this.page = v
      this.reload()
    },
    handlePrevPage: function(v) {
      this.page = v
      this.reload()
    },
    handleNextPage: function(v) {
      this.page = v
      this.reload()
    },
    toggleRowExpansion(row, expanded) {
      // 切换展开或折叠
      if (expanded) this.expands.push(row[this.rowKey])
      else {
        // 从展开列中移除
        var idx = this.expands.indexOf(row[this.rowKe])
        if (idx >= 0) this.expands.splice(idx, 1)
      }
    }
  }
}
</script>

<style scoped>
.col-check .el-row {
  padding: 0 0 3px 5px;
}
.row {
  display: flex;
  justify-content: space-between;
}

.row .col {
  min-width: 100px;
}
</style>
