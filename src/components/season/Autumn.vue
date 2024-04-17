<template>
  <!--飘落的花朵-->
  <div class="flower">
    <img v-for="i in 2" :key="i" src="@/assets/falling/autumnFengye1.png" alt="flower">
    <img v-for="i in 2" :key="i" src="@/assets/falling/autumnFengye2.png" alt="flower">
    <img v-for="i in 2" :key="i" src="@/assets/falling/autumnFengye3.png" alt="flower">
    <img v-for="i in 2" :key="i" src="@/assets/falling/autumnFengye4.png" alt="flower">
  </div>
  <img class="back" src="../../assets/images/gland01.JPG" alt="homeImg">

  <Menu seasonName="劲秋"/>

  <MusicInfo season="秋天 秋 autumn"/>

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
  color: #f5ae13;
}
</style>