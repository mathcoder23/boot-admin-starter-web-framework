<template>
    <div class="table-banner">
        <div>
            <div class="check-all" v-if="showSelectAll">
                <el-checkbox v-model="checkIsAll"
                             :disabled="page.total===0"
                             @change="changeCheckAll">
                    全选
                </el-checkbox>
                <em>|</em>
                <i style='margin-right:2px;' type='primary' class="el-icon-warning"> </i>
                <span>已选择<span style="margin-left:2px;margin-right:2px;color:rgb(64, 158, 255)">{{checked.itemCount}}</span>项</span>
                <el-link @click="clickClear"
                         type="primary"
                         :disabled="!checkClearable"
                         size="mini"
                         :underline="false">清除
                </el-link>
            </div>
            <div v-if="isShowTag">
                <el-tag closable v-for="(item, index) in checkedSelection" @on-close="clearSelectItem( index)">{{item.name}}</el-tag>
            </div>
        </div>
        <div class="pages">
            <el-pagination
                    @size-change="changeSize"
                    @current-change="changeCurrent"
                    :current-page.sync="page.pageNum"
                    :page-sizes="[5, 10, 20, 50,100]"
                    :page-size.sync="page.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="page.total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: "table-banner",
        model: {
            prop: 'page',  // 自定义prop属性
            event: 'hand'    // 自定义它的触发方法名
        },
        props: {
            page: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            checkedSelection:{
                type: Array,
                default:()=>{
                    return []
                }
            },
            isShowTag:{
                type:Boolean,
                default:true
            },
            showSelectAll:{
                type:Boolean,
                default:true
            }
        },
        data() {
            return {
                checkIsAll: false,
                checkClearable: false,
                checked:{
                    itemCount:0
                },
            }
        },
        methods: {
            restSelect(){
                this.changeCheckAll(false)
                this.checkClearable = false
            },
            clearSelectItem(index){
                let remove = this.checkedSelection.splice(index,1)
                this.$emit('removeSelection',remove)
            },
            clickClear() {
                this.changeCheckAll(false)
            },
            changeCheckAll(newChange) {
                this.checkIsAll = newChange
                this.$emit('clearSelect')
                if(true === newChange){
                    this.checked.itemCount = this.page.total
                    this.$emit('selectAll')
                }else{
                    this.checked = Object.assign({},this.checked,{
                        itemCount:0
                    })
                }
            },

            changeSize() {
                this.$emit('hand', this.page)

                this.$emit('update')
            },
            changeCurrent(c) {
                this.$emit('hand', this.page)
                console.log('page', this.page)
                this.$emit('update')
            }
        },
        watch:{
            checkedSelection(selection){
                if(selection.length > 0){
                    this.checkIsAll = false
                    this.checked = Object.assign({},this.checked,{
                        itemCount:selection.length
                    })
                    this.$emit('selectAllCancel')

                }else if(false === this.checkIsAll){
                    this.checked = Object.assign({},this.checked,{
                        itemCount:0
                    })
                }
                this.checkClearable = !(selection.length === 0)

            }
        }
    }
</script>

<style scoped lang="scss">
    .check-all {
        margin-left:5px;
        display: flex;
        align-items: center;
        flex-basis:5px;
        & > em{
            margin-left:8px;
            margin-right:8px;
        }
        & > span{
            font-size:12px;
            margin-right:5px;
        }

    }

</style>