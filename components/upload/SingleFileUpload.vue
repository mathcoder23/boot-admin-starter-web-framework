<style lang="scss" scoped>
    .upBox .demo-upload-list-cover {
        width: 100px;
        height: 100px;
        display: flex;
        position: absolute;
        bottom: -1px;
        justify-content: center;
        align-items: center;
        background:rgba(0,0,0,0.6);
        >i{
            cursor: pointer;
            font-style: normal;
            font-weight: normal;
            color: white;
            width:80px;
            font-size:23px;
        }
    }


    .upBox .img {
        margin-top: 6px;
        width: 100px;
        height: 100px;
    }
</style>
<template>
    <div class="upBox">


        <div class="outUp" >
            <el-upload
                    :action="upAction"
                    :show-file-list="false"
                    :on-success="successUpload"
                    :on-error="errorUpload"
                    :http-request="uploadSectionFile"
                    name="file"
                    :before-upload="beforeUpload">
                <Icon type="md-add"/>
                <el-button type="primary">浏览上传</el-button>

            </el-upload>
            {{uploadResult}}
        </div>
    </div>


</template>

<script>
    import {mapState} from "vuex";
    import {OSSTool} from "./oss/oss-tool";

    export default {
        name: "single-file-upload",
        mounted() {
            this.uploadResult = this.url
        },
        data() {
            return {
                showDetail:false,
                fileFormat: ['jpg', 'png', 'jpeg'],
                upAction: '/upload/img',
                uploadData: {},
                uploading: null,
                uploadResult:null
            }
        },
        props:{
          url:{
              type:String,
              default:null
          }
        },
        computed: {
            ...mapState({
            })
        },
        methods: {
            mouseout(){
                this.showDetail = false
            },
            mouseover(){
                this.showDetail = true
            },
            clickDeleteImg() {
                this.uploadResult = null
                this.$emit("onUploadUrl", this.uploadResult)
            },
            clickImgPreview(url) {
                window.open(url)
            },
            uploadSectionFile(data){
                OSSTool.commonUpload('soft/update/'+data.file.name,data.file,(proggress,checkpint,res)=>{
                    if(proggress === 1){
                        this.successUpload(res)
                    }
                },()=>{
                    this.errorUpload()
                })
            },
            beforeUpload(file) {
                this.uploading = this.$loading({
                    lock: true,
                    text: `上传${name}中`,
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
            },
            uploadProgress(event, file, fileList) {
                console.log(event, file, fileList)
            },
            successUpload(result) {
                console.log(result)
                this.uploading.close()
                this.uploadResult = result.url
                this.$emit("onUploadUrl", {
                    url:result.url,
                    path:result.name
                })

            },
            errorUpload(result) {
                this.uploading.close()
                this.$message.error("文件上传错误，请重试");
            },

        },
        watch:{
            url(url){
                this.uploadResult = url
            }
        }
    }
</script>
