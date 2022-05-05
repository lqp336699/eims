<template>
  <el-card style="margin: 0 10px 10px 0">
    <div slot="header" class="header">
      <div class="h_title">
        <span>{{ row.Topic }}</span>
      </div>
      <div class="h_btn">
        <el-button-group style="float: right">
          <el-button
            icon="el-icon-edit"
            size="mini"
            type="text"
            style="width: 30px"
            title="编辑"
            @click="editRow"
          ></el-button>
          <el-button
            icon="el-icon-close"
            size="mini"
            type="text"
            style="width: 30px"
            title="移除"
            @click="delRow"
          ></el-button>
        </el-button-group>
      </div>
    </div>
    <div style="height: 140px; overflow: auto" v-html="row.Details"></div>
  </el-card>
</template>

<script>
export default {
  name: "Card",
  props: {
    row: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  methods:{
    editRow(){
      this.$emit('editClick', this.row.Id)
    },
    delRow(){
      this.$emit('delClick', this.row.Id)
    }
  }
};
</script>

<style scoped>
.header {
  display: flex;
}

.header > .h_title {
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  line-height: 29px;
  vertical-align: middle;
  font-size: 16px;
  font-weight: bold;
}

.header > .h_btn {
  flex-grow: 0;
  width: 90px;
  min-width: 90px;
}
</style>
