<template>
    <avue-form :option="option" v-model="form" @submit="handleSubmit">
        <template slot="group1Header" slot-scope="scope">
            <h4>{{scope}}</h4>
        </template>
    </avue-form>
</template>

<script>
    export default {
        name: "SystemConfig",
        data() {
            return {
                form: {},
                option: {},
                cache: {}
            }
        },
        mounted() {
            this.updateList()
        },
        methods: {
            handleSubmit(data, done) {

                let changeList = []
                //比较修改项
                for (let item in this.form) {
                    let temp = this.cache[item]
                    if (temp) {
                        if (temp.value !== this.form[item]) {
                            changeList.push({id: temp.id, value: this.form[item]})
                        }
                    }
                }
                console.log('form', this.form)
                console.log('change', changeList)
                if (changeList.length > 0) {
                    this.$api.genApi.SystemConfigApi.simpleBatchModify(changeList).then(() => {
                        done()
                        this.updateList()
                    })
                } else {
                    done()
                }
            },
            async updateList() {
                let rep = await this.$api.genApi.SystemConfigApi.getAllConfig()
                console.log(rep)
                let data = rep.data
                this.cache = {}
                let option = {
                    group: [],
                    emptyBtn: false,
                    submitText: '保存配置'
                }
                for (let item of data) {
                    let group = {
                        label: item.name,
                        prop: item.id,
                        column: [],
                        icon: 'el-icon-info'
                    }
                    for (let config of item.list) {
                        group.column.push({
                            label: config.label,
                            prop: config.configKey,
                            labelTip: config.remark,
                            labelWidth: 150
                        })
                        this.form[config.configKey] = config.value
                        this.cache[config.configKey] = config
                    }
                    option.group.push(group)
                }
                this.option = option
            }
        }
    }
</script>

<style scoped>

</style>
