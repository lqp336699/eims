<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import adminDashboard from "./admin";
import editorDashboard from "./editor";

export default {
  name: "Dashboard",
  components: { adminDashboard, editorDashboard },
  data() {
    return {
      currentRole: "adminDashboard",
    };
  },
  computed: {
    // 无论是 mapState 还是 mapGetters，都是注入到当前的计算属性中。而后者存在的意义是对 state 的计算属性，本质是对 state 中的数据进行一些计算，比例如数据的修饰之类的，这其实是一个代码解耦的过程。而你描述的场景确实是只要 mapState，但是并不能说 mapGetters 没有存在的意义，只是你把 state 中的数据在 mutation 阶段就处理掉完了（计算），所以就用不到 getters 做计算，只需要直接访问 state。
    ...mapGetters(["roles"]),
  },
  created() {
    if (!this.roles.includes("admin")) {
      this.currentRole = "editorDashboard"; //是否为管理员
    }
  },
};
</script>
