<script setup>
import {ref} from "vue";
import axios from "axios";
import Cookies from "js-cookie";

axios.defaults.baseURL = "http://localhost:3000"

let musicSrc = ref()
let musicName = ref("暂无歌曲")
let loginStatus = ref()
let phone = defineModel("phone")
let captcha = defineModel("captcha")
let isLogin = ref(false)
let userName = ref("未登录")
let userAvatarUrl = ref()

function getCookie() {
  return {
    MUSIC_U: Cookies.get("MUSIC_U"),
    __csrf: Cookies.get("__csrf"),
    __remember_me: Cookies.get("__remember_me"),
  }
}

function getRandom() {
  return Math.floor(Math.random() * 10 + 1)
}

async function getLoginStatus() {
  loginStatus = await axios.get("/login/status", {
        params: {
          cookie: getCookie()
        }
      }
  )
  isLogin.value = loginStatus.data.data.code === 200;
  if (isLogin.value === true) {
    userName.value = loginStatus.data.data.profile.nickname
    userAvatarUrl.value = loginStatus.data.data.profile.avatarUrl
  }
}

async function loginOut() {
  await axios.get("/logout")
}

async function loginCaptcha() {
  //验证码登录
  let login = await axios.get("/login/cellphone", {
    params: {
      phone: phone.value,
      captcha: captcha.value
    }
  })
  // cookie分割
  let cookies = login.data.cookie.split(";")
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].split("=");
    if (cookie[0] === "MUSIC_U" || cookie[0] === "__csrf" || cookie[0] === "__remember_me")
      Cookies.set(cookie[0], cookie[1], {expires: 7})
  }
}

async function sentCaptcha() {
  await axios.get("/captcha/sent", {
    params: {
      phone: phone.value
    }
  })
}

async function getMusicSongList(season) {
  return await axios.get("/search", {
    params: {
      keywords: season,
      type: 1000,
      limit: getRandom(),
      offset: getRandom(),
      cookie: getCookie()
    }
  })
}

async function getMusicSong(musicSongList) {
  return await axios.get("/playlist/track/all", {
    params: {
      id: musicSongList.data.result.playlists[0].id,
      limit: 1,
      offset: getRandom(),
      cookie: getCookie()
    }
  })
}

async function checkMusic(musicSong) {
  return await axios.get("/check/music", {
    params: {
      id: musicSong.data.songs[0].id,
      cookie: getCookie()
    },
  })
}

async function getMusicSrc(season) {
  if (isLogin.value === false) {
    alert("需要登录！")
  } else {
    let musicSongList = await getMusicSongList(season)
    let musicSong = await getMusicSong(musicSongList)
    let musicCheck = await checkMusic(musicSong)
    if (musicCheck.data.success === true) {
      let music = await axios.get("/song/url/v1", {
            params: {
              id: musicSong.data.songs[0].id,
              level: "standard",
              cookie: getCookie()
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

getLoginStatus()
</script>

<template>
  <div v-show="!isLogin">
    <input type="text" v-model="phone">
    <br>
    <input type="text" v-model="captcha">
    <br>
    <button @click="sentCaptcha">获取验证码</button>
    <button @click="loginCaptcha">登录</button>
    <br>
  </div>
  <h2 v-show="isLogin">{{ userName }}</h2>
  <img :src="userAvatarUrl" alt="头像" v-show="isLogin" height="100px">
  <button @click="getLoginStatus">获取登陆状态</button>
  <button @click="loginOut">退出登录</button>
  <button @click="getMusicSrc('春天 春日')">春天</button>
  <button @click="getMusicSrc('夏天 夏日')">夏天</button>
  <button @click="getMusicSrc('秋天 秋日')">秋天</button>
  <button @click="getMusicSrc('冬天 冬日')">冬天</button>
  <h2>{{ musicName }}</h2>
  <audio :src="musicSrc" controls autoplay></audio>
</template>

<style scoped>

</style>
