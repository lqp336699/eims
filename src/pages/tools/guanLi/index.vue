<template>
  <div class="page">
    <header-input @search-data="searchData" :qry="qry" />
    <center url="api/power/actions" :header="header" :route="true"></center>
  </div>
</template>

<script>
import Center from "@/components/Center";
import HeaderInput from "@/components/HeaderInput";


export default {
  components: { Center, HeaderInput },
  data() {
    return {
      qry: {
        inp: [
          { text: "API名称", value: "" },
          { text: "组别", value: "" },
          { text: "标题", value: "" },
          { text: "路由", value: "" },
        ],
        select:[]
      },
      header: [
        {
          title: "名称",
          key: "Title",
          width: "150",
        },
        {
          title: "地址",
          key: "Route",
          width: "160",
        },
        {
          title: "参数",
          key: "InputDesc",
        },
        {
          title: "请求方式",
          key: "Mothod",
          width: "80",
        },
        {
          title: "API服务名",
          key: "ActionName",
          width: "120",
        },
        {
          title: "启用",
          key: "IsDeleted",
          width: "60",
        },
      ],
    };
  },
  
  methods:{
    //   searchData改变了自动刷新列表
      searchData(val){
          let { inp } = val
          let options = {
              name:inp[0].value,
              title:inp[1].value,
              route:inp[2].value,
              ctrl:inp[3].value,
          }
          console.log(options,inp,val,"000000")

          this.$store.dispatch("techCenter/searchData",options);
      }
  }
};
</script>

<style scoped>
.page{
    padding:20px;
    
}
</style>
