<template>
  <!--  歌曲列表框-->
  <div class="songList">
    <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
      <li v-for="music in musicStore.musicList" class="infinite-list-item">{{ music.musicName }}</li>
    </ul>
  </div>
  <!--  change歌单-->
  <div class="changeList">
    <button @click="changeList">changeSongList</button>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useMusicStore} from "@/store/music";

const musicStore = useMusicStore()
const count = ref(0)
const load = () => {
  count.value += 2
}

function changeList() {
  //改变歌单列表
}
</script>

<style scoped>
.songList {
  position: absolute;
  top: 40%;
  left: 5px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  width: 150px;
  height: 200px;
  animation: fade-in 1s ease-in-out forwards;
  animation-delay: 0s;
}

.changeList {
  position: absolute;
  top: 61.5%;
  left: 5px;
  border-radius: 10px;
  width: 150px;
  height: 30px;
}

.changeList button {
  width: 150px;
  height: 30px;
  font-size: 15px;
  color: white;
  border: 2px solid white;
  border-radius: 50px;
  background-color: transparent;
  opacity: 0;
  animation: fade-in 1s ease-in-out forwards;
  animation-delay: 0s;
}

@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

button:hover {
  background-color: #8fb291;
  color: white;
  font-size: 1.1em; /* 设置按钮文字变大 */
}

button:active {
  font-size: 0.8em;
}

.songList .infinite-list {
  height: 190px;
  padding: 0;
  margin: 5px;
  list-style: none;
  border-radius: 10px;
  animation: fade-in 1s ease-in-out forwards;
  animation-delay: 0s;
}

.songList .infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;
  background: var(--el-color-primary-light-9);
  margin: 1px;
  color: var(--el-color-primary);
}

.songList .infinite-list .infinite-list-item + .list-item {
  margin-top: 2px;
}
</style>