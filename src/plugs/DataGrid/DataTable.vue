<template>
  <div>
    <div class="tool-bar">
      <div class="tool-content">
        <el-button-group>
          <slot name="toolbar" :data="data.rows" />
        </el-button-group>
      </div>

      <!-- 按钮 -->
      <div class="tool-right" style="display: flex">
        <slot name="right-toolbar" :msg="msg" />
        <el-button-group>
          <el-button
            size="medium"
            icon="el-icon-refresh"
            title="刷新"
            @click="reload"
          />
          <el-button
            size="medium"
            icon="el-icon-printer"
            title="打印"
            @click="printTable"
          />
        </el-button-group>

        <div>
          <el-dropdown @command="exportXls">
            <el-button size="medium" icon="el-icon-document-copy" />
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="0">导出CSV文档</el-dropdown-item>
              <el-dropdown-item command="1">导出Excel</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

        <div>
          <el-dropdown>
            <el-button
              size="small"
              icon="el-icon-notebook-2"
              title="列管理"
            />
            <el-dropdown-menu slot="dropdown">
              <el-row
                v-for="(col, key) in this.cols"
                :key="key"
                class="col-item"
              >
                <el-checkbox
                  v-model="col.visiable"
                  :checked="col.visiable || col.visiable == undefined"
                >{{ col.label }}</el-checkbox>
              </el-row>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <!-- list列表 -->
    <el-table
      :data="data.rows"
      :border="border"
      :show-summary="showSummary"
      :summary-method="summaryMethod"
      :stripe="stripe"
      highlight-current-row
      height="250px"
      :row-key="rowKey"
      :expand-row-keys="expands"
      :tree-props="treeProps"
      :default-expand-all="defaultExpandAll"
      :row-class-name="setRowClassName"
      :row-style="rowStyle"
      :cell-class-name="cellClassName"
      :cell-style="cellStyle"
      @selection-change="handleSelectionChange"
      @row-click="handleRowClick"
      @cell-click="handleCellClick"
      @cell-dblclick="handleCellDblClick"
      @row-contextmenu="handleContextMenu"
      @toggleRowExpansion="toggleRowExpansion"
    >
      <data-column
        v-for="(item, key) in this.cols.filter((item) => {
          return item.visiable || item.visiable == undefined;
        })"
        :key="key"
        :item="item"
        :edit_id="edit_id"
        :page="page"
        :size="size"
      >
        <template slot="cell" slot-scope="scope">
          <slot
            name="cell"
            :row="scope.row"
            height="250"
            :col="scope.col"
            :index="scope.index"
            :page="page"
            :size="size"
            :item="scope.item"
            :editing="scope.editing"
          />
        </template>
      </data-column>
      <template slot="empty">
        <div ref="empty">
          <span>暂无记录</span>
          {{ rows }}
        </div>
      </template>
    </el-table>

    <el-pagination
      v-if="pagination"
      :current-page="page"
      :page-sizes="pagination.sizeList"
      :page-size="size"
      :layout="pagination.layout"
      :total="total"
      @size-change="handlePageSize"
      @current-change="handlePageChange"
      @prev-click="handlePrevPage"
      @next-click="handleNextPage"
    />
  </div>
</template>

<script>
import { toList } from '@/utils'
import DataColumn from './DataColumn'

export default {
  name: 'DataTable',
  components: { 'data-column': DataColumn },
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

    onloadData: function(rsp) {
      console.log('loaddata', rsp)
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
    setEmpty: function(msg) {
      if (this.$refs.empty) this.$refs.empty.innerHTML = msg
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
.tool-bar {
  display: -webkit-flex;
  display: flex;
  width: 100%;
  height: 40px;
  flex-wrap: nowrap;
}

.tool-content {
  flex-grow: 1;
  overflow: hidden;
}

.tool-right {
  flex-shrink: 0;
  flex-grow: 0;
}
</style>
