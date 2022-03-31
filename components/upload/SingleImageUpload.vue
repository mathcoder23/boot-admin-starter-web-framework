<style lang="scss" scoped>
    .image-upload{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>
<template>
    <div>
        <div class="image-upload">
            <el-image  style='width:100px;height:100px' :src="uploadResult"
            >
                <div slot="error">
                    <div class="el-image__error">请上传图片</div>
                </div>
            </el-image>
            <el-upload
                    :action="upAction"
                    :show-file-list="false"
                    :on-success="successUpload"
                    :on-error="errorUpload"
                    :http-request="uploadSectionFile"
                    name="file"
                    :before-upload="beforeUpload">
                <el-button size='mini' icon="el-upload" type="primary">浏览上传</el-button>

            </el-upload>
        </div>
    </div>


</template>

<script>
    import {OSSTool} from "./oss/oss-tool";
    export default {
        name: "single-image-upload",
        mounted() {
        },
        components:[],
        data() {
            return {
                fileFormat: ['jpg', 'png', 'jpeg'],
                upAction: '/upload/img',
                uploadData: {},
                uploading: null,
                uploadResult: null
            }
        },
        props:{
            value:{
                type:String,
                default:''
            }
        },
        model:{
            prop: 'value',  // 自定义prop属性
            event: 'hand'    // 自定义它的触发方法名
        },
        computed: {
        },
        methods: {
            clickDeleteImg() {
                this.uploadResult = null
                this.$emit("onUploadUrl", this.uploadResult)
            },
            clickImgPreview(url) {
                window.open(url)
            },
            // uploadSectionFile(data){
            //     OSSTool.commonUpload('test/tt/a/'+data.file.name,data.file,(proggress,checkpint,res)=>{
            //         if(proggress === 1){
            //             this.successUpload(res)
            //         }
            //     },()=>{
            //         this.errorUpload()
            //     })
            // },
            uploadSectionFile(data) {
                console.log(data)
                let d = new FormData()
                d.append("file", data.file, data.file.name)

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
                this.uploading.close()
                this.uploadResult = result.url
                this.$emit('hand',result.url)
            },
            errorUpload(result) {
                this.uploading.close()
                this.$message.error("文件上传错误，请重试");
            },

        },
        watch: {
            value(url) {
                console.log('uro',url)
                this.uploadResult = url
            }
        }
    }
</script>
