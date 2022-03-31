<template>
    <el-card>
        <avue-crud :data="list" :option="option"
                   ref="form"
                   @date-change="dateChange"
                   :page.sync="page"
                   :search.sync="search"
                   @current-change="pageChange"
                   @refresh-change="updateList"
                   @row-del="clickDel"
                   @row-update="clickEdit"
                   @search-reset="searchReset"
                   @search-change="searchChange"
                   @row-save="clickSave">
            <template slot-scope="{}" slot="datetimeSearch">

                <el-date-picker
                        :clearable="false"
                        v-model="search.date"
                        type="datetimerange"
                        :picker-options="pickerOptions"
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :default-time="['00:00:00','23:59:59']"
                        align="right">
                </el-date-picker>
            </template>
            <template slot-scope="scope" slot="menu">

            </template>
        </avue-crud>
    </el-card>
</template>

<script>
    import {DateUtils} from "../../util/DateUtils";

    export default {
        name: "SystemLog",
        data() {
            return {
                list: [],
                page: {
                    currentPage: 1,
                    pageSize: 20
                },
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                roleList: [],
                search: {
                    date: [DateUtils.getMonthFirstByDate(new Date()), DateUtils.getDayEndByDate(new Date())]
                },
                option: {
                    align: 'center',
                    menuAlign: 'center',
                    addBtn: false,
                    editBtn: false,
                    delBtn: false,
                    column: [
                        {
                            label: 'id',
                            prop: 'id',
                            hide: true,
                            editDisplay: false,
                            addDisplay: false
                        },
                        {
                            label: '时间',
                            prop: 'datetime',
                            format: "yyyy-MM-dd HH:mm:ss",
                            valueFormat: "yyyy-MM-dd HH:mm:ss",
                            searchSpan: 9,
                            searchOrder: 0,
                            search: true
                        },
                        {
                            label: '操作账户',
                            prop: 'accountName',
                            search: true
                        },
                        {
                            label: 'ip',
                            prop: 'ip',
                            search: true
                        },
                        {
                            label: 'api',
                            prop: 'api',
                            search: true
                        },
                        {
                            label: 'log',
                            prop: 'log',
                            search: true
                        },
                    ]
                }
            }
        },
        mounted() {
            this.updateList()
        },
        methods: {
            searchReset() {
                this.search = {
                    date: [DateUtils.getMonthFirstByDate(new Date()), DateUtils.getDayEndByDate(new Date())]
                }
            },
            dateChange(date) {
                this.$message.success(date);
            },
            pageChange() {
                console.log('change')
                this.updateList()
            },
            searchChange(params, done) {
                done()
                this.updateList()
            },
            async updateList() {
                let search = JSON.parse(JSON.stringify(this.search))
                console.log('search', search)
                search.pageNo = this.page.currentPage
                search.pageSize = this.page.pageSize
                if (search.date) {
                    search.startDate = DateUtils.datetimeFormat(new Date(search.date[0]))
                    search.endDate = DateUtils.datetimeFormat(new Date(search.date[1]))
                }
                delete search.date

                const rep = await this.$api.genApi.SystemLogApi.list(search)
                console.log('a', rep)
                this.list = rep.data.list
                this.page.total = rep.data.total
            }
        }
    }
</script>

<style scoped>

</style>
