<template>
  <div class="context">
    <img class="back" src="../assets/images/green02.JPG" alt="homeImg">
    <p class="Text1">Season Player</p>
    <div>
      <p class="Text2">芳春 | 朱夏 | 劲秋 | 清冬</p>
      <div class="buttonBox">
        <button class="start" @click="start()">即刻开始</button>
        <button class="login" @click="login()">立刻登录</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useLoginStore} from "@/store/login";

const store = useLoginStore()
import {useRouter} from 'vue-router';
import {ElMessage} from "element-plus";

const router = useRouter();
const start = () => {
  router.push({name: 'choose'}); // 跳转到 ChooseView.vue
};

const login = () => {
  if (!store.isLogin)
    router.push({name: 'login'}); // 跳转到 Login.vue
  else
    ElMessage.success('已经登录过了！');
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.context {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100dvh
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

.Text1 {
  color: rgb(255, 255, 255);
  font-family: 思源黑体, sans-serif;
  font-size: 160px;
  text-align: left;
  opacity: 0;
  animation: slide-in-left 1s ease-in-out forwards;
  animation-delay: 0s;
}

.Text2 {
  margin-right: 5%;
  color: rgb(255, 255, 255);
  font-family: 思源黑体, sans-serif;
  font-size: 70px;
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

.buttonBox {
  margin-top: 5%;
  display: flex;
  flex-direction: row-reverse;
}

.start, .login {
  margin-right: 5%;
  width: 260px;
  height: 78px;
  font-size: 30px;
  color: white;
  border: 5px solid white;
  border-radius: 50px;
  background-color: transparent;
  opacity: 0;
  animation: fade-in 1s ease-in-out forwards;
  animation-delay: 1s;
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

button:hover {
  background-color: #8fb291;
  color: white;
  font-size: 2.2em;
}

button:active {
  font-size: 1.8em; /* 设置按钮文字变大 */
}

</style>