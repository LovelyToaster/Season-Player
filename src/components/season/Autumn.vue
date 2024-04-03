<template>
  <img class="back" src="../../assets/images/green09.JPG" alt="homeImg">
  <!--  导航栏-->
  <div class="menu">
    <!--头像-->
    <div class="userBox">
      <el-avatar :size="50" :icon="UserFilled"/>
    </div>
  </div>
  <!-- nav栏-->
  <div class="dropdown">
    <button class="dropbtn">劲秋
      <span class="arrow">&#9652;</span>
    </button>
    <div class="dropdown-content">
      <a href="#">芳春</a>
      <a href="#">朱夏</a>
      <a href="#">清冬</a>
    </div>
  </div>

  <!--  歌单大图-->
  <div class="songListBox">
    <p>秋季限定🍁收获属于秋天的丰饶吧</p>
  </div>

</template>

<script setup lang="ts">
import {UserFilled} from '@element-plus/icons-vue'
import '@/style/backNav.css'

</script>

<style scoped>

</style>