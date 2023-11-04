<template>
  <div class="rightPart">
    <div class="form_wrap">
      <div class="form_wrap-left" :class="{ h125: isMore, hidden: !isMore }">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="工号">
            <el-input v-model="formInline.user" placeholder="工号"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="formInline.user" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="formInline.region" placeholder="性别">
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="职位">
            <el-input v-model="formInline.user" placeholder="职位"></el-input>
          </el-form-item>
          <el-form-item label="部门">
            <el-input v-model="formInline.user" placeholder="部门"></el-input>
          </el-form-item>
          <el-form-item label="职位">
            <el-input v-model="formInline.user" placeholder="职位"></el-input>
          </el-form-item>
          <el-form-item label="薪资">
            <el-input v-model="formInline.user" placeholder="薪资"></el-input>
          </el-form-item>
          <el-form-item label="职员评分">
            <el-input
              v-model="formInline.user"
              placeholder="职员评分"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="form_wrap-right">
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button @click="showMore"
          >展开<i class="el-icon-arrow-down el-icon--right"></i
        ></el-button>
      </div>
    </div>
    <div class="table_wrap">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="工号" width="100" align="center">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180" align="center">
        </el-table-column>
        <el-table-column prop="sex" label="性别" align="center">
          <template slot-scope="scope">
            <span :title="scope.row.sex == '0' ? '女' : '男'">{{
              scope.row.sex == "0" ? "女" : "男"
            }}</span></template
          >
        </el-table-column>
        <el-table-column prop="section" label="部门" align="center">
        </el-table-column>
        <el-table-column prop="post" label="职位" align="center">
        </el-table-column>
        <el-table-column prop="pay" label="薪资" align="center">
        </el-table-column>
        <el-table-column prop="score" label="职员评分" align="center">
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "rightPart",
  components: {},
  data() {
    return {
      isMore: false,
      total: 0,
      pageNum: 1,
      pageSize: 10,
      currentPage4: 1,
      formInline: {
        user: "",
        region: "",
      },
      tableData: [],
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    showMore() {
      this.isMore = !this.isMore;
    },
    async getDataList(account, password) {
      this.$loading(true);
      const { data } = await this.$service.getDataList({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      });
      this.tableData = data.data;
      this.total = data.total;
      this.$loading(false);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getDataList();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getDataList();
    },
  },
  created() {},
  mounted() {
    this.getDataList();
  },
};
</script>

<style lang="less" scoped>
.h125 {
  height: 125px;
}
.hidden {
  overflow: hidden;
}
.form_wrap {
  display: flex;
  padding: 20px 20px 0;
  &-left {
    width: calc(100% - 180px);
  }
  &-right {
    width: 180px;
    text-align: right;
  }
  .demo-form-inline {
    height: 62px;
    .el-form-item {
      .el-form-item__content {
        // width: 170px;
      }
    }
  }
}
.table_wrap {
  padding: 20px;
  .pagination {
    text-align: right;
    margin: 10px;
  }
}
</style>