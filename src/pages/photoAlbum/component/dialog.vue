<template>
  <el-dialog
    :visible="isVisible"
    width="600px"
    :title="title"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    append-to-body
  >
    <div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="名称" prop="name">
          <el-input style="width: 360px;" v-model="ruleForm.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input style="width: 360px;" v-model="ruleForm.price" clearable></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input style="width: 360px;" v-model="ruleForm.author" clearable></el-input>
        </el-form-item>
        <el-form-item label="出版社" prop="press">
          <el-input style="width: 360px;" v-model.number="ruleForm.press" clearable></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="img">
          <el-upload
            action="http://localhost:8080/process/files/upload"
            :on-success="successUpload"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer">
      <el-button size="small" type="primary" @click="_confirm">确定</el-button>
      <el-button size="small" @click="_cancel">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "addDialog",
  components: {},
  data() {
    return {
      title: "新增",
      isVisible: false,
      resolver: null,
      inputValue: "",
      ruleForm: {
        name: "",
        price: "",
        author: "",
        press: "",
        img: ""
      },
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        price: [{ required: true, message: "请输入价格", trigger: "blur" }],
        author: [{ required: true, message: "请输入作者", trigger: "blur" }],
        press: [{ required: true, message: "请输入出版社", trigger: "blur" }],
        img: [{ required: true, message: "请上传图片", trigger: "change" }]
      }
    };
  },
  methods: {
    open(value) {
      return new Promise(resolve => {
        this._visible(true);
        this.resolver = resolve;
        this.ruleForm = JSON.parse(JSON.stringify(value));
      });
    },
    _visible(is) {
      this.isVisible = is;
    },
    _confirm() {
      this._visible(false);
      this.resolver(this.ruleForm);
    },
    _cancel() {
      this._visible(false);
      this.resolver(false);
    },
    successUpload(res) {
      this.ruleForm.img = res.data
    },
  }
};
</script>

<style lang="less" scoped>
</style>