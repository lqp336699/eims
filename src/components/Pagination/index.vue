<template>
  <div class="pagination" :v-if="pageCount == 0 ? false : true">
    <el-pagination
      :page-size="size"
      :page-count="pageCount"
      :current-page="currentPage"
      :page-sizes="pageSize"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>

export default {
  name: 'Pagination',
  props: {
    total: {
      required: true,
      type: Number
    },
    pageCount: {
      required: true,
      type: Number
    },
    currentPage: {
      type: Number,
      default: 1
    },
    size: {
      type: Number,
      default: 8
    },
    pageSize: {
      type: Array,
      default() {
        return [10, 20, 30, 50]
      }
    }
  },
  computed: {
    // currentPage: {
    //   get() {
    //     return this.page
    //   },
    //   set(val) {
    //     this.$emit('update:page', val)
    //   }
    // },
    // pageSize: {
    //   get() {
    //     return this.limit
    //   },
    //   set(val) {
    //     this.$emit('update:limit', val)
    //   }
    // }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('size-change', { page: this.currentPage, size: val })
    },
    handleCurrentChange(val) {
      this.$emit('current-change', { page: val, size: this.size })
    }

  }
}
</script>

<style scoped>

</style>
