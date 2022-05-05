<template>
  <div>
    <div style="height: 40px; padding: 10px">
      <el-button-group>
        <el-button type="primary" @click="loadData">刷新</el-button>
        <el-button type="primary" @click="add">新建备忘录</el-button>
      </el-button-group>
    </div>
    <div
      style="padding: 10px 0 0 10px; width: 100%; min-height: 100px"
      v-loading="loading"
    >
      <div class="empty" v-if="rows.length == 0">(暂无记录)</div>
      <el-row v-for="(i, r) in rowNum" :key="r">
        <el-col v-for="(j, c) in colNum" :key="c" :span="24 / colNum">
          <card
            v-if="r * colNum + c < rows.length"
            :row="rows[r * colNum + c]"
            @editClick="editRow"
            @delClick="delRow"
          ></card>
        </el-col>
      </el-row>
    </div>
    <div class="page">
      <div>
        <span>行数：</span>
        <el-select v-model="rowNum" style="width: 80px" @change="loadData">
          <el-option
            v-for="i in [3, 4, 5, 6, 7, 8]"
            :key="i"
            :label="i + '行'"
            :value="i"
          >
          </el-option>
        </el-select>
        <span>&nbsp;&nbsp;</span>
        <span>&nbsp;&nbsp;列数：</span>
        <el-select v-model="colNum" style="width: 80px" @change="loadData">
          <el-option
            v-for="i in [3, 4, 6, 8]"
            :key="i"
            :label="i + '列'"
            :value="i"
          >
          </el-option>
        </el-select>
      </div>
      <div>
        <el-pagination
          :page-size="pageSize"
          layout="prev, pager, next"
          :total="total"
          :current-change="loadData"
          :prev-click="loadData"
          :next-click="loadData"
        >
        </el-pagination>
      </div>
    </div>

    <el-dialog
      title="备忘录"
      :visible.sync="dlgShow"
      width="500"
      :close-on-click-modal="false"
    >
      <el-form :model="row" label-width="100px">
        <el-row>
          <el-col :span="16">
            <el-form-item label="主题">
              <el-input v-model="row.Topic" placeholder="必填"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="加密">
              <el-checkbox v-model="row.Encrypted">是</el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>

        <Tinymce ref="editor" v-model="row.Details" :height="300" />
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dlgShow = false">取 消</el-button>
        <el-button type="primary" @click="saveRow">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { toList } from "@/utils";
import card from "./card.vue";
import Tinymce from "@/components/Tinymce";
import Upload from "@/components/Upload/SingleImage3";

export default {
  components: { card, Tinymce, Upload },
  data() {
    return {
      qry: {
        query: {
          deleted: false,
        },
        page: { index: 1, size: 20 },
        cols: "Id,Topic,Details,Encrypted",
      },
      row: [],
      rows: [],
      rowNum: 3,
      colNum: 3,
      //pageCount: 1,
      total: 9,
      dlgShow: false,
      rowId: 0,
      loading: true,
    };
  },
  computed: {
    pageSize() {
      return this.rowNum * this.colNum;
    },
  },
  methods: {
    loadData() {
      this.loading = true;
      let ps = this.rowNum * this.colNum;
      this.qry.page.size = ps;
      this.$axios.post("api/oa/memo/list", this.qry).then((rsp) => {
        if (rsp.success) {
          this.rows = toList(rsp.result);
          this.total = rsp.total;
          // this.pageCount = rsp.total / ps;
          // if (rsp.total % ps > 0) this.pageCount++;
          this.loading = false;
        } else {
          this.loading = false;
          this.message.warning(rsp.msg);
        }
      });
    },
    add() {
      this.row = { Id: 0, Details: "", Encrypted: false };
      this.dlgShow = true;
    },
    editRow(id) {
      this.$axios.get("api/oa/memo/" + id).then((rsp) => {
        if (rsp.success) {
          this.row = rsp.result;
          this.dlgShow = true;
        } else {
          this.message.warning(rsp.msg);
        }
      });
      this.dlgShow = true;
    },
    delRow(id) {
      this.$alert("删除" + id);
    },
    saveRow() {
      this.$axios.post("api/oa/memo/save", this.row).then((rsp) => {
        if (rsp.success) {
          this.dlgShow = false;
          this.loadData();
        } else {
          this.message.warning(rsp.msg);
        }
      });
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style scoped>
.page {
  height: 40px;
  width: 100%;
  padding: 10px;
  clear: both;
}
.page > div {
  float: left;
}
.empty {
  width: 100%;
  height: 100px;
  line-height: 100px;
  text-align: center;
  vertical-align: middle;
  color: #ccc;
}
</style>
