<template>
  <div class="layout-content layout">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "content",
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.layout-content {
  flex-grow: 1;
  overflow: hidden;
}
</style>
