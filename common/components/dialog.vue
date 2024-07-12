<template>
  <el-dialog
    :visible="isVisible"
    width="400px"
    title="这是一个弹框"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-input size="mini" v-model="inputValue" />
    <div slot="footer">
      <el-button size="small" type="primary" @click="_confirm">确定</el-button>
      <el-button size="small" @click="_cancel">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "dialog",
  components: {},
  data() {
    return {
      isVisible: false,
      resolver: null,
      inputValue: ""
    };
  },
  methods: {
    open(value) {
      return new Promise(resolve => {
        this._visible(true);
        this.resolver = resolve;
        this.inputValue = value;
      });
    },
    _visible(is) {
      this.isVisible = is;
    },
    _confirm() {
      this._visible(false);
      this.resolver(this.inputValue);
    },
    _cancel() {
      this._visible(false);
      this.resolver(false);
    }
  }
};
</script>

<style lang="less" scoped>
</style>