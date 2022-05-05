<template>
  <div>
    <template v-if="item.columns">
      <el-table-column :align="item.align" :label="item.label">
        <data-column v-for="(c,key) in item.columns" :key="key" :item="c">
          <template slot="cell" slot-scope="scope">
            <slot
              name="cell"
              :row="scope.row"
              :col="scope.col"
              :index="scope.index"
              :rowid="scope.index+(page-1)*size"
              :item="scope.item"
              :editing="scope.editing"
            ></slot>
          </template>
        </data-column>
      </el-table-column>
    </template>
    <template v-else>
      <el-table-column
        v-if="item.template"
        :property="item.property"
        :label="item.label"
        :resizable="item.resizable"
        :fixed="item.fixed"
        :width="item.width"
        :align="item.align"
      >
        <template slot-scope="scope">
          <div v-if="typeof(item.template)=='function'" v-html="item.template(scope)"></div>
          <slot
            v-else
            name="cell"
            :row="scope.row"
            :col="scope.column"
            :index="scope.$index"
            :item="item"
            :editing="scope.$index==edit_id"
          ></slot>
        </template>
      </el-table-column>
      <el-table-column
        v-else-if="item.editor"
        :property="item.property"
        :label="item.label"
        :resizable="item.resizable"
        :fixed="item.fixed"
        :width="item.width"
        :align="item.align"
      >
        <template slot-scope="scope">
          <template v-if="edit_id==scope.$index||edit_id==999">
            <template v-if="typeof(item.editor)=='object'">
              <el-date-picker
                v-if="item.editor.type=='date'"
                type="date"
                size="small"
                v-model="scope.row[scope.column.property]"
                :placeholder="item.editor.placeholder"
                style="width:100%;"
              ></el-date-picker>
              <el-checkbox
                v-else-if="item.editor.type=='checkbox'"
                v-model="scope.row[item.property]"
                :placeholder="item.editor.placeholder"
              ></el-checkbox>
              <el-select
                v-else-if="item.editor.type=='combobox'"
                v-model="scope.row[item.property]"
                :placeholder="item.editor.placeholder"
              >
                <el-option
                  v-for="(r,key) in item.editor.items"
                  :key="key"
                  :label="typeof r=='string'?r:r.label"
                  :value="typeof r=='string'?r:r.value"
                ></el-option>
              </el-select>
              <el-input-number
                v-else-if="item.editor.type=='number'"
                size="small"
                v-model="scope.row[item.property]"
                :min="item.editor.min"
                :max="item.editor.max"
                :precision="item.editor.precision"
                :controls="false"
                style="width:100%;"
              ></el-input-number>
              <el-input
                v-else
                size="small"
                v-model="scope.row[item.property]"
                :placeholder="item.editor.placeholder"
                :maxlength="item.editor.maxlength"
              ></el-input>
            </template>
            <template v-else-if="typeof(item.editor)=='string'">
              <el-date-picker
                v-if="item.editor=='date'"
                type="date"
                size="small"
                v-model="scope.row[scope.column.property]"
              ></el-date-picker>
              <el-checkbox v-else-if="item.editor=='checkbox'" v-model="scope.row[item.property]"></el-checkbox>
              <el-input-number
                v-else-if="item.editor=='number'"
                size="small"
                v-model="scope.row[item.property]"
                :controls="false"
                style="width:100%;"
              ></el-input-number>
              <el-input v-else size="small" v-model="scope.row[item.property]"></el-input>
            </template>
          </template>
          <template v-else>
            <span
              v-if="item.formatter"
              v-html="item.formatter(scope.row,scope.column,scope.row[item.property],scope.$index)"
            ></span>
            <span v-else>{{scope.row[item.property]}}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column
        v-else
        :type="item.type"
        :width="item.width"
        :show-overflow-tooltip="true"
        :align="item.align"
        :property="item.property"
        :label="item.label"
        :resizable="item.resizable"
        :formatter="item.formatter"
      ></el-table-column>
    </template>
  </div>
</template>

<script>
export default {
  name: "DataColumn",
  props: {
    item: { type: Object },
    edit_id: { type: Number, default: -1 },
    page: { type: Number, default: 1 },
    size: { type: Number, default: 15 }
  }
};
</script>
