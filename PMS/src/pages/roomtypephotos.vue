<template>
  <div class="hotelupload" v-loading="loading2" element-loading-text="操作进行中" element-loadig-spinner="el-icon-loading" element-loading-background="rgba(0,0,0,.4)">
    <p class="head">
      <span class="middle">当前位置</span>
      <span style="margin-right: 6px;" class="middle">：</span>
      <span style="margin-right: 6px;" class="middle">相册</span>
      <span style="margin-right: 6px;" class="middle">></span>
      <span style="color: #6a9df6;" class="middle">房型相册</span>
    </p>
    <div class="contain">
      <div style="margin-bottom: 10px;">
        <p class="middle">
          <span class="middle">照片格式</span>
          <span class="middle">：</span>
          <span class="middle">JPG&nbsp;,</span>
          <span class="middle">PNG</span>
        </p>
        <p class="middle">
          <span class="middle">建议尺寸</span>
          <span class="middle">：</span>
          <span class="middle">180×120</span>
        </p>
        <p class="middle">
          <span class="middle">已上传</span>
          <span class="middle">：</span>
          <span class="middle">{{numberOfImages}}张(最多{{uploadImagesLimitNum}}张)</span>
        </p>
      </div>
      <div style="margin-bottom: 10px;">
        <span>选择房型：</span>
        <el-select @change="loadIamgeList(hotelPhotosType)" v-model="hotelPhotosType" size="mini" filterable placeholder="请选择">
          <el-option
            v-for="item in roomTypeArr"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="photoarea">
        <ul class="listuploaded mitop">
          <li v-for="(item, index) in loadedImg" class="middle">
            <div @click="deleLoadedImg(index)" class="deleimg">
              <span>×</span>
            </div>
            <div class="hov">
              <img :src="item.url" width="146" height="146" alt="">
            </div>
            <nav @click="setCover(item, index)" class="diaolog">
              <p style="margin-bottom: 6px;">设为封面</p>
            </nav>
          </li>
        </ul>   <!-- upload-demo  -->
        <div v-show ="uploadImagesNum > 0">
          <el-upload
          class="mitop"
          ref="upload"
          :data= "imgtoken"
          list-type="picture-card"
          action="https://upload-z2.qiniup.com"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="uploadSuccess"
          :on-change="logNum"
          :before-upload="beforeUpload"
          :file-list="fileList"
          :on-error="uploadError"
          :http-request="upload"
          :auto-upload="false"
          :limit="uploadImagesNum"
          :on-exceed=imgsExceed>
          <!-- <i class="el-icon-plus"></i> -->
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          </el-upload>
        </div>
        <div @click="submitUpload" class="btn">上传文件</div>
      </div>
    </div>
  </div>
