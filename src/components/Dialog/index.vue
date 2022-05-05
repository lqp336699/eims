<template>
  
</template>

<script>
export default {
  name: 'MyDialog',
  props: {
    dialogVisible: { type: Boolean, default: false },
    title: { type: String, default: '' },
    type:''
  },
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      }
    }
  },
  methods: {
    handleClose(done) {
      this.$emit('update:dialogVisible', false)
    },
    myhandleClose() {
      this.$emit('update:dialogVisible', false)
    },
    handleEditDefine() {
      this.$emit('define-edit')
    },
    handleAddDefine() {
      this.$emit('define-add')
    }
  }
}
</script>

<style scoped>
.wujin {
  display: flex;
  align-items: center;
}
.wujinfoot {
  display: flex;
  align-items: baseline;
  justify-content: center;
  margin-bottom: 20px;
}
</style>
