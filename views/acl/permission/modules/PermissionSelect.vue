<template>
    <div>
        <el-tree
                ref="tree"
                show-checkbox
                :expand-on-click-node="false"
                :data="data"
                :props="defaultProps"
                :default-checked-keys="value"
                default-expand-all
                node-key="id"
                :check-strictly="true"
                @check="changeCheckTree">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                        <div>
                            {{ node.label }}
                        </div>

                     </span>
        </el-tree>
    </div>
</template>

<script>
    export default {
        name: "PermissionSelect",
        props: {
            value: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        watch: {
            "value": {
                immediate: false,
                handler: function () {
                    console.log('ee', this.value)
                    this.$refs.tree.setCheckedKeys(this.value)
                }
            }
        },
        data() {
            return {
                checkedKeys: [],
                data: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            }
        }, methods: {
            async updateTree() {
                const rep = await this.$api.genApi.PermissionApi.getTree()
                console.log('a', rep)
                this.data = rep.data
                console.log('bb', this.value)
                this.$nextTick(() => {
                    this.$refs.tree.setCheckedKeys(this.value)
                })

            },
            changeCheckTree(cur, list) {
                console.log(list)
                this.checkedKeys = list.checkedKeys
                this.$emit('input', this.checkedKeys)
            }
        },
        mounted() {
            this.updateTree()
        }
    }
</script>

<style scoped>

</style>
