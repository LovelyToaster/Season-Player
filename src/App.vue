<script setup>
import {ref} from "vue";
import axios from "axios";

axios.defaults.withCredentials = true

let musicSrc = ref()
let musicName = ref("暂无歌曲")
let cookie = ref()
let loginStatus = ref()

function getRandom() {
  return Math.floor(Math.random() * 10 + 1)
}

async function getLoginStatus() {
  loginStatus = await axios.get("http://192.168.31.3:4000/user/account", {
    params: {
      cookie: cookie.value
    }
  })
  console.log(loginStatus.data)
}

async function login() {
  if (cookie.value === null || cookie.value === undefined) {
    let loginInfo = await axios.get("http://192.168.31.3:4000/register/anonimous")
    // console.log(loginInfo.data.cookie)
    cookie.value = encodeURIComponent(loginInfo.data.cookie)
    alert("登录成功")
  } else {
    alert("禁止重复登录")
  }
}

async function getMusicSongList(season) {
  // console.log(musicSongList.data.result.playlists[0].id)
  // console.log(musicSongList.data.result.playlists[0].name)
  return await axios.get("http://192.168.31.3:4000/search", {
    params: {
      keywords: season,
      type: 1000,
      limit: getRandom(),
      offset: getRandom(),
      cookie: cookie.value
    }
  })
}

async function getMusicSong(musicSongList) {
  // console.log(musicSong.data.songs[0].id)
  // console.log(musicSong.data.songs[0].name)
  return await axios.get("http://192.168.31.3:4000/playlist/track/all", {
    params: {
      id: musicSongList.data.result.playlists[0].id,
      limit: 1,
      offset: getRandom(),
    }
  })
}

async function checkMusic(musicSong) {
  // console.log(musicCheck.data.success)
  return await axios.get("http://192.168.31.3:4000/check/music", {
    params: {
      id: musicSong.data.songs[0].id,
    },
  })
}

async function getMusicSrc(season) {
  if (cookie.value === null || cookie.value === undefined) {
    alert("需要登录！")
  } else {
    let musicSongList = await getMusicSongList(season)
    let musicSong = await getMusicSong(musicSongList)
    let musicCheck = await checkMusic(musicSong)
    if (musicCheck.data.success === true) {
      let music = await axios.get("http://192.168.31.3:4000/song/url/v1", {
            params: {
              id: musicSong.data.songs[0].id,
              level: "standard"
            },
          }
      )
      if (music.data.data[0].time / 1000 < 60) {
        await getMusicSrc(season)
      } else {
        musicName.value = musicSong.data.songs[0].name
        musicSrc.value = music.data.data[0].url
      }
    } else {
      await getMusicSrc(season)
    }
  }
}

</script>

<template>
  <button @click="login">登录</button>
  <button @click="getLoginStatus">获取登陆状态</button>
  <button @click="getMusicSrc('春天 春日')">春天</button>
  <button @click="getMusicSrc('夏天 夏日')">夏天</button>
  <button @click="getMusicSrc('秋天 秋日')">秋天</button>
  <button @click="getMusicSrc('冬天 冬日')">冬天</button>
  <h2>{{ musicName }}</h2>
  <audio :src="musicSrc" controls autoplay></audio>
</template>

<style scoped>

</style>
