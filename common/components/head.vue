<template>
  <div class="head">
    <div class="logo"></div>
    <div class="name">公司员工管理系统</div>
  </div>
</template>

<script>
export default {
  name: "Head",
  components: {},
  data() {
    return {};
  },
  methods: {},
  created() {},
  mounted() {},
};
</script>

<style lang="less" scoped>
.head {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 60px;
  background: #fff;
  margin-bottom: 2px;
  .logo {
    width: 40px;
    height: 40px;
    background-image: url("../../src/assets/cj.png");
    background-size: 40px;
    margin-left: 20px;
  }
  .name {
    margin-left: 20px;
    font-family: serif;
    font-weight: 700;
    font-size: 24px;
  }
}
</style>