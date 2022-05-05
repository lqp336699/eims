<template>
  <div class="layout-side">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "sider",
  data() {
    return {
      minSize: 0,
      maxSize: 0,
      isVert: false
    };
  },
  props: {
    //垂直布局时无效
    width: {
      type: Number,
      default: 60
    },
    //水平布局时无效
    height: {
      type: Number,
      default: 60
    },
    minWidth: {
      type: Number,
      default: 0
    },
    minHeight: {
      type: Number,
      default: 0
    },
    maxWidth: {
      type: Number,
      default: 60
    },
    maxHeight: {
      type: Number,
      default: 60
    },
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.isVert = this.$parent.IsVertical;

    var css = this.$el.style.cssText;
    if (this.isVert) {
      this.maxSize =
        this.maxHeight < this.height ? this.height : this.maxHeight;
      this.minSize =
        this.minHeight > this.height ? this.height : this.minHeight;
      //
      css += "height:" + this.height + "px;";
      css += "width:100%;";
      css += "min-height:" + this.minSize + "px;";
      css += "max-height:" + this.maxSize + "px;";
    } else {
      this.maxSize = this.maxWidth < this.width ? this.width : this.maxWidth;
      this.minSize = this.minWidth > this.width ? this.width : this.minWidth;
      css += "height:100%;";
      css += "width:" + this.width + "px;";
      css += "min-width:" + this.minSize + "px;";
      css += "max-width:" + this.maxSize + "px;";
    }
    this.$el.style.cssText = css;
    //console.log(this.$el.style.cssText);
  },
  watch: {
    collapsed: function(val) {
      //console.log("collapsed值变化：" + val);

      this.trigger(val);
    }
  },
  methods: {
    Collapse: () => {
      //console.log("收缩");
      this.collapsed = true;
    },
    Expand: () => {
      //console.log("展开");
      this.collapsed = false;
    },
    trigger: function(val) {
      //console.log("trigger事件");
      //console.log("maxSize=" + this.maxSize);
      //console.log("MinSize=" + this.minSize);
      if (val) {
        if (this.isVert) this.$el.style.height = this.minSize;
        else this.$el.style.width = this.minSize + "px";
      } else {
        if (this.isVert) this.$el.style.height = this.maxSize;
        else this.$el.style.width = this.maxSize + "px";
      }
      //console.log(this.$el.style.cssText);
    }
  }
};
</script>

<style scoped>
.layout-side {
  flex-shrink: 0;
  flex-grow: 0;
}
</style>
