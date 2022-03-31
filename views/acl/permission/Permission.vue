<template>
    <div>
        <el-drawer></el-drawer>
        <div class="layout-flex tree-edit">

            <el-card>
                <div class="layout-flex flex-align-center">
                    <div class="margin-right-sm"><h3>权限菜单</h3></div>
                    <el-button type="primary" @click="clickAddRoot"
                    >添加根权限
                    </el-button>
                    <el-button type="danger" @click="clickDel"
                               :disabled="checkedKeys.length ===0">删除
                    </el-button>
                </div>
                <el-tree
                        show-checkbox
                        :expand-on-click-node="false"
                        :data="data"
                        :props="defaultProps"
                        default-expand-all
                        :check-strictly="true"
                        node-key="id"
                        @check="changeCheckTree"
                        @node-click="handleNodeClick">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                        <div>
                            <i :class="data.data.menuIcon"/>{{ node.label }}
                        </div>
                        <div @click.stop="() => clickAddSubNode(data)">
                          <el-button
                                  type="text"
                                  size="mini"
                          >
                            添加子节点
                          </el-button>
                        </div>
                     </span>
                </el-tree>
            </el-card>
            <el-card class="margin-left-sm">
                <h3>{{showFormTitle()}}</h3>
                <avue-form
                        v-if="show"
                        ref="form"
                        v-model="form"
                        :option="formOption"
                        @submit="clickSaveForm"
                >
                    <template slot-scope="scope" slot="menuIcon">
                        <div>
                            <icon-select v-model="form.menuIcon"/>
                        </div>
                    </template>
                </avue-form>
            </el-card>
        </div>


    </div>
</template>

<script>
    import IconSelect from "../../../components/IconSelect/IconSelect";

    export default {
        name: "Role",
        components: {IconSelect},
        data() {
            return {
                show: true,
                checkedKeys: [],
                form: {},
                formOption: {
                    column: [{
                        label: "权限名称",
                        prop: "name",
                        rules: [{
                            required: true,
                            message: "请输入权限名称",
                            trigger: "blur"
                        }],
                        span: 24
                    }, {
                        label: "权限类型",
                        prop: "type",
                        span: 24,
                        type: "radio",
                        value: 'MENU',
                        dicData: [{
                            label: '菜单',
                            value: 'MENU'
                        }],
                        mock: {
                            type: 'dic'
                        },
                        change: ({value, column}) => {
                        }
                    },
                        {
                            label: "菜单路径",
                            prop: "menuPath",
                            span: 24
                        },
                        {
                            label: "菜单组件",
                            prop: "menuComponent",
                            span: 24
                        },
                        {
                            label: "菜单图标",
                            prop: "menuIcon",
                            formslot: true,
                            value: '',
                            span: 24
                        },
                        {
                            label: "菜单meta",
                            prop: "menuMeta",
                            span: 24
                        },
                        {
                            label: "是否启用",
                            prop: "enable",
                            span: 24,
                            type: "radio",
                            value: true,
                            dicData: [{
                                label: '是',
                                value: true
                            }, {label: '否', value: false}],
                            mock: {
                                type: 'dic'
                            },
                            change: ({value, column}) => {
                            }
                        },
                        {
                            label: "排序",
                            prop: "orderNum",
                            span: 24
                        }
                    ]
                },
                currentNode: undefined,
                isCreate: false,
                data: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            }
        },
        mounted() {
            this.updateList()
        },
        methods: {
            showFormTitle() {
                if (this.currentNode) {
                    if (!this.isCreate) {
                        return `编辑-${this.currentNode.label}`
                    } else {
                        return `添加-${this.currentNode.label}子节点`
                    }
                } else {
                    return '添加根节点'
                }
            },
            async updateList() {
                const rep = await this.$api.genApi.PermissionApi.getTree()
                console.log('a', rep)
                this.data = rep.data
            },
            async clickDel() {
                const rep = await this.$api.genApi.PermissionApi.remove({ids: this.checkedKeys})
                this.updateList()
            },
            clickSaveForm(form, done, loading) {
                console.log('f', form, this.form)
                done()
                const temp = JSON.parse(JSON.stringify(this.form))
                if (this.isCreate) {
                    delete temp.id
                    if (this.currentNode && this.currentNode.id) {
                        temp.parentId = this.currentNode.id
                    }
                }
                this.$api.genApi.PermissionApi.save(temp).then(rep => {
                    this.$message.success("保存成功")
                    done()
                    this.updateList()
                    this.form = {}
                }).catch(() => {
                    loading()
                })
            },
            handleNodeClick(data, node) {
                this.show = false
                this.currentNode = data
                this.form = data.data
                this.form = Object.assign({}, this.form)
                this.isCreate = false
                this.$nextTick(() => {
                    this.show = true
                })


                console.log(this.form)
            },
            clickAddSubNode(data) {
                this.show = false
                console.log('a', data)
                this.currentNode = data
                this.isCreate = true
                console.log('f', this.form)
                this.form = {}
                this.$nextTick(() => {
                    this.show = true
                })
            },
            changeCheckTree(cur, list) {
                console.log(list)
                this.checkedKeys = list.checkedKeys
            },
            clickAddRoot() {
                this.form = {}
                this.show = false
                this.isCreate = true
                this.currentNode = undefined
                this.$nextTick(() => {
                    this.show = true
                })
            }

        }
    }
</script>

<style scoped lang="scss">
    .tree-edit {

        > div {
            width: 80%;
        }

    }

    .custom-tree-node {
        padding: 10px;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        line-height: 50px;
    }

    /deep/ .el-tree-node__content {
        height: 50px;
    }
</style>
