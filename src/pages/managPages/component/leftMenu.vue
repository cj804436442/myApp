<template>
  <div class="main">
    <el-menu
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      @select="select"
      :collapse="isCollapse"
      :default-active="defaultActive"
      style="min-height: 100%;"
      router
    >
      <el-submenu index="1">
        <template slot="title">
          <span slot="title">臭狗蛋卷</span>
        </template>
        <el-menu-item index="rightPart">管理员账号</el-menu-item>
        <el-submenu index="2">
          <span slot="title">蛋卷相册</span>
          <el-menu-item index="photoAlbum">相册列表</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  components: {},
  computed: {
    defaultActive: function() {
      return this.$route.path.replace("/", "");
    }
  },
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {},
    select(a, b, c) {
      console.log(a, b, c);
    }
  }
};
</script>

<style lang="less" scoped>
.el-menu {
  border-right: none;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>