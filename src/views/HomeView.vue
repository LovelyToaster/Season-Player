<template>
  <img class="back" src="../assets/images/green02.JPG" alt="homeImg">
  <p class="Text1">Season Player</p>
  <p class="Text2">芳春 | 朱夏 | 劲秋 | 清冬</p>
  <button class="start" @click="start()">即刻开始</button>
  <button class="login" @click="login()">立刻登录</button>
  <div class="box">

  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
const start = () => {
  router.push({ name: 'choose' }); // 跳转到 ChooseView.vue
};

const login = () => {
  router.push({ name: 'login' }); // 跳转到 Login.vue
};
</script>

<style scoped>
.back {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: -1;
}

.Text1 {
  left: 40px;
  right: 540px;
  margin-top: 120px;
  position: absolute;
  width: 1340px;
  height: 300px;
  color: rgb(255, 255, 255);
  font-family: 思源黑体;
  font-size: 180px;
  font-weight: 400;
  line-height: 290px;
  letter-spacing: 0;
  text-align: left;
  opacity: 0;
  animation: slide-in-left 1s ease-in-out forwards;
  animation-delay: 0s;
}

.Text2 {
  left: 850px;
  top: 550px;
  position: absolute;
  width: 920px;
  height: 130px;
  color: rgb(255, 255, 255);
  font-family: 思源黑体;
  font-size: 70px;
  font-weight: 400;
  line-height: 130px;
  letter-spacing: 0;
  text-align: right;
  opacity: 0;
  animation: slide-in-right 1s ease-in-out forwards;
  animation-delay: 0s;
}

@keyframes slide-in-left {
  0% {
    opacity: 0;
    transform: translateX(-50px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slide-in-right {
  0% {
    opacity: 0;
    transform: translateX(50px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.start, .login {
  top: 820px;
  position: absolute;
  width: 240px;
  height: 78px;
  font-size: 30px;
  color: white;
  border: 5px solid white;
  border-radius: 50px;
  background-color: transparent;
  opacity: 0;
  animation: fade-in 1s ease-in-out forwards;
  animation-delay: 1s;
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

.start {
  left: 1100px;
}

.login {
  left: 1480px;
}

button:hover {
  background-color: #8fb291;
  color: white;
}
button:active {
  font-size: 2.2em; /* 设置按钮文字变大 */
}

</style>