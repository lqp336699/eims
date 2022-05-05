<template>
  <div class="page">
    <div class="header">
      <header-input  :hasProcType="true" :hasCenterName="true" />
    </div>
    <div>
      <center class="center" url="api/equ/mach/list" :header="header" />
    </div>
  </div>
</template>

<script>
// import MyDialog from "@/components/Dialog";
import HeaderInput from "@/components/HeaderInput";
import Center from "@/components/Center";
export default {
  components: { Center,HeaderInput },
  data() {
    return {
      // table的表头渲染
       header: [
          {
            title: "机型编号",
            key: "MachNo",
          },
          {
            title: "机型名称",
            key: "MachName",
          },
          {
            title: "加工中心",
            key: "Center_Id",
          },
          {
            title: "成本权值",
            key: "CostWeight",
          },
          {
            title: "准备工时",
            key: "ReadyMins",
          },
          {
            title: "备注",
            key: "Remark",
          },
          {
            title: "更新时间",
            key: "ModifTime",
          },
          {
            title: "需模",
            key: "HasMould",
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
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 84px);
}
.center{
  flex:1;
}
.wujinfoot{
  display: flex;
  justify-content: center;
  margin-top: 1vh;
}


</style>
