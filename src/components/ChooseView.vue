<template>
  <img class="back" src="../assets/images/green04.JPG" alt="homeImg">
  <!--    logo-->
  <div class="imgBox">
    <img src="../assets/logo/logo.png" alt="logo">
  </div>
  <!--  Text-->
  <div class="Text">
    <p>Choose Your Love</p>
  </div>

  <div class="buttonBox">
    <button @click="spring()" class="spring">芳春</button>
    <button @click="summer()" class="summer">朱夏</button>
    <button @click="autumn()" class="autumn">劲秋</button>
    <button @click="winter()" class="winter">清冬</button>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";

const router = useRouter()

const spring = () => {
  router.push({name: 'spring'})
}
const summer = () => {
  router.push({name: 'summer'})
}
const autumn = () => {
  router.push({name: 'autumn'})
}
const winter = () => {
  router.push({name: 'winter'})
}
</script>

<style scoped>
.spring, .summer, .autumn, .winter {
  top: 65%;
  position: absolute;
  width: 220px;
  height: 75px;
  font-size: 30px;
  color: white;
  border: 3px solid white;
  border-radius: 50px;
  background-color: transparent;
  opacity: 0;
  animation: fade-in 1s ease-in-out forwards;
  animation-delay: 0.5s;
  transition: font-size 0.3s;
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

.spring {
  left: 10%; /* 设置百分比位置 */
}

.summer {
  left: 30%; /* 设置百分比位置 */
}

.autumn {
  left: 50%; /* 设置百分比位置 */
}

.winter {
  left: 70%; /* 设置百分比位置 */
}

.spring:hover {
  background-color: #63b768;
  font-size: 2.2em;
}

.summer:hover {
  background-color: #ec6d72;
  font-size: 2.2em;
}

.autumn:hover {
  background-color: #f8bd5f;
  font-size: 2.2em;
}

.winter:hover {
  background-color: #98e8e4;
  font-size: 2.2em;
}

.Text {
  display: flex;
  justify-content: center;
  margin-top: 60px;
  position: absolute;
  width: 100%; /* 使用百分比宽度 */
  height: 300px;
  color: rgba(255, 255, 255, 0.9);
  font-family: 思源黑体;
  font-size: 140px;
  animation: slide-in-up 1s ease-in-out forwards;
  animation-delay: 0s;
}

/* 定义媒体查询 */
@media (max-width: 1200px) {
  .Text {
    font-size: 100px; /* 在屏幕宽度小于 1200px 时设置较小的字体大小 */
  }
}

@keyframes slide-in-up {
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.back {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: -1;
}

.imgBox {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.imgBox img {
  max-width: 200px; /* 调整图片的最大宽度 */
  max-height: 200px; /* 调整图片的最大高度 */
}
</style>