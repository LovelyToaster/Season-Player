<template>
  <!--飘落的花朵-->
  <div class="flower">
    <img v-for="i in 2" :key="i" src="@/assets/falling/summerXiaohuanghua1.png" alt="flower">
    <img v-for="i in 2" :key="i" src="@/assets/falling/summerXiaohuanghua2.png" alt="flower">
    <img v-for="i in 2" :key="i" src="@/assets/falling/summerXiaohuanghua3.png" alt="flower">
    <img v-for="i in 2" :key="i" src="@/assets/falling/summerXiaohuanghua4.png" alt="flower">
  </div>
  <!--  背景-->
  <img class="back" src="../../assets/images/green09.JPG" alt="homeImg">

  <Menu seasonName="朱夏"/>

  <MusicInfo season="夏天 夏日 夏 summer"/>

  <Player/>
</template>

<script setup lang="ts">
import '@/style/backNav.css'
import '@/style/falling.css'
import Player from "@/components/Player.vue";
import Menu from "@/components/Menu.vue";
import MusicInfo from "@/components/MusicInfo.vue";

</script>

<style scoped>
.songNameTop p {
  color: #cfa88e;
}
</style>