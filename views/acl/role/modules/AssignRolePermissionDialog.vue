<template>
    <el-dialog
            :destroy-on-close="true"
            :modal="true"
            :modal-append-to-body="false"
            :append-to-body="true"
            :visible.sync="isShow"
            :before-close="beforeClose"
            title="提示"
            width="30%">
        <p slot="title" style="color: #333;">{{dialogName}}</p>
        <el-form size="small" ref="dialog_form" :model="formData" :rules="formRules" label-position="left"
                 label-width="120px">
            <el-form-item label="分配权限" prop="name">
                <permission-select v-if="isShow" v-model="formData.permissionIds"/>
            </el-form-item>
        </el-form>
        <span class="dialog-footer" slot="footer">
<el-button @click="isShow = false">取 消</el-button>
<el-button @click="clickSave" type="primary">确认</el-button>
</span>
    </el-dialog>
</template>

<script>

    import PermissionSelect from "../../permission/modules/PermissionSelect";

    export default {
        name: "AssignRolePermissionDialog",
        components: {PermissionSelect},
        data() {
            return {
                name: '',
                isShow: false,
                dialogName: '',
                formData: {
                    permissionIds: []
                },
                formRules: {
                    name: [
                        {required: true, message: '请输入列表名称', trigger: 'change'},
                    ]
                }
            }
        },
        methods: {
            async updateRolePermission() {
                const rep = await this.$api.genApi.RolePermissionApi.list2({
                    pageSize: 1000,
                    roleId: this.formData.id
                })
                const temp = []
                console.log('eee', rep.data)
                for (const item of rep.data.list) {
                    temp.push(item.permissionId)
                }
                this.$set(this.formData, "permissionIds", temp)
                // this.formData.permissionIds = temp
            },
            open(data) {
                let form = JSON.parse(JSON.stringify(data))
                if (data && data.id) {
                    this.dialogName = "编辑" + name
                    this.formData = {}
                } else {
                    this.dialogName = '新增' + name
                    this.formData = {}
                }

                this.formData = Object.assign({}, this.formData, form)
                this.isShow = true
                this.updateRolePermission()
            },
            save() {
                let req_data = JSON.parse(JSON.stringify(this.formData))

                this.$api.genApi.RolePermissionApi.savePermission({
                    id: req_data.id,
                    permissionIds: req_data.permissionIds
                }).then(rep => {
                    this.$message.success("保存成功")
                    this.close()
                })
            },
            clickSave() {
                this.$refs['dialog_form'].validate((valid) => {
                    if (valid) {
                        this.save()
                    }
                })
            },
            beforeClose() {
                let form = this.$refs['dialog_form']
                form.clearValidate()
                form.resetFields()
                this.isShow = false
            },
            close() {
                this.isShow = false
            },
        }
    }
</script>
<style scoped>

</style>
