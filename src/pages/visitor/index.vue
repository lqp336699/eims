<template>
  <div class="page">
      <header-input :qry="qry" @search-data="searchData"/>
    <center url="/api/visitor/list"  :header="header" />
  </div>
</template>

<script>
import Center from "@/components/Center";
import HeaderInput from '@/components/HeaderInput'
export default {
  components: { Center,HeaderInput },
  data() {
    return {
      header: [
        {
          title: "访客姓名",
          key: "VisitorName",
          width: "150",
        },
        {
          title: "到访时间",
          key: "VisitTime",
          width: "160",
        },
        {
          title: "访客手机号",
          key: "Moblie",
          width: "160",
        },
        {
          title: "车牌号",
          key: "LicensePlate",
          width: "120",
        },
        {
          title: "来访事由",
          key: "Subject",
          'min-width':"120"
        },
      ],
      qry:{
          inp:[
              {text:'姓名',value:''},
              {text:'手机号',value:''}
          ]
      }
    };
  },
  methods:{
      searchData(val){
          console.log(val,"8888")
          let { inp } = val
          let options = {
              name:inp[0].value,
              title:inp[1].value,
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