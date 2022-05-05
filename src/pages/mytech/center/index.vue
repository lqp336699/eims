<template>
  <div class="page">
    <div class="header">
      <header-input  :qry="qry"  />
    </div>
      <center class="center" url="api/pm/center/list" :header="header">
        <!-- dialog -->
        <template v-slot:one>
          <el-form
            ref="ruleForm"
            :model="row"
            :rules="rules"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-row>
              <el-col :span="12">
                <el-form-item label="中心编号" prop="ProcNo">
                  <el-input v-model="row.ProcNo" /> </el-form-item
              ></el-col>
              <el-col :span="12">
                <el-form-item label="中心名称" prop="ProcName">
                  <el-input v-model="row.ProcName" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="wujin">
              <el-col :span="12">
                <el-form-item label="生产类型" prop="region">
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
              <el-col :span="12" class="wujinfoot">
                <el-checkbox v-model="row.Enabled" label="启用" />
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="人工成本系数">
                  <el-input v-model="row.LossRate" /> </el-form-item
              ></el-col>
              <el-col :span="12">
                <el-form-item label="制造费用系数">
                  <el-input v-model="row.HourPay" />
                </el-form-item>
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
        </template>
      </center>
  </div>
</template>

<script>
import HeaderInput from "@/components/HeaderInput";
import Center from "@/components/Center";
import { mapGetters } from "vuex";

export default {
  components: { Center, HeaderInput },
  data() {
    return {
      // table的表头渲染
      header: [
        {
          title: "编号",
          key: "CenterNo",
        },
        {
          title: "名称",
          key: "CenterName",
        },
        {
          title: "类型",
          key: "CenterKind",
        },
        {
          title: "人工费权值",
          key: "PersonCost",
        },
        {
          title: "制造费全值",
          key: "ManufCost",
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
          title: "更新人",
          key: "Modifor",
        },
        {
          title: "启用",
          key: "Enabled",
        },
      ],
      ruleForm: {
        ProcNo: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        ProcName: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
        CenterName: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        region: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change",
          },
        ],
      },
      row: {},
      qry: {
        inp: [
          { text: "中心名称", value: "" },
        ],
        select:[{
          text: "工序类型", value: ''
        }]
      },
    }
  },
  computed: {
    ...mapGetters(["kinds"]),
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
