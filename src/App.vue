<template>
  <div id="app">
    <Loading :visible="isLoading" />
    <!-- <Head></Head> -->
    <router-view />
  </div>
</template>

<script>
import Loading from "../common/components/loading.vue";
import Head from "../common/components/head.vue";
export default {
  name: "App",
  components: {
    Loading,
    Head,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  mounted() {
    this.$root.$on("loading", (is) => {
      this.isLoading = is;
    });
  },
};
</script>

<style lang="less" scoped>
#app {
  width: 100%;
  min-height: 100%;
  background: #f4f4f4;
}
</style>