</template>
<script>
import API from "@/store/API"
import { mapGetters } from 'vuex'

  export default {
    name: 'roomtypeUpload', // hotelUpload
    data() {
      return {
        // roomType: '',
        roomTypeArr: [],
        loadedImg: [],
        loading2: false,
        imgtoken: {token: ''},
        fileList: [],
        hotelPhotosType: '',  //上传defang型
        uploadImagesLimitNum:15,
        numberOfImages:0,
        uploadImagesLimitSize:1024*1024*2
      }
    },
  computed:{
      ...mapGetters({
        hotel:'currHotel'
      }),
      uploadImagesNum:function(){
      var num = this.uploadImagesLimitNum - this.numberOfImages
      if(num < 0) num = 0
      console.log(num)
      return num 
    }
  },
    methods: {
      setCover(e, i) {
        let obj = {
          id: this.hotelPhotosType,
          type: 2,
          img_id: e.id
        }
        API.put("/pms/img/logo",obj).then(res=>{
          if (res.error_code == 0) {
            this.loadedImg.splice(i, 1)
            this.loadedImg.unshift(e)
            this.$message({
              message: '设置成功',
              type: 'success'
            })
          } else {
            if (res.msg) {
              this.$message.error(`${res.msg}`)
            }
          }
        })
      },
      getRoomType() {
        API.getRoomType(this.hotel.id).then(res=>{
          if(res.error_code == 0) {
            this.roomTypeArr = res.data
          }
        })
      },
      getLoadedImg() {
        return API.get("/pms/img?id="+this.hotelPhotosType+"&type="+2)
      },
      logNum(file, fileList) {
      },
      deleLoadedImg(i) {
        var self = this 
        if(i <0 || i > this.loadedImg.length) return 
        API.removeHotelPhoto(this.loadedImg[i].id).then(res=>{
          if(res.error_code == 0){
            self.loadedImg.splice(i, 1)
            self.numberOfImages--
            if(self.numberOfImages <= 0) self.numberOfImages = 0
          }else{
            self.$message.error('删除失败,'+res.msg)
          }
        }).catch(err=>{
           self.$message.error('删除失败,'+err)
        })
      },
      gettoken() {
        return API.hotelUploadGetToken({id: this.hotelPhotosType, type: 2})  //   gai```````````````
      },
      uploadSuccess(res,file,fileList) {
        this.loading2 = false;
        this.fileList = []
        this.$message({
          message: '上传成功!',
          type: 'success'
        });
      },
      beforeUpload(file) {
        const imgType = ["image/jpeg","image/bmp","image/png"]
        const isImgTypeValid = imgType.includes(file.type)
        const isLt= file.size < this.uploadImagesLimitSize 
        var ltSz = Math.floor(this.uploadImagesLimitSize/1024/1024)
        this.loading2= false
        if (!isImgTypeValid) {
    
          this.$message.error('上传图片只能是 JPG PNG BMP格式!')
          return false
        }
        if (!isLt) {
          this.$message.error('上传图片大小不能超过'+ltSz+'MB!')
          return false
        }
        return true 
      },
      submitUpload() {
        if (this.hotelPhotosType == '') {
          this.$alert('请先选择房型', '', {
            confirmButtonText: '确定',
            callback: ''
          })
          return 
        }
        if(this.$refs.upload.uploadFiles.length <= 0){
          this.$message({
            message: '请选择上传图片!',
            type: 'warning'
          })
          return
        }
        this.loading2 = true
        this.$refs.upload.submit()
      },
      handleRemove(file, fileList) {
      },
      handlePreview(file) {
        console.log(file)
      },
    uploadError(err, file, fileList){
      this.loading2= false
      this.fileList = []
          this.$message.error('上传图片失败,'+err)
    },
    upload(content){
       var self = this 
       console.log(content.onSuccess)
       API.uploadFile({url:content.action,
         token:this.imgtoken.token,
         file:content.file 
       }).then(res=>{
        
        if(res.data.error_code == 0) {
        self.loadedImg.push(res.data.data)
        self.numberOfImages++
        content.onSuccess(res.data)
       }else{
         content.onError(res.data.msg);
       }
        
       }).catch(error=>{
      console.log('error',error)
             content.onError(error);
       })
    },
    imgsExceed(files, fileList){
    this.$message({
      message: '已超过最大上传图片数!',
      type: 'warning'
      })
    },
    async loadIamgeList(){
       var res = await this.getLoadedImg()
       console.log(res)
       if (res.error_code == 0) {
        this.loadedImg = res.data
        this.numberOfImages = res.data.length
      }
      res = await this.gettoken()
      if (res.error_code == 0) {
        this.imgtoken.token = res.data.upload_token
        this.uploadImagesLimitNum = res.data.upload_max_num
        this.uploadImagesLimitSize = res.data.img_max_size
      }
    }
  },
  mounted(){
     // this.loadIamgeList()
     this.getRoomType()
  }
  }
</script>

<style lang="scss" scoped>
  .hotelupload{
    font-size: 14px;
    min-height: 800px;
    .middle{
      display: inline-block;
      vertical-align: middle;
    }
    .mitop{
      display: inline-block;
      vertical-align: top;
      margin-top: 10px;
    }
    .head{
      margin-top: 20px;
    }
    .contain{
      box-sizing: border-box;
      padding: 38px 28px 0 28px;
    }
    .photoarea{
      border: 1px solid #e6e6e6;
      border-radius: 6px;
      box-sizing: border-box;
      padding: 10px;
      background: #fff;
    }
    .listuploaded{
      li{
        width: 146px;
        height: 146px;
        border-radius: 6px;
        position: relative;
        border: 1px solid #ccc;
        margin-right: 10px;
        margin-bottom: 10px;
        text-align: center;
        &:hover .diaolog{
          display: block;
        }
        
      }
    }
    .deleimg{
      position: absolute;
      top: -11px;right: -10px;
      width: 11px;
      height: 11px;
      border: 1px solid red;
      border-radius: 50%;
      line-height: 11px;
      text-align: center;
      cursor: pointer;
    }
    .diaolog{
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,.4);
      top: 0; left: 0;
      display: none;
      p{
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background: #fff;
        border-radius: 6px;
        position: absolute;
        top: 50%;left: 50%;
        margin-top: -15px;
        margin-left: -50px;
        cursor: pointer;
        &:hover{
          color: #6a9df6;
        }
      }
    }
    .btn{
      width: 118px;
      height: 38px;
      line-height: 38px;
      text-align: center;
      border-radius: 4px;
      background: #6a9df6;
      color: #fff;
      margin: 0 auto;
      cursor: pointer;
      margin-top: 100px;
    }
  }
</style>