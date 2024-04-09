<template>
  <!--飘落的花朵-->
  <div class="flower">
    <img v-for="i in 2" :key="i" src="@/assets/falling/summerXiaohuanghua1.png" alt="flower">
    <img v-for="i in 2" :key="i" src="@/assets/falling/summerXiaohuanghua2.png" alt="flower">
    <img v-for="i in 2" :key="i" src="@/assets/falling/summerXiaohuanghua3.png" alt="flower">
    <img v-for="i in 2" :key="i" src="@/assets/falling/summerXiaohuanghua4.png" alt="flower">
  </div>
  <!--  背景-->
  <img class="back" src="../../assets/images/green09.JPG" alt="homeImg">
  <!--  导航栏-->
  <div class="menu">
    <!-- nav栏-->
    <div style="flex: 1;">
      <div class="dropdown">
        <button class="dropbtn">朱夏
          <span class="arrow">&#9652;</span>
        </button>
        <div class="dropdown-content">
          <a href="/Autumn">劲秋</a>
          <a href="/Winter">清冬</a>
          <a href="/Spring">芳春</a>
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
      <el-avatar :size="50" :icon="UserFilled" :src="loginStore.user.userAvatarUrl"/>
    </div>
  </div>
  </div>

  <!--  歌单大图-->
  <div class="songListBox">
    <p class="songSum">{{ musicStore.musicListName }}</p>
    <p class="songName">{{ musicStore.musicInfo.musicName }}</p>
    <p class="songWord" v-for="(lyric,index) in musicStore.lyricList"
       :style="{color:index===musicStore.currentRow?'red':'white'}">
      {{ lyric.text }}
    </p>
  </div>

  <Player/>
</template>

<script setup lang="ts">
import {UserFilled} from "@element-plus/icons-vue";
import '@/style/backNav.css'
import '@/style/falling.css'
import {onUnmounted, ref} from "vue";
import {reactive, toRefs} from "vue";
import Player from "@/components/Player.vue";
import {useLoginStore} from "@/store/login";
import {useMusicStore} from "@/store/music";
import router from "@/router";

const loginStore = useLoginStore()
const musicStore = useMusicStore()

const state = reactive({
  fits: ['fill'],
  url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
})

const {fits} = toRefs(state)

musicStore.currentSeason = "夏天 夏日 夏 summer"
musicStore.getMusic()

onUnmounted(() => {
  musicStore.$reset()
})
function backToHome() {
  loginStore.loginOut()
  router.push({name: 'home'});
}
</script>

<style scoped>
.songNameTop p {
  color: #cfa88e;
}
</style>