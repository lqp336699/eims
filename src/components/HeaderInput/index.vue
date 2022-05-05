<template>
  <div class="box">
    <el-form :inline="true" :model="qry" :ref="qry">
      <el-form-item
        :label="item.text"
        v-for="(item, index) in qry.inp"
        :key="index"
      >
        <el-input v-model="item.value" />
      </el-form-item>
      <el-form-item
        v-for="item in qry.select"
        :key="item.text"
        :label="item.text"
      >
        <el-select v-model="item.val">
          <el-option
            v-for="item2 in item.value"
            :key="item2.value"
            :label="item2.text"
            :value="item2.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchData">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "HeaderInput",
  props: {
    qry: { type: Object, default: true },
  },
  data() {
    return {};
  },

  created() {},

  methods: {
    // 查询事件
    searchData() {
      this.$emit("search-data", this.qry);
    },
    // 重置事件
    reset() {
      this.qry.inp.forEach((item) => {
        item.value = "";
      });
      this.$store.dispatch("techCenter/searchData", {});
    },
  },
};
</script>

<style scoped>
.box{
  width:1200px;
}
</style>