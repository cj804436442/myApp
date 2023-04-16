<template>
  <div class="photoAlbum">
    <el-tooltip
      class="item"
      effect="dark"
      :content="tag.name"
      placement="top-start"
      v-for="(tag, index) in fileList"
      :key="index"
    >
      <el-tag
        style="margin-right: 10px; display: flex"
        :disable-transitions="false"
        @close="handleClose(index)"
        closable
        @click="downloadFile(tag)"
        ><i class="el-icon-paperclip"></i
        ><span class="tagtext">{{ tag.name }}</span></el-tag
      >
    </el-tooltip>
    <el-upload
      class="upload-demo"
      action
      :http-request="uploadFile"
      ref="upload"
      :limit="fileLimit"
      :on-remove="handleRemove"
      :file-list="fileList"
      :on-exceed="handleExceed"
      :before-upload="beforeUpload"
      :show-file-list="false"
      :headers="headers"
    >
      <el-button class="btn"
        ><i class="el-icon-paperclip"></i>上传附件</el-button
      >
    </el-upload>
  </div>
</template>

<script>
export default {
  name: "photoAlbum",
  components: {},
  data() {
    return {
      //上传后的文件列表
      fileList: [],
      // 允许的文件类型
      fileType: [
        "pdf",
        "doc",
        "docx",
        "xls",
        "xlsx",
        "txt",
        "png",
        "jpg",
        "bmp",
        "jpeg",
      ],
      // 运行上传文件大小，单位 M
      fileSize: 50,
      // 附件数量限制
      fileLimit: 5,
      //请求头
      headers: { "Content-Type": "multipart/form-data" },
    };
  },
  methods: {
    //上传文件之前
    beforeUpload(file) {
      if (file.type != "" || file.type != null || file.type != undefined) {
        //截取文件的后缀，判断文件类型
        const FileExt = file.name.replace(/.+\./, "").toLowerCase();
        //计算文件的大小
        const isLt5M = file.size / 1024 / 1024 < 50; //这里做文件大小限制
        //如果大于50M
        if (!isLt5M) {
          alert("上传文件大小不能超过 50MB!");
          return false;
        }
        //如果文件类型不在允许上传的范围内
        if (this.fileType.includes(FileExt)) {
          return true;
        } else {
          this.$message.error("上传文件格式不正确!");
          return false;
        }
      }
    },
    //上传了的文件给移除的事件，由于我没有用到默认的展示，所以没有用到
    handleRemove() {},
    //这是我自定义的移除事件
    handleClose(i) {
      this.fileList.splice(i, 1); //删除上传的文件
      if (this.fileList.length == 0) {
        //如果删完了
        this.fileflag = true; //显示url必填的标识
        this.$set(this.rules.url, 0, {
          required: true,
          validator: this.validatorUrl,
          trigger: "blur",
        }); //然后动态的添加本地方法的校验规则
      }
    },
    //超出文件个数的回调
    handleExceed() {
      this.$message({
        type: "warning",
        message: "超出最大上传文件数量的限制！",
      });
      return;
    },
    //上传文件的事件
    async uploadFile(item) {
      //上传文件的需要formdata类型;所以要转
      let FormDatas = new FormData();
      FormDatas.append("file", item.file);
    //   const { data } = await this.$service.upload({
    //     data: FormDatas,
    //   });
    //   console.log(data)
    //   return
      this.$axios({
        method: "post",
        url: "api/upload",
        headers: this.headers,
        timeout: 30000,
        data: FormDatas,
      }).then((res) => {
        if (res.data.id != "" || res.data.id != null) {
          this.fileList.push(item.file); //成功过后手动将文件添加到展示列表里
          let i = this.fileList.indexOf(item.file);
          this.fileList[i].id = res.data.id; //id也添加进去，最后整个大表单提交的时候需要的
          if (this.fileList.length > 0) {
            //如果上传了附件就把校验规则给干掉
            this.fileflag = false;
            this.$set(this.rules.url, 0, "");
          }
          //this.handleSuccess();
        }
      });
    },
    //上传成功后的回调
    handleSuccess() {},
  },
};
</script>

<style lang="less" scoped>
@space: 10px;
.photoAlbum {
}
</style>