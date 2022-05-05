<template>
  <div>
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :lg="24">
        <el-table
          v-loading="loading"
          :data="tableData"
          style="width: 100%"
          size="medium "
          :border="true"
          height="398"
          :highlight-current-row="true"
          @row-dblclick="handleDblclick"
          @row-click="handleClick"
        >
          <el-table-column
            v-for="item in mycols"
            :key="item.key"
            :property="item.key"
            :label="item.title"
            min-width="120"
            :width="item.width"
            :resizable="true"
            align="center"
            :show-overflow-tooltip="true"
          >
            <div slot-scope="scope">
              <el-checkbox
                v-if="['IsDeleted', 'Enabled'].includes(item.key)"
                v-model="scope.row[scope.column.property]"
              />
              <span
                v-if="
                  ['IsDeleted', 'Enabled'].includes(item.key) ? false : true
                "
                style="margin-left: 10px"
                >{{ scope.row[scope.column.property] }}</span
              >
            </div>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "TableList",
  props: {
    tableData: { type: Array, default: () => [] },
    mycols: { type: Array, default: () => [] },
    loading: { type: Boolean, default: false },
  },
  methods: {
    handleDblclick(data) {
      this.$emit("handle-dblclick", data);
    },
    handleClick(data) {
      this.$emit("handle-click", data);
    },
  },
};
</script>
