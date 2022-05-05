<template>
  <div class="box">
    <div class="action">
      <!-- 按钮操作 -->
      <div class="btns">
        <el-button type="primary" @click="handleAdd">新增</el-button>
        <el-button type="primary" :disabled="isEdit" @click="handleEdit"
          >编辑</el-button
        >
        <el-button type="primary" :disabled="isEdit" @click="handleDel"
          >删除</el-button
        >
      </div>
      <div>
        <float-btn @my-refresh="refresh" v-if="device !== 'mobile'" />
      </div>
    </div>
    <!-- list列表 -->
    <div class="list">
      <table-list
        :loading="table.loading"
        :table-data="table.tableData"
        :mycols="header"
        @handle-click="handleClick"
        @handle-dblclick="handleDblclick"
      />
    </div>
    <!-- 分页 -->
    <div>
      <div class="paginationBox">
        <pagination
          :size="paginationState.size"
          :total="paginationState.total"
          :current-page="paginationState.currentPage"
          :page-count="paginationState.pagerCount"
          :page-size="paginationState.pageSize"
          @current-change="handelCurrentChang"
          @size-change="handleSizeChange"
        />
      </div>
    </div>
    <!-- dialog对话框 -->
    <div class="dialog">
      <el-dialog
        width="48%"
        :visible="dialog.dialogVisible"
        @close="handleClose"
      >
        <!-- 表单 -->
        <div>
          <slot name="one" />
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="myhandleClose">取 消</el-button>
          <el-button
            type="primary"
            v-if="dialog.type == 'Edit'"
            @click="handleEditDefine"
            >确 定</el-button
          >
          <el-button
            type="primary"
            v-if="dialog.type == 'Add'"
            @click="handleAddDefine"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import TableList from "@/components/list";
import FloatBtn from "@/components/FloatBtn";
import { PublicLoadData } from "@/api/publicApi";
import Pagination from "@/components/Pagination";
import { mapGetters } from "vuex";

export default {
  components: { TableList, Pagination, FloatBtn },
  name: "Center",
  props: {
    url: { type: String, default: true },
    header: { type: Array, default: true },
    route:{type: Boolean, default: false},
  },
  data() {
    return {
      dialog: {
        dialogVisible: false,
        type: "",
      },
      isEdit:true,
      table: {
        tableData: [], // 列表数据
        loading: false, // 刷新的状态
        myRow: {}, // 修改用的myRow
        cols: [],
      },
      paginationState: {
        pagerCount: 2,
        pageSize: [8, 16, 24],
        currentPage: 1, // 当前所在页
        total: 0,
        pageCount: 3, // 总页码数
        size: 8, // 每页显示个数
      },
    };
  },
  watch: {
    searchData: function () {
      this.refresh();
    },
    $route(to, from) {
      console.log(to, from);
    },
  },
  computed: {
    ...mapGetters(["kinds", "device", "searchData"]),
  },
  mounted() {
    this.loadData();
  },
  methods: {
    // 加载初始化数据
    loadData() {
      let options = {
        page: {
          index: this.paginationState.currentPage,
          size: this.paginationState.size,
        },
        query: this.searchData,
      };
      return new Promise((resolve) => {
        PublicLoadData(this.url, options, this.kinds).then((res) => {
          console.log(res, "loadData");
          this.table.tableData = res.data;
          this.paginationState.total = res.total;
          resolve({ success: "ok" });
        });
      });
    },
    // 页码改变
    handelCurrentChang(val) {
      this.paginationState.currentPage = val.page;
      this.paginationState.size = val.size;
      this.loadData();
    },
    // 获取数量改变
    handleSizeChange(val) {
      this.paginationState.currentPage = val.page;
      this.paginationState.size = val.size;
      this.loadData();
    },
    // 双击列表的数据
    handleDblclick(val) {
      this.isEdit = false;
      this.myRow = Object.assign({}, val); // 解决地址冲突
      this.handleEdit();
    },

    // 单击
    handleClick(val) {
      this.isEdit = false;
      this.myRow = Object.assign({}, val); // 解决地址冲突
    },
    // 刷新
    refresh() {
      this.table.loading = true;
      this.loadData()
        .then((res) => {
          if (res.success == "ok") {
            setTimeout(() => {
              this.table.loading = false;
            }, 500);
          }
        })
        .catch((res) => {
          if (res.success == "fail") {
            this.$message("刷新失败");
          }
        });
    },
    // dialog关闭按钮
    handleClose(done) {
      this.dialog.dialogVisible = false;
    },
    myhandleClose() {
      this.dialog.dialogVisible = false;
    },
    // 新增
    handleAdd() {
      if (this.route) {
        this.$router.push({ path: '/tools/guanLi/edit' })
      } else {
        this.dialog.dialogVisible = true;
        this.dialog.type = "Add";
      }
    },
    //删除
    handleDel(){
      console.log("999P")
    },
    //编辑
    handleEdit(){
      console.log("999P")
    },
  },
};
</script>

<style scoped>
.box {
  display: flex;
  height: 100%;
  justify-content: space-between;
  flex-direction: column;
}
.action {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.list {
  flex: 1;
}
.btns {
  margin-bottom: 2vh;
}
.paginationBox {
  margin-top: 2vh;
}
</style>