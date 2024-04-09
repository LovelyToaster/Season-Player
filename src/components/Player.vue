<template>
  <!--  进度条-->
  <div class="bar">
    <el-progress
        :percentage="musicPlayPercentage"
        :text-inside="true"
        :stroke-width="20"
    />
  </div>

  <div class="playIconContainer">
    <!--  切换歌-->
    <div class="playIcon">
      <!--      上一首-->
      <el-icon
          size="50px"
          :color="prevColor"
          @click.stop="handlePrevClick"
          @mouseenter="prevColor = 'black'"
          @mouseleave="prevColor = 'white'"
      >
        <ArrowLeft/>
      </el-icon>
      <!--      播放-->
      <el-icon
          size="50px"
          :color="playColor"
          @click.stop="handlePlayPauseClick"
          @mouseenter="playColor = 'black'"
          @mouseleave="playColor = 'white'"
      >
        <component :is="playPauseIcon"/>
      </el-icon>

      <!--      下一首-->
      <el-icon
          size="50px"
          :color="nextColor"
          @click.stop="handleNextClick"
          @mouseenter="nextColor = 'black'"
          @mouseleave="nextColor = 'white'"
      >
        <ArrowRight/>
      </el-icon>
    </div>
    <!--  切换歌单-->
    <button class="changeSongList" @click="changeSongList">换首歌单</button>
  </div>
  <audio :src="musicStore.musicInfo.musicSrc" autoplay ref="audio" @timeupdate="timeUpdate"></audio>
</template>

<script setup lang="ts">
import {ArrowLeft, ArrowRight, VideoPause, VideoPlay} from "@element-plus/icons-vue";
import {computed, ref, watch} from "vue";
import {useMusicStore} from "@/store/music";


const prevColor = ref('white')
const nextColor = ref('white')
const playColor = ref('white')
const isPlaying = ref(false)
let audio = ref()
let audioCurrentTime = ref(0)
const musicStore = useMusicStore()
let musicPlayPercentage = ref(0)

const playPauseIcon = computed(() => {
  return isPlaying.value ? VideoPause : VideoPlay
})

const handlePrevClick = () => {
  // 处理上一首逻辑
  // 添加缩放效果的CSS代码
  if (musicStore.currentMusic - 1 >= 0) {
    musicStore.currentRow = 0
    musicStore.currentMusic--
    musicStore.switchMusic()
  }
}

const handlePlayPauseClick = () => {
  if (isPlaying.value)
    audio.value.pause()
  else
    audio.value.play()
  isPlaying.value = !isPlaying.value
  // 处理播放/暂停逻辑
}

const handleNextClick = () => {
  // 处理下一首逻辑
  // 添加缩放效果的CSS代码
  if (musicStore.currentMusic + 1 < musicStore.musicList.length) {
    musicStore.currentRow = 0
    musicStore.currentMusic++
    musicStore.switchMusic()
  }
}

const changeSongList = () => {
  // 处理换歌单
}

function timeUpdate() {
  audioCurrentTime.value = Math.ceil(audio.value.currentTime)
  let musicPlayPercentageTemp = Math.ceil(audioCurrentTime.value / Math.ceil(audio.value.duration) * 100)
  if (musicPlayPercentageTemp >= 0 || musicPlayPercentageTemp <= 100)
    musicPlayPercentage.value = musicPlayPercentageTemp
}

watch(audioCurrentTime, newValue => {
  if (!isPlaying.value)
    isPlaying.value = !isPlaying.value
  for (let i = 0; i < musicStore.lyricList.length; i++) {
    if (newValue === musicStore.lyricList[i].time)
      musicStore.currentRow = i
  }
})
</script>

<style scoped>
.playIconContainer {
  display: flex; /* 使用 Flexbox 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  margin: 0 auto;
  padding-top: 30px;
}

/*切换歌单按钮*/
.changeSongList {
  height: 50px;
  width: 120px;
  font-size: 18px;
  color: white;
  border: 2px solid white;
  margin-left: 50px;
  border-radius: 50px;
  background-color: transparent;
  animation: slide-in-up 1s ease-in-out forwards;
  animation-delay: 0s;
  transition: font-size 0.3s;
}

button:hover {
  color: white;
  font-size: 1.1em;
}

button:active {
  font-size: 0.9em; /* 设置按钮文字变大 */
}

/* 确保进度条容器占据足够的空间 */
.bar {
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: 15% auto 20px auto; /* 上下边距 */
  animation: slide-in-up 1s ease-in-out forwards;
  animation-delay: 0s;
}

/* 进度条样式 */
.bar .el-progress--line {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* 将进度条居中 */
  max-width: 100%;
  width: 100%;
}

.bar .el-progress--line .el-progress--text {
  display: none; /* 隐藏百分比文本 */
}

.playIcon {
  animation: slide-in-up 1s ease-in-out forwards;
  animation-delay: 0s;
}

.playIcon .el-icon {
  transition: transform 0.3s, color 0.3s;
  margin: 0 20px; /* 增加了左右 margin */
}

.playIcon .el-icon:hover {
  transform: scale(1.2);
}

.playIcon .el-icon:active {
  transform: scale(0.8);
}
</style>