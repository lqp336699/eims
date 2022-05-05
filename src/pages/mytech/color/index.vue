<template>
  <div class="page">
    <div class="header">
      <header-input :hasColorRaw="true" :hasColor="true" :hasColorCode="true" :hasColorName="true" />
    </div>
    <div>
      <center url="api/tech/proc/list" :header="header" />
    </div>
    
  </div>
</template>

<script>
import HeaderInput from "@/components/HeaderInput";
import Center from "@/components/Center";
export default {
  components: { Center,HeaderInput },
  data() {
    return {
      // table的表头渲染
      header: [
        {
          title: "工序编号",
          key: "ProcNo",
        },
        {
          title: "工序名称",
          key: "ProcName",
        },
        {
          title: "工序类型",
          key: "ProcType",
        },
        {
          title: "生产中心",
          key: "CenterName",
        },
        {
          title: "损耗率",
          key: "LossRate",
        },
        {
          title: "小时工资",
          key: "HourPay",
        },
        {
          title: "备注",
          key: "ProcDesc",
        },
        {
          title: "更新时间",
          key: "ModifTime",
        },
        {
          title: "更新人",
          key: "Modifor",
        },
        {
          title: "标记",
          key: "ProcTag",
        },
        {
          title: "需模",
          key: "IsDeleted",
        },
        {
          title: "启用",
          key: "Enabled",
        },
      ], 

    };
  },
};

// import MyDialog from "@/components/Dialog";



</script>

<style scoped>
.page {
  padding: 2vh;
}

</style>
