<template>
  <div class="rightPart">
    <div class="form_wrap">
      <div class="form_wrap-left" :class="{ h125: isMore, hidden: !isMore }">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="工号">
            <el-input v-model="formInline.id" placeholder="工号"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="formInline.name" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="formInline.sex" placeholder="性别">
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="部门">
            <el-input v-model="formInline.part" placeholder="部门"></el-input>
          </el-form-item>
          <el-form-item label="职位">
            <el-input v-model="formInline.post" placeholder="职位"></el-input>
          </el-form-item>
          <el-form-item label="薪资">
            <el-input v-model="formInline.salary" placeholder="薪资"></el-input>
          </el-form-item>
          <el-form-item label="职员评分">
            <el-input v-model="formInline.score" placeholder="职员评分"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="form_wrap-right">
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button @click="reset">重置</el-button>
        <el-button @click="showMore">
          展开
          <i v-if="!isMore" class="el-icon-arrow-down el-icon--right"></i>
          <i v-else class="el-icon-arrow-up el-icon--right"></i>
        </el-button>
      </div>
    </div>
    <div class="table_wrap">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="工号" width="100" align="center"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180" align="center"></el-table-column>
        <el-table-column prop="sex" label="性别" align="center">
          <template slot-scope="scope">
            <span :title="scope.row.sex == '0' ? '女' : '男'">
              {{
              scope.row.sex == "0" ? "女" : "男"
              }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="section" label="部门" align="center"></el-table-column>
        <el-table-column prop="post" label="职位" align="center"></el-table-column>
        <el-table-column prop="pay" label="薪资" align="center"></el-table-column>
        <el-table-column prop="score" label="职员评分" align="center"></el-table-column>
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
        ></el-pagination>
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
        id: "",
        name: "",
        sex: "",
        part: "",
        post: "",
        salary: "",
        score: ""
      },
      tableData: []
    };
  },
  methods: {
    onSubmit() {
      this.getDataList();
    },
    reset() {
      this.formInline = {
        id: "",
        name: "",
        sex: "",
        part: "",
        post: "",
        salary: "",
        score: ""
      };
      this.pageNum = 1;
      this.getDataList();
    },
    showMore() {
      this.isMore = !this.isMore;
    },
    async getDataList() {
      this.$loading(true);
      debugger
      const { data } = await this.$service.getDataList({
        name: this.formInline.name,
        pageNum: this.pageNum,
        pageSize: this.pageSize
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
    }
  },
  created() {},
  mounted() {
    this.getDataList();
  }
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
    width: calc(100% - 270px);
    /deep/.el-form-item {
      margin-right: 50px;
      &:nth-child(7) {
        .el-form-item__content {
          width: 221px;
        }
      }
      &__label {
        width: 80px;
        text-align: left;
      }
    }
  }
  &-right {
    width: 270px;
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