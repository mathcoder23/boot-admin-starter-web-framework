<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    // import VueWebsocket from "./components/notify/VueWebsocket";

    import {EventBusHandler} from "./event/event_bus_handler";

    export default {
        name: "app",
        components: {},
        data() {
            return {};
        },
        mounted() {
            EventBusHandler.onPage(this)
            // this.$store.dispatch("GetEnumFormatValue")
        },
        created() {
        },
        methods: {},
        computed: {}
    };
</script>
<style lang="scss">
    #app {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
</style>
