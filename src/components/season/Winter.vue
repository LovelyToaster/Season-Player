<template>
  <img class="back" src="../../assets/images/blue01.JPG" alt="homeImg">
  <div class="menu">
    <!--头像-->
    <div class="userBox">
      <el-avatar :size="50" :icon="UserFilled"/><!--可换url路径-->
    </div>
  </div>
    <!-- nav栏-->
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

    <!--  歌单大图-->
    <div class="songListBox">
      <p class="songSum">{{ song.songSum }}</p>
      <p class="songName">{{ song.songName }}</p>
      <p class="songWord">{{ song.songWord }}</p>
    </div>
</template>

<script setup lang="ts">
import {UserFilled} from "@element-plus/icons-vue";
import '@/style/backNav.css'
import {ref} from "vue";

let song = ref({
  songSum: "秋季限定🍁收获属于秋天的丰饶吧",
  songName: "Autumn",
  songWord: "generation",
})
</script>

<style scoped>

</style>