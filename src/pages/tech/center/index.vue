<template>
  <div class="layout layout-v">
    <div class="layout-side" style="height: 40px">
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
          <el-button type="primary" @click="loadData">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="layout-content">
      <data-grid ref="grid" :border="false" :cols="cols" :pagination="true" />
    </div>
    <div class="layout-side" style="height: 30px">页脚</div>
  </div>
</template>

<script>
import DataGrid from '@/plugs/DataGrid/'

export default {
  components: { DataGrid },

  data() {
    return {
      qry: {},
      page: { index: 1, size: 30 },
      kinds: [],
      cols: [
        { template: 'opr', label: '操作', width: 140, align: 'center' },
        { type: 'index', label: '#', width: 50, align: 'center' },
        {
          property: 'CenterNo',
          label: '编号',
          width: 60,
          align: 'center'
        },
        { property: 'CenterName', label: '名称', width: 200 }
      ],
      grid_height: '100%'
    }
  },
  mounted() {
    this.loadKinds()
    this.loadData()
  },
  methods: {

    loadKinds() {
      this.$axios.get('api/tech/proc/kinds').then((rsp) => {
        var { success, result } = rsp
        if (success) {
          this.kinds = result
        }
      })
    },
    loadData() {
      var req = {
        query: this.qry,
        page: this.page
      }
      var g = this.$refs.grid
      console.log('Grid', g)
      this.$refs.grid.post('/api/pm/center/list', req, (rsp) => {
        this.page = rsp.page
      })
    }
  }
}
</script>

<style lang="scss">
.layout {
  display: -webkit-flex;
  display: flex;
  width: 100%;
  height: calc(100vh - 84px);
  min-height: 50px;
  flex-wrap: nowrap;
}

.layout-v {
  flex-flow: column;
}

.layout-side {
  flex-shrink: 0;
  flex-grow: 0;
}

.layout-content {
  flex-grow: 1;
  overflow: hidden;
}
</style>

