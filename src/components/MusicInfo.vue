<script setup lang="ts">
import '@/style/backNav.css'
import {useMusicStore} from "@/store/music";
import {onUnmounted, ref, watch} from "vue";
import {musicLoading} from "@/hooks/loading";

const musicStore = useMusicStore()

let {season} = defineProps(["season"])
let songWord = ref()
let row = 0
let time = 0

musicStore.currentSeason = season
musicStore.getMusic()

onUnmounted(() => {
  musicStore.$reset()
})

//执行加载界面
musicLoading()

watch(() => musicStore.currentRow, () => {
  time++
  if (musicStore.currentRow >= 4) {
    songWord.value.scrollTop += 46
  }
  if (musicStore.currentRow != row && time >= 2) {
    if (musicStore.currentRow >= 4)
      songWord.value.scrollTop = (musicStore.currentRow - 3) * 46
    else
      songWord.value.scrollTop = musicStore.currentRow * 46
    time = 0
  }
})

function getScrollTop() {
  row = Math.round(songWord.value.scrollTop / 46) + 4
}

</script>

<template>
  <!--  歌单大图-->
  <div class="songListBox">
    <!--    专辑名-->
    <p class="songSum">{{ musicStore.musicListName }}</p>
    <!--    歌名-->
    <p class="songName">{{ musicStore.musicInfo.musicName }}</p>
    <!--    歌词-->
    <div class="songWord" ref="songWord" @scroll="getScrollTop">
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