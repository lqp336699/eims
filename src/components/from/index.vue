<template>
  <div>
    <el-form :inline="true" :model="qry" class="demo-form-inline">

      <el-form-item label="工作名称">
        <el-input v-model="qry.name" />
      </el-form-item>
      <el-form-item label="工序类型">
        <el-select v-model="qry.kinds" placeholder="(所有)">
          <el-option
            v-for="(item, i) in kinds"
            :key="i"
            :label="item.text"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchData">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
