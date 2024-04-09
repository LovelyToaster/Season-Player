<template>
  <!--飘落的花朵-->
  <div class="flower">
    <img v-for="i in 2" :key="i" src="@/assets/falling/autumnFengye1.png" alt="flower">
    <img v-for="i in 2" :key="i" src="@/assets/falling/autumnFengye2.png" alt="flower">
    <img v-for="i in 2" :key="i" src="@/assets/falling/autumnFengye3.png" alt="flower">
    <img v-for="i in 2" :key="i" src="@/assets/falling/autumnFengye4.png" alt="flower">
  </div>
  <img class="back" src="../../assets/images/gland01.JPG" alt="homeImg">
  <!--  导航栏-->
  <div class="menu">
    <!-- nav栏-->
    <div style="flex: 1;">
      <div class="dropdown">
        <button class="dropbtn">劲秋
          <span class="arrow">&#9652;</span>
        </button>
        <div class="dropdown-content">
          <a href="/Winter">清冬</a>
          <a href="/Spring">芳春</a>
          <a href="/Summer">朱夏</a>
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

  <!--  歌单大图-->
  <div class="songListBox">
    <!--    专辑名-->
    <p class="songSum">{{ musicStore.musicListName }}</p>
    <!--    歌名-->
    <p class="songName">{{ musicStore.musicInfo.musicName }}</p>
    <!--    歌词-->
    <div class="songWord">
      <ul>
        <li v-for="(lyric,index) in musicStore.lyricList"
            :style="{color:index===musicStore.currentRow?'red':'white'}">
          {{ lyric.text }}
        </li>
      </ul>
    </div>
  </div>

  <Player/>
</template>

<script setup lang="ts">
import {UserFilled} from '@element-plus/icons-vue'
import '@/style/backNav.css'
import '@/style/falling.css'
import {onUnmounted, reactive, ref, toRefs, watch, watchEffect} from "vue";
import Player from "@/components/Player.vue";
import {useLoginStore} from "@/store/login";
import {useMusicStore} from "@/store/music";
import router from "@/router";
import {ElLoading} from "element-plus";
import {musicLoading} from "@/hooks/loading";

const loginStore = useLoginStore()
const musicStore = useMusicStore()

const state = reactive({
  fits: ['fill'],
  url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
})

const {fits} = toRefs(state)
musicStore.currentSeason = "秋天 秋 autumn"
musicStore.getMusic()

onUnmounted(() => {
  musicStore.$reset()
})

function backToHome() {
  loginStore.loginOut()
  router.push({name: 'home'});
}

const elLoadingOptions = {
  lock: true,
  text: "加载中，请稍后"
}

//执行加载界面
musicLoading()

</script>

<style scoped>
.songNameTop p {
  color: #f5ae13;
}
</style>