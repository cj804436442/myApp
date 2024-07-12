<template>
  <div class="rightPart">
    <div class="form_wrap">
      <div class="form_wrap-left" :class="{ h125: isMore, hidden: !isMore }">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="名称">
            <el-input v-model="formInline.name" placeholder="名称"></el-input>
          </el-form-item>
          <el-form-item label="价格">
            <el-input v-model="formInline.price" placeholder="价格"></el-input>
          </el-form-item>
          <el-form-item label="作者">
            <el-input v-model="formInline.author" placeholder="作者"></el-input>
          </el-form-item>
          <el-form-item label="出版社">
            <el-input v-model="formInline.press" placeholder="出版社"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="form_wrap-right">
        <el-button type="primary" @click="queryBook">查询</el-button>
        <el-button @click="reset">重置</el-button>
        <!-- <el-button @click="showMore">
          展开
          <i v-if="!isMore" class="el-icon-arrow-down el-icon--right"></i>
          <i v-else class="el-icon-arrow-up el-icon--right"></i>
        </el-button> -->
        <el-button type="primary" @click="addBook">新增</el-button>
      </div>
    </div>
    <div class="table_wrap">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="序号" width="100" align="center"></el-table-column>
        <el-table-column prop="name" label="书名" width="180" align="center"></el-table-column>
        <el-table-column prop="price" label="价格" width="180" align="center"></el-table-column>
        <el-table-column prop="author" label="作者" align="center"></el-table-column>
        <el-table-column prop="press" label="出版社" align="center"></el-table-column>
        <el-table-column prop="img" label="图片" align="center">
          <template slot-scope="scope">
            <el-image
              style="width: 100px;height:100px"
              :src="'http://localhost:8080/process/files/' + scope.row.img"
              :preview-src-list="['http://localhost:8080/process/files/' + scope.row.img]"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="score" label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="small" type="normal" @click="download(scope.row.img)">下载</el-button>
          </template>
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
        ></el-pagination>
      </div>
    </div>
    <Dialog ref="dialog"></Dialog>
  </div>
</template>

<script>
import Dialog from "./component/dialog.vue";

export default {
  name: "rightPart",
  components: {
    Dialog
  },
  data() {
    return {
      isMore: false,
      total: 0,
      pageNum: 1,
      pageSize: 10,
      currentPage4: 1,
      formInline: {
        name: "",
        price: "",
        author: "",
        press: "",
      },
      tableData: []
    };
  },
  methods: {
    download(id) {
      location.href = "http://localhost:8080/process/files/" + id;
    },
    queryBook() {
      this.getDataList();
    },
    reset() {
      this.formInline = {
        name: "",
        price: "",
        author: "",
        press: "",
      };
      this.pageNum = 1;
      this.getDataList();
    },
    showMore() {
      this.isMore = !this.isMore;
    },
    async getDataList() {
      this.$loading(true);
      const { data } = await this.$service.getBookList({
        ...this.formInline,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      });
      this.tableData = data.data.list;
      this.total = data.data.total;
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
    async addBook() {
      const value = await this.$refs.dialog.open(this.formInline);
      if (value === false) return;
      this.$loading(true);
      const { status, data } = await this.$service.addBook({
        ...value
      });
      this.$loading(false);
      if (!status) return;
      this.$message.success("新增成功");
      this.queryBook();
    },
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