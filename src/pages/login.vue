<template>
  <div class="login">
    <div class="login_box">
      <div class="login_text">登录</div>
      <el-input
        class="login_account"
        placeholder="账号"
        prefix-icon="el-icon-user"
        v-model="account"
      >
      </el-input>
      <el-input
        class="login_password"
        placeholder="密码"
        prefix-icon="el-icon-lock"
        show-password
        v-model="password"
      >
      </el-input>
      <div class="login_buttons">
        <el-button size="mini">注册</el-button>
        <el-button
          type="primary"
          size="mini"
          @click="loginIn(account, password)"
          >登录</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  components: {},
  data() {
    return {
      account: "",
      password: "",
    };
  },
  methods: {
    async loginIn(account, password) {
      this.$loading(true);
      const { data } = await this.$service.login({
        uname: account,
        pwd: password,
      });
      this.$loading(false);
      if (data.code == 200) {
        this.$router.push({ path: "/managPages" });
      } else {
        return this.$message.warning("密码错误");
      }
    },
  },
};
</script>

<style lang="less" scoped>
@space: 10px;
.login {
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(
    to bottom right,
    rgb(245, 91, 116),
    rgb(137, 246, 137)
  );
  &_box {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 400px;
    height: 250px;
    background-color: #fff;
    border-radius: 10px;
    margin: 0 auto;
    padding: 20px;
    top: calc(50% - 250px);
    .login_text {
      font-size: 20px;
      font-weight: 700;
      margin-top: 30px;
    }
    .login_account {
      margin-top: 20px;
    }
    .login_password {
      margin-top: 30px;
    }
    .login_buttons {
      display: flex;
      justify-content: space-between;
      width: 150px;
      margin-top: 20px;
    }
  }
}
</style>