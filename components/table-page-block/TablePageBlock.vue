<template>
    <div class="content">
        <div class="table-header">
            <slot name="head"></slot>
        </div>
        <slot>

        </slot>
    </div>
</template>

<script>
    export default {
        name: "TablePageBlock"
    }
</script>

<style scoped lang="scss">
    .content {
        background-color: white;
        padding-top: 5px;
        padding-bottom: 5px;

        .table-header {
            border: #ddd solid 1px;
            border-radius: 5px;
            padding: 10px 30px;
            margin: 5px 10px 5px;
            display: flex;
            justify-content: space-between;

            & div * {
                margin-left: 10px;
            }

            & div {
                display: flex;
            }
        }
        .search-more{
            padding: 10px 30px;
            margin: 5px 10px 5px;
            display: flex;
            flex-wrap: wrap;
            & div  {
                margin-left: 10px;
                margin-top:10px;
            }
        }
        .table-banner {
            //border:#ddd solid 1px;
            //border-radius: 8px;
            padding-left: 10px;
            padding-right: 8px;
            margin: 5px 10px 5px;
            display: flex;
            justify-content: space-between;
        }

        .table-content {
            border: #ddd solid 1px;
            border-radius: 8px;
            padding: 10px;
            margin: 5px 10px 150px;
        }
    }

</style>