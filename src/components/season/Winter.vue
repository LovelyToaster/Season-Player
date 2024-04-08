<template>
  <img class="back" src="../../assets/images/blue01.JPG" alt="homeImg">
  <!--  导航栏-->
  <div class="menu">
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

    <!--头像-->
    <div class="userBox">
      <el-avatar :size="50" :icon="UserFilled" :src="store.user.userAvatarUrl"/>
    </div>

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

  <!--  歌单大图-->
  <div class="songListBox">
    <p class="songSum">{{ song.songSum }}</p>
    <p class="songName">{{ song.songName }}</p>
    <p class="songWord">{{ song.songWord }}</p>
  </div>

  <SongList/>
  <Player/>
</template>

<script setup lang="ts">
import {UserFilled} from "@element-plus/icons-vue";
import '@/style/backNav.css'
import {ref} from "vue";
import {reactive, toRefs} from "vue";
import Player from "@/components/Player.vue";
import SongList from "@/components/songList.vue";
import {useLoginStore} from "@/store/login";

const store = useLoginStore()
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
</script>

<style scoped>
.songNameTop p {
  color: #6fbcf0;
}
</style>