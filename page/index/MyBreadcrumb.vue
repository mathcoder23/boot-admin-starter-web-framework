<template>
    <div class="margin-bottom-sm margin-top-sm margin-left-sm">
        <el-breadcrumb separator="/" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="item in menuList" :key="item.path">
                {{item.name}}
            </el-breadcrumb-item>

        </el-breadcrumb>
    </div>
</template>

<script>
    export default {
        name: "MyBreadcrumb",
        data() {
            return {
                menuList: []
            }
        },
        watch: {
            "$route.matched": {
                immediate: true,
                handler: function () {
                    this.menuList = this.$route.matched
                }
            }
        }
    }
</script>

<style scoped>

</style>