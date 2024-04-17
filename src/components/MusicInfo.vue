<script setup lang="ts">
import '@/style/backNav.css'
import {useMusicStore} from "@/store/music";
import {onUnmounted} from "vue";
import {musicLoading} from "@/hooks/loading";

const musicStore = useMusicStore()

let {season} = defineProps(["season"])

musicStore.currentSeason = season
musicStore.getMusic()

onUnmounted(() => {
  musicStore.$reset()
})

//执行加载界面
musicLoading()
</script>

<template>
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
</template>

<style scoped>

</style>