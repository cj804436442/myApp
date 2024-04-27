<template>
  <div class="managPages">
    <Head></Head>
    <Layout left="200" right="0" :right-foldable="true">
      <LeftMenu slot="left"></LeftMenu>
      <RightPart slot="center"> </RightPart>
    </Layout>
  </div>
</template>

<script>
import Head from "../../../common/components/head.vue"
import Layout from "../../../common/components/layout.vue";
import LeftMenu from "./component/leftMenu.vue";
import RightPart from "./component/rightPart.vue";
export default {
  name: "managPages1",
  components: {
    Head,
    Layout,
    LeftMenu,
    RightPart,
  },
  data() {
    return {};
  },
  methods: {},
  created() {},
  mounted() {},
};
</script>

<style scoped>
</style>