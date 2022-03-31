<template>
    
</template>

<script>
    export default {
        name: "TableBannerCheck",
        data(){
            return {
                isSelectAll:false
            }
        },
        methods:{
            selectAll(){
                this.isSelectAll = true
            },
            removeSelection(selections){
                selections.forEach(row => {
                    this.$refs.table.toggleRowSelection(row);
                });
            },
            clearSelect(){
                this.isSelectAll = false
                this.$refs.table.clearSelection();
            },
            selectAllCancel(){
                this.isSelectAll = false
            },
        }
    }
</script>

<style scoped>

</style>