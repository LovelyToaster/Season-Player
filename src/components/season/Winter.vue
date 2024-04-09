<template>
  <!--飘落的花朵-->
  <div class="flower">
    <img v-for="i in 4" :key="i" src="../../assets/falling/winterXuehua1.png" alt="flower">
    <img v-for="i in 4" :key="i" src="../../assets/falling/winterXuehua2.png" alt="flower">
  </div>
  <!--  背景-->
  <img class="back" src="../../assets/images/blue01.JPG" alt="homeImg">
  <!--  导航栏-->
  <div class="menu">
    <!-- nav栏-->
    <div style="flex: 1;">
      <div class="dropdown">
        <button class="dropbtn">清冬
          <span class="arrow">&#9652;</span>
        </button>
        <div class="dropdown-content">
          <a href="/Spring">芳春</a>
          <a href="/Summer">朱夏</a>
          <a href="/Autumn">劲秋</a>
        </div>
      </div>
    </div>
    <!--    专辑和歌名-->
    <div class="imgAndsong">
      <!--专辑照片-->
      <div class="Img-fit">
        <div v-for="fit in fits" :key="fit" class="block">
          <el-avatar shape="square" :size="50" :fit="fit" :src="url"/>
        </div>
      </div>
      <!--    歌名-->
      <div class="songNameTop">
        <p>{{ song.songName }}</p>
      </div>
    </div>
    <!--    头像和退出按钮-->
    <div class="userBox-back">
      <!--    退出登录-->
      <div class="backBtn">
        <button @click="backToHome">退出登录</button>
      </div>
      <div class="userBox">
        <el-avatar :size="50" :icon="UserFilled"/><!--可换url路径-->
      </div>
    </div>
  </div>

  <!--  歌单大图-->
  <div class="songListBox">
    <p class="songSum">{{ song.songSum }}</p>
    <p class="songName">{{ song.songName }}</p>
    <p class="songWord">{{ song.songWord }}</p>
  </div>

  <!--  播放器组件-->
  <Player/>
</template>

<script setup lang="ts">
import {UserFilled} from "@element-plus/icons-vue";
import '@/style/backNav.css'
import '@/style/falling.css'
import {ref} from "vue";
import {reactive, toRefs} from "vue";
import Player from "@/components/Player.vue";

let song = ref({
  songSum: "秋季限定🍁收获属于秋天的丰饶吧",
  songName: "Autumn",
  songWord: "generation",
})

const state = reactive({
  fits: ['fill'],
  url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
})

const {fits, url} = toRefs(state)

// 退出登录
function backToHome() {

}
</script>

<style scoped>
.songNameTop p {
  color: #6fbcf0;
}
</style>