<template>
  <!-- 悬浮按钮 -->
  <div class="right">
    <div>
      <el-button size="mini" icon="el-icon-refresh" @click="refresh" />
    </div>
    <div>
      <el-button size="mini" icon="el-icon-printer" />
    </div>
    <div>
      <el-button size="mini" icon="el-icon-arrow-up" />
    </div>
    <div>
      <el-dropdown trigger="click">
        <el-button size="mini" icon="">
          <i class="el-icon-document-copy" />
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>导出Excel</el-dropdown-item>
          <el-dropdown-item>导出PDF</el-dropdown-item>
          <el-dropdown-item>导出CSV</el-dropdown-item>
          <el-dropdown-item>导出网页</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FloatBtn',
  data() {
    return {}
  },
  methods: {
    refresh() {
      this.$emit('my-refresh')
    }
  }
}
</script>
<style scoped>
.right {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
