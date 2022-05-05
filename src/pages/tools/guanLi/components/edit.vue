<template>
  <div class="page">
    <div class="inp">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-position="left"
        :inline="true"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="API服务名" prop="pass" style="margin-right: 20px">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="服务标题" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-checkbox class="isAble" v-model="checked">启用</el-checkbox>
    </div>
    <div class="des">
      <el-form>
        <el-form-item label="描述说明">
          <el-input
            type="textarea"
            :rows="8"
            placeholder="请输入内容"
            show-word-limit
            v-model="ruleForm.des"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="inp inps">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-position="left"
        :inline="true"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="服务路由" prop="pass" style="margin-right: 20px">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="访问方法" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary">服务测试</el-button>
    </div>
    <div class="inp inps">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-position="left"
        :inline="true"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="输入参数" prop="pass" style="margin-right: 20px">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="输出结果" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
        age: "",
        des: "",
      },
      checked: true,
    };
  },
};
</script>

<style scoped>
.page {
  padding: 20px;
  background-color: rgb(240, 240, 240);
  min-height: calc(100vh - 84px);
}
.inp {
  display: flex;
  align-items: center;
}

.el-form-item {
  margin-bottom: 0;
}
.isAble {
  margin-left: 20px;
}
.inps {
  margin-top: 20px;
}
</style>
