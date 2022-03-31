<template>
    <div>
        <div v-if="enable">
            授权(在线)
        </div>
        <div v-else>
            未授权(离线)
        </div>
    </div>
</template>

<script>
    export default {
        name: "MyStatus",
        props:{
            enable:{
                type:Boolean,
                default:false
            }
        }
    }
</script>

<style scoped>

</style>