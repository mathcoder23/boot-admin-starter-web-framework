<template>
  <div class="avue-sidebar">
    <logo></logo>
    <el-scrollbar style="height:100%">
      <div v-if="validatenull(menu)"
           class="avue-sidebar--tip">{{$t('menuTip')}}</div>
      <el-menu unique-opened
               :default-active="nowTagValue"
               mode="vertical"
               :show-timeout="200"
               :collapse="keyCollapse">
        <sidebar-item :menu="menu"
                      :screen="screen"
                      first
                      :props="website.menu.props"
                      :collapse="keyCollapse"></sidebar-item>
      </el-menu>
      <!--<div class='version-class' >-->
        <!--<el-link :underline="false" @click="clickWebVersion">前端版本号：{{webVersion}}</el-link>-->
        <!--<el-link :underline="false" @click="clickBackVersion">后端版本号：{{backVersion}}</el-link>-->
      <!--</div>-->
    </el-scrollbar>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import logo from "../logo";
  import sidebarItem from "./sidebarItem";
  import {webVersion} from "../../../version";
  import {baseUrl} from "../../../config/env";
  export default {
    name: "sidebar",
    components: { sidebarItem, logo },
    inject: ["index"],
    data () {
      return {
        webVersion:webVersion
        ,backVersion:null
      };
    },
    created () {
      this.index.openMenu(this.menuId)
    },
    computed: {
      ...mapGetters(["website", "menu", "tag", "keyCollapse", "screen", "menuId"]),
      nowTagValue: function () {
        return this.$router.$avueRouter.getValue(this.$route);
      }
    },
    mounted () {
      // CommApi.getVersion().then(rep=>{
      //   this.backVersion = rep.data
      // })
    },
    methods: {
      clickWebVersion(){
        window.open(baseUrl+'/commApi/version/webVersionLog.html',"_blank");
      },
      clickBackVersion(){
        window.open(baseUrl+'/commApi/version/backVersionLog.html',"_blank");

      }
    }
  };
</script>
<style lang="scss" scoped>
  .version-class{
    font-size: 12px;
    text-align: center;
    color: rgb(240, 240, 240);
    position: absolute;
    bottom: 10px;
    width: 100%;
    a{
      display:block;
    }
  }
</style>

