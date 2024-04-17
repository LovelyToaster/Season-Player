<template>
  <!--飘落的花朵-->
  <div class="flower">
    <img v-for="i in 4" :key="i" src="../../assets/falling/winterXuehua1.png" alt="flower">
    <img v-for="i in 4" :key="i" src="../../assets/falling/winterXuehua2.png" alt="flower">
  </div>
  <!--  背景-->
  <img class="back" src="../../assets/images/blue01.JPG" alt="homeImg">

  <Menu seasonName="清冬"/>

  <MusicInfo season="冬天 冬日 冬 winter"/>

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
  color: #6fbcf0;
}
</style>