<template>
    <div class="avue-contail"
         :class="{'avue--collapse':isCollapse}">
        <!--    <screenshot></screenshot>-->
        <div class="avue-header">
            <!-- 顶部导航栏 -->
            <top ref="top"/>
        </div>

        <div class="avue-layout">
            <div class="avue-left">
                <!-- 左侧导航栏 -->
                <sidebar/>
            </div>
            <div class="avue-main"
                 :class="{'avue-main--fullscreen':!isMenu}">
                <!-- 顶部标签卡 -->
                <!--        <tags />-->
                <!--        <transition name="fade-scale">-->
                <!--          <search class="avue-view"-->
                <!--                  v-show="isSearch"></search>-->
                <!--        </transition>-->
                <!-- 主体视图层 -->
                <div class="" style="height:100%;overflow-y:auto;overflow-x:hidden;"
                     id="avue-view"
                     v-show="!isSearch">
                    <basic-container>
                        <my-breadcrumb/>
                        <keep-alive>
                            <router-view class="avue-view"
                                         v-if="$route.meta.$keepAlive"/>
                        </keep-alive>
                        <router-view class="avue-view"
                                     v-if="!$route.meta.$keepAlive"/>
                    </basic-container>

                </div>
            </div>
        </div>
        <!-- <el-footer class="avue-footer">
          <img src="/svg/logo.svg"
               alt=""
               class="logo">
          <p class="copyright">© 2018 Avue designed by smallwei</p>
        </el-footer> -->
        <div class="avue-shade"
             @click="showCollapse"></div>
        <div>aaa</div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import tags from "./tags";
    import screenshot from './screenshot';
    import search from "./search";
    import top from "./top/";
    import sidebar from "./sidebar/";
    import admin from "@_framework/util/admin";
    import {validatenull} from "@_framework/util/validate";
    import {calcDate} from "@_framework/util/date.js";
    import {getStore} from "@_framework/util/store.js";
    import MyBreadcrumb from "./MyBreadcrumb";
    import {EventBusHandler} from "../../event/event_bus_handler";

    export default {
        components: {
            MyBreadcrumb,
            top,
            tags,
            search,
            sidebar,
            screenshot
        },
        name: "index",
        provide() {
            return {
                index: this
            };
        },
        data() {
            return {
                //搜索控制
                isSearch: false,
                //刷新token锁
                refreshLock: false,
                //刷新token的时间
                refreshTime: ""
            };
        },
        created() {
            //实时检测刷新token
            this.refreshToken();
        },
        mounted() {
            EventBusHandler.onAuth(this)
            this.init();
        },
        computed: mapGetters(["isMenu", "isLock", "isCollapse", "website", "menu"]),
        props: [],
        methods: {
            showCollapse() {
                this.$store.commit("SET_COLLAPSE");
            },
            // 屏幕检测
            init() {
                this.$store.commit("SET_SCREEN", admin.getScreen());
                window.onresize = () => {
                    setTimeout(() => {
                        this.$store.commit("SET_SCREEN", admin.getScreen());
                    }, 0);
                };
            },
            //打开菜单
            openMenu(item = {}) {
                this.$store.dispatch("GetMenu", item.parentId).then(data => {
                    if (data.length !== 0) {
                        this.$router.$avueRouter.formatRoutes(data, true);
                    }
                    //当点击顶部菜单做的事件
                    if (!this.validatenull(item)) {
                        let itemActive = {},
                            childItemActive = 0;
                        //vue-router路由
                        if (item.path) {
                            itemActive = item;
                        } else {
                            if (this.menu[childItemActive].length == 0) {
                                itemActive = this.menu[childItemActive];
                            } else {
                                itemActive = this.menu[childItemActive].children[childItemActive];
                            }
                        }
                        this.$store.commit('SET_MENUID', item);
                        this.$router.push({
                            path: this.$router.$avueRouter.getPath({
                                name: itemActive.label,
                                src: itemActive.path
                            }, itemActive.meta)
                        });
                    }

                });
            },
            // 10分钟检测一次token
            refreshToken() {
                // this.refreshTime = setInterval(() => {
                //   const token = getStore({
                //     name: "token",
                //     debug: true
                //   }) || {};
                //   const date = calcDate(token.datetime, new Date().getTime());
                //   if (validatenull(date)) return;
                //   if (date.seconds >= this.website.tokenTime && !this.refreshLock) {
                //     this.refreshLock = true;
                //     this.$store
                //       .dispatch("RefeshToken")
                //       .then(() => {
                //         this.refreshLock = false;
                //       })
                //       .catch(() => {
                //         this.refreshLock = false;
                //       });
                //   }
                // }, 1000);
            }
        }
    };
</script>