<script setup lang="ts">
import {UserFilled} from "@element-plus/icons-vue";
import '@/style/backNav.css'
import {reactive, toRefs} from "vue";
import router from "@/router";
import {useMusicStore} from "@/store/music";
import {useLoginStore} from "@/store/login";

const loginStore = useLoginStore()
const musicStore = useMusicStore()
const state = reactive({
  fits: ['fill'],
  url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
})
const {fits} = toRefs(state)
let sendSeasonName = defineProps(["seasonName"]) //当前界面的季节
let seasonList = reactive([
  {"seasonName": "芳春", "seasonPath": "/Spring"},
  {"seasonName": "朱夏", "seasonPath": "/Summer"},
  {"seasonName": "劲秋", "seasonPath": "/Autumn"},
  {"seasonName": "清冬", "seasonPath": "/Winter"},
]) //所有季节

function backToHome() {
  loginStore.loginOut()
  router.push({name: 'home'});
}

//获取其余季节
function getSeason() {
  let index = seasonList.findIndex((season) => season.seasonName === sendSeasonName.seasonName)
  if (index > -1)
    seasonList.splice(index, 1)
}

getSeason()
</script>

<template>
  <!--  导航栏-->
  <div class="menu">
    <!-- nav栏-->
    <div style="flex: 1;">
      <div class="dropdown">
        <button class="dropbtn">{{ sendSeasonName.seasonName }}
          <span class="arrow">&#9652;</span>
        </button>
        <div class="dropdown-content">
          <a v-for="season in seasonList" :href="season.seasonPath ">{{ season.seasonName }}</a>
        </div>
      </div>
    </div>

    <div class="imgAndsong">
      <!--专辑照片-->
      <div class="Img-fit">
        <div v-for="fit in fits" :key="fit" class="block">
          <el-avatar shape="square" :size="50" :fit="fit" :src="musicStore.musicInfo.musicPhoto"/>
        </div>
      </div>
      <!--    歌名-->
      <div class="songNameTop">
        <p>{{ musicStore.musicInfo.musicName }}</p>
      </div>
    </div>
    <!--    头像和退出按钮-->
    <div class="userBox-back">
      <!--    退出登录-->
      <div class="backBtn">
        <button @click="backToHome">退出登录</button>
      </div>
      <div class="userBox">
        <el-avatar :size="50" :icon="UserFilled" :src="loginStore.user.userAvatarUrl"/><!--可换url路径-->
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>