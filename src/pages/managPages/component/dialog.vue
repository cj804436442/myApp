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
        <el-form-item label="姓名" prop="name">
          <el-input style="width: 360px;" v-model="ruleForm.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select style="width: 360px;" v-model="ruleForm.sex" placeholder="请选择" clearable>
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input style="width: 360px;" v-model="ruleForm.password" clearable></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input style="width: 360px;" v-model.number="ruleForm.age" clearable></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input style="width: 360px;" v-model.number="ruleForm.phone" clearable></el-input>
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
        sex: "",
        password: "",
        age: "",
        phone: ""
      },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        age: [{ required: true, message: "请输入年龄", trigger: "blur" }],
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }]
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
    }
  }
};
</script>

<style lang="less" scoped>
</style>