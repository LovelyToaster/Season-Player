<template>
  <img class="back" src="../../assets/images/gland01.JPG" alt="homeImg">
  <!--  导航栏-->
  <div class="menu">
    <!-- nav栏-->
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

    <!--头像-->
    <div class="userBox">
      <el-avatar :size="50" :icon="UserFilled" :src="loginStore.user.userAvatarUrl"/>
    </div>

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
import {UserFilled} from '@element-plus/icons-vue'
import '@/style/backNav.css'
import {onUnmounted, reactive, ref, toRefs} from "vue";
import Player from "@/components/Player.vue";
import {useLoginStore} from "@/store/login";
import {useMusicStore} from "@/store/music";

const loginStore = useLoginStore()
const musicStore = useMusicStore()

const state = reactive({
  fits: ['fill'],
  url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
})

const {fits} = toRefs(state)
musicStore.getMusic("秋天 秋 autumn")

onUnmounted(() => {
  musicStore.$reset()
})
</script>

<style scoped>
.songNameTop p {
  color: #f5ae13;
}
</style>