<template>
  <!--  切换歌-->
  <div class="playIcon">
    <!--      上一首-->
    <el-icon
        size="30px"
        :color="prevColor"
        @click.stop="handlePrevClick"
        @mouseenter="prevColor = 'black'"
        @mouseleave="prevColor = 'white'"
    >
      <ArrowLeft/>
    </el-icon>
    <!--      播放-->
    <el-icon
        size="30px"
        :color="playColor"
        @click.stop="handlePlayPauseClick"
        @mouseenter="playColor = 'black'"
        @mouseleave="playColor = 'white'"
    >
      <component :is="playPauseIcon"/>
    </el-icon>

    <!--      下一首-->
    <el-icon
        size="30px"
        :color="nextColor"
        @click.stop="handleNextClick"
        @mouseenter="nextColor = 'black'"
        @mouseleave="nextColor = 'white'"
    >
      <ArrowRight/>
    </el-icon>
  </div>
</template>

<script setup lang="ts">
import {ArrowLeft, ArrowRight,VideoPause,VideoPlay} from "@element-plus/icons-vue";
import {computed, ref} from "vue";

const prevColor = ref('white')
const nextColor = ref('white')
const playColor = ref('white')
const isPlaying = ref(false)

const playPauseIcon = computed(() => {
  return isPlaying.value ? VideoPause : VideoPlay
})

const handlePrevClick = () => {
  // 处理上一首逻辑
  // 添加缩放效果的CSS代码
}

const handlePlayPauseClick = () => {
  isPlaying.value = !isPlaying.value
  // 处理播放/暂停逻辑
}

const handleNextClick = () => {
  // 处理下一首逻辑
  // 添加缩放效果的CSS代码
}
</script>

<style scoped>
.playIcon {
  display: flex;
  justify-content: center;
  margin-top: 20%;
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