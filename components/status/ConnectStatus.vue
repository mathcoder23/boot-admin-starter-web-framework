<template>
    <div v-if="true === status" class="online">
        <i style=""></i>
        <span style="font-size:12px;margin-left: 6px;">在线</span>
    </div>
    <div v-else class="offline">
        <i ></i>
        <span style="font-size:12px;margin-left: 6px;">离线</span>
    </div>
</template>

<script>
    export default {
        name: "ConnectStatus",
        props: {
            status: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style scoped lang="less">

    .online {
        i {
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #7ed321;
        }
    }

    .offline {
        i {
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #d0021b;
        }
    }
</style>