<template>
    <div class="login-container"
         style=""
         @keyup.enter.native="handleLogin">
        <top-color v-show="false"></top-color>
        <div class="login-weaper animated bounceInDown">
            <div class="login-left" v-if="false">
                <img class="img"
                     src="img/logo.png"
                     alt="">
                <p class="title">{{ $t('login.info') }}</p>
            </div>
            <div class="login-border">
                <div class="login-main">
                    <h4 class="login-title">
                        {{ $t('login.title') }}{{website.title}}{{publicWebConfig.title}}123
                        <!--            <top-lang></top-lang>-->
                    </h4>

                    <userLogin v-if="activeName==='user'"></userLogin>
                    <!--          <codeLogin v-else-if="activeName==='code'"></codeLogin>-->
                    <!--          <thirdLogin v-else-if="activeName==='third'"></thirdLogin>-->
                    <!--          <faceLogin v-else-if="activeName==='face'"></faceLogin>-->
                    <div class="login-menu">
                        <a href="#"
                           @click.stop="activeName='user'">{{ $t('login.userLogin') }}</a>
                        <!--            <a href="#"-->
                        <!--               @click.stop="activeName='code'" >{{ $t('login.phoneLogin') }}</a>-->
                        <!--            <a href="#"-->
                        <!--               @click.stop="activeName='face'">{{ $t('login.faceLogin') }}</a>-->
                        <!--            <a href="#"-->
                        <!--               @click.stop="activeName='third'">{{ $t('login.thirdLogin') }}</a>-->
                    </div>
                </div>

            </div>
        </div>
        <div class="copyright">
            {{webVersion}}<a href="http://www.beian.miit.gov.cn/"> ©copyright 2019-2020 蜀ICP备xxxxx号-1</a>
        </div>
    </div>
</template>
<script>
    import userLogin from "./userlogin";
    import codeLogin from "./codelogin";
    import thirdLogin from "./thirdlogin";
    import faceLogin from "./facelogin";
    import {mapGetters} from "vuex";
    import {dateFormat} from "@_framework/util/date";
    import {validatenull} from "@_framework/util/validate";
    import topLang from "@_framework/page/index/top/top-lang";
    import topColor from "@_framework/page/index/top/top-color";
    import {webVersion} from "../../version";

    export default {
        name: "login",
        components: {
            userLogin,
            codeLogin,
            thirdLogin,
            faceLogin,
            topLang,
            topColor
        },
        data() {
            return {
                time: "",
                activeName: "user",
                webVersion: webVersion
            };
        },
        watch: {
            $route() {
                const params = this.$route.query;
                this.socialForm.state = params.state;
                this.socialForm.code = params.code;
                if (!validatenull(this.socialForm.state)) {
                    const loading = this.$loading({
                        lock: true,
                        text: `${
                            this.socialForm.state === "WX" ? "微信" : "QQ"
                            }登录中,请稍后。。。`,
                        spinner: "el-icon-loading"
                    });
                    setTimeout(() => {
                        loading.close();
                    }, 2000);
                }
            }
        },
        created() {


        },
        mounted() {
        },
        computed: {
            ...mapGetters(["website", "publicWebConfig"])
        },
        props: [],
        methods: {}
    };
</script>

<style lang="scss">
    @import "./login.scss";
</style>