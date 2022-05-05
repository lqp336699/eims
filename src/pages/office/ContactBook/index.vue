<template>
  <panel :vertical="true">
    <sider :width="200">侧边</sider>
    <content>主体</content>
  </panel>
</template>

<script>
import { panel, sider, content } from "@/plugs/LayoutPanel";

export default {
  components: { panel, sider, content },
  data() {
    return {};
  },
};
</script>

<style scoped>
</style>
