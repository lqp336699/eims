<template>
  <div class="layout" :class="{ 'layout-v': IsVertical }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "panel",
  props: {
    vertical: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isVertical: false,
    };
  },
  watch: {
    vertical(val) {
      this.isVertical = val;
    },
  },
  created() {
    this.IsVertical = this.vertical;
  },
};
</script>

<style scoped>
.layout {
  display: -webkit-flex;
  display: flex;
  width: 100%;
  height: 100%;
  flex-wrap: nowrap;
}

.layout-v {
  flex-flow: column;
}
</style>
