<script setup>
import {reactive, ref} from "vue";
import axios from "axios";
import Cookies from "js-cookie";

axios.defaults.baseURL = "http://localhost:3000"

let musicInfo = reactive({
  musicName: "暂无歌曲",
  musicSrc: null,
  musicTime: null,
  musicCheck: null
})
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

async function getMusicSrc(season) {
  if (isLogin.value === false) {
    alert("需要登录！")
  } else {
    let music = await axios.get("/get/info", {
      params: {
        keywords: season,
        type: 1000,
        limit: getRandom(),
        offset: getRandom(),
        cookie: getCookie()
      }
    })
    console.log(music.data.data)
    if (music.data.data.musicCheck === true) {
      if (music.data.data.musicTime / 1000 < 60) {
        await getMusicSrc(season)
      } else {
        musicInfo.musicName = music.data.data.musicName
        musicInfo.musicSrc = music.data.data.musicSrc
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
  <h2>{{ musicInfo.musicName }}</h2>
  <audio :src="musicInfo.musicSrc" controls autoplay></audio>
</template>

<style scoped>

</style>
