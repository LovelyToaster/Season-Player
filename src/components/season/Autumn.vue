<template>
  <!--飘落的花朵-->
  <div class="flower">
    <img v-for="i in 2" :key="i" src="@/assets/falling/autumnFengye1.png" alt="flower">
    <img v-for="i in 2" :key="i" src="@/assets/falling/autumnFengye2.png" alt="flower">
    <img v-for="i in 2" :key="i" src="@/assets/falling/autumnFengye3.png" alt="flower">
    <img v-for="i in 2" :key="i" src="@/assets/falling/autumnFengye4.png" alt="flower">
  </div>
  <img class="back" src="../../assets/images/gland01.JPG" alt="homeImg">

  <Menu seasonName="劲秋"/>

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
import '@/style/backNav.css'
import '@/style/falling.css'
import {onUnmounted} from "vue";
import Player from "@/components/Player.vue";
import Menu from "@/components/Menu.vue";
import {useMusicStore} from "@/store/music";
import {musicLoading} from "@/hooks/loading";

const musicStore = useMusicStore()

musicStore.currentSeason = "秋天 秋 autumn"
musicStore.getMusic()

onUnmounted(() => {
  musicStore.$reset()
})

//执行加载界面
musicLoading()

</script>

<style scoped>
.songNameTop p {
  color: #f5ae13;
}
</style>