<template>
    <div>

    </div>
</template>

<script>
    export default {
        name: "VueWebsocket",
        data() {
            return {
                isWsOnline: false,
                skipGetConfigCount: 0,
                config: {}
            };
        },
        mounted() {
            // this.getWebsocketConfig()
            this.daemon()
            //假如连接一样，10秒重连一次
            setInterval(() => {
                this.daemon()
            }, 10000)
        },
        beforeDestroy() {

        },
        methods: {
            async daemon() {
                if (this.isWsOnline === true) {
                    return;
                }
                console.log('websocket daemon')
                let isGetConfig = false
                if (!this.config || !this.config.token) {
                    isGetConfig = true
                } else if (this.skipGetConfigCount > 5) {
                    this.skipGetConfigCount = 0
                    isGetConfig = true
                }
                if (isGetConfig) {
                    await this.getWebsocketConfig()
                } else {
                    this.skipGetConfigCount++
                }
                this.initWebSocket()

            },
            async getWebsocketConfig() {
                let config = await this.$api.genApi.WebsocketApi.getConfig()
                config = config.data
                console.log('websocket config :', config)
                this.config = config
            },
            initWebSocket() {
                let url = `${this.config.proto}://${this.config.serverIp}:${this.config.serverPort}${this.config.uri}?token=${this.config.token}`
                console.log('websocket url:', url)
                this.websock = new WebSocket(url);
                this.websock.onmessage = this.websocketOnMessage;
                this.websock.onopen = this.websocketOnOpen;
                this.websock.onerror = this.websocketOnError;
                this.websock.onclose = this.websocketOnClose;
            },
            websocketOnOpen() {
                this.websocketSend('hello')
                console.log('websocket 连接成功');
                this.isWsOnline = true
            },
            websocketOnError() {//连接建立失败重连
                // this.initWebSocket()
                this.isWsOnline = false
            },
            websocketOnMessage(e) {
                console.log(e)

            },
            websocketSend(Data) {//数据发送
                this.websock.send(Data)
            },
            websocketOnClose(e) {  //关闭
                console.log('断开连接', e)
                console.log('websocket 连接失败');
                this.isWsOnline = false
            }

        }
    }
</script>

<style scoped>

</style>
