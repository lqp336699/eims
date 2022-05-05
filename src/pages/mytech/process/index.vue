<template>
  <div class="page">
    <div class="header">
      <header-input :qry="qry" @search-data="searchData"/>
    </div>
    <div>
      <center class="center" url="api/tech/proc/list" :header="header">
        <!-- dialog
        <template v-slot:one>
          <el-form
            ref="ruleForm"
            :model="row"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-row>
              <el-col :span="12">
                <el-form-item label="工序编号" prop="ProcNo">
                  <el-input v-model="row.ProcNo" /> </el-form-item
              ></el-col>
              <el-col :span="12">
                <el-form-item label="工序名称" prop="ProcName">
                  <el-input v-model="row.ProcName" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="工序描述">
                  <el-input v-model="row.Remark" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="工作类序" prop="ProcType">
                  <el-select v-model="row.ProcType" placeholder="所有">
                    <el-option
                      v-for="(item, index) in kinds"
                      :key="index"
                      :label="item.text"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="生产中心" prop="CenterName">
                  <el-select v-model="row.CenterName" placeholder="所有">
                    <el-option label="区域一" value="shanghai" />
                    <el-option label="区域二" value="beijing" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="损耗率">
                  <el-input v-model="row.LossRate" /> </el-form-item
              ></el-col>
              <el-col :span="12">
                <el-form-item label="小时工资参数">
                  <el-input v-model="row.HourPay" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row class="wujin">
              <el-col :span="12">
                <el-form-item label="五金中心" prop="region">
                  <el-select v-model="row.region" placeholder="无">
                    <el-option label="区域一" value="shanghai" />
                    <el-option label="区域二" value="beijing" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12" class="wujinfoot">
                <el-checkbox v-model="row.IsDeleted" label="需要模具" />
                <el-checkbox v-model="row.Enabled" label="启用" />
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="备注说明">
                  <el-input v-model="row.ProcDesc" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </template> -->
      </center>
    </div>
  </div>
</template>

<script>
import HeaderInput from "@/components/HeaderInput";
import Center from "@/components/Center";
import { get_kinds } from '@/api/mytech';

export default {
  components: { Center, HeaderInput },
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
      ruleForm: {
          ProcNo: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          ProcName: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          CenterName: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          region: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
        },
      row:{},
      qry:{}
    };
  },
  
  created(){
    get_kinds().then(res => {
      this.qry={
        inp:[{text:"工序名称",value:""}],
        select:[{text:"工序类型", value:res, val:''},{text:"工作中心",value:[],val:''}]
      }
    })
  },  
  methods:{
    searchData(val){
      let options={
        name:val.inp[0].value,
        kinds:val.select[1].val
      }
       this.$store.dispatch("techCenter/searchData",options);
    }
  }
};
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
