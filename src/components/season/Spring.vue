<template>
  <!--飘落的花朵-->
  <div class="flower">
    <img v-for="i in 4" :key="i" src="../../assets/falling/springTaohua1.png" alt="flower">
    <img v-for="i in 4" :key="i" src="../../assets/falling/springTaohua2.png" alt="flower">
  </div>
  <!--  背景-->
  <img class="back" src="../../assets/images/green08.JPG" alt="homeImg">

  <Menu seasonName="芳春"/>

  <MusicInfo season="春天 春 春日 spring"/>

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
  color: #86a360;
}
</style>