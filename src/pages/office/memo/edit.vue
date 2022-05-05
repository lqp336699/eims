<template>
  <el-dialog
    title="备忘录"
    :visible.sync="dialogVisible"
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
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import Tinymce from "@/components/Tinymce";
import Upload from "@/components/Upload/SingleImage3";

export default {
  name: "Editor",
  components: { Tinymce, Upload },
  props: {
    dialogVisible: false,
    memo: { type: Object },
  },
  data() {
    return {
      row: {},
      visible: false,
    };
  },
  watch: {
    memo(val) {
      this.row = val;
    },
    dialogVisible(val) {
      this.visible = val;
    },
  },
  methods: {
    readRow(id) {},
    saveRow() {
      console.log("保存", this.data);
    },
    delRow(id) {},
  },
  mounted() {
    //console.log("获取键值：", this.rowId);
  },
};
</script>

<style scoped>
</style>

