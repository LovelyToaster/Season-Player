<template>
  <img class="back" src="../assets/images/green02.JPG" alt="homeImg">
  <div class="loginBox">
    <!--    logo-->
    <div class="imgBox">
      <img src="../assets/logo/logo.png" alt="logo">
    </div>
    <div class="login-container">
      <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
      >
        <div class="text-container">
          <!--      账号-->
          <el-form-item prop="user">
            <el-input v-model="ruleForm.user" type="text" class="input-field" placeholder="请输入手机账号"/>
          </el-form-item>
          <!--      密码-->
          <el-form-item prop="pass">
            <el-input v-model="ruleForm.pass" type="password" class="input-field" placeholder="请输入验证码"/>
          </el-form-item>
        </div>
        <!--      button-->
        <div class="button-container">
          <el-button class="button1" @click="submitForm">登录</el-button>
          <el-button class="button2" @click="sendCaptcha" :disabled="sendCaptchaButtonDisable">{{
              sendCaptchaButtonInfo
            }}
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
  <!--      返回-->
  <el-button @click="backView()" class="back-but"><- Back</el-button>
</template>

<script setup lang="ts">
import {ref, watch} from 'vue'
import {ElForm, ElFormItem, ElInput, ElButton, ElNotification, ElLoading} from 'element-plus';
import axios from 'axios'
import {useRouter} from 'vue-router';
import {useLoginStore} from "@/store/login";

axios.defaults.baseURL = "http://localhost:3000"

const loginStore = useLoginStore()
const router = useRouter();
const ruleForm = ref({
  user: '',
  pass: '',
})

const rules = {
  user: [{required: true, message: '请输入手机号码', trigger: 'blur'},
    {pattern: /^1[3-9]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur'}
  ],
  pass: [{required: true, message: '请输入验证码', trigger: 'blur'}
  ]
};

const ruleFormRef = ref<any>(null);
const validPhoneNumber = ref(false);
let sendCaptchaButtonInfo = ref("请输入验证码")
let sendCaptchaButtonDisable = ref(false)
const elLoadingOptions = {
  lock: true,
  text: "登录中"
}

const submitForm = () => {
  ruleFormRef.value?.validate((valid: boolean) => {
        if (valid) {      // 执行登录逻辑，此处可调用后端接口进行验证等操作
          // 跳转到选择页面
          // this.$router.push('/choose');
          let loading = ElLoading.service(elLoadingOptions)
          loginStore.userLogin.phone = ruleForm.value.user
          loginStore.userLogin.captcha = ruleForm.value.pass
          loginStore.loginCaptcha()
          const stopWatch = watch(() => [loginStore.isLogin, loginStore.isError], () => {
            if (loginStore.isLogin) {
              loading.close()
              ElNotification({
                message: '登录成功',
                type: 'success',
              })
              router.push({name: 'choose'});
              stopWatch()
            }
            if (loginStore.isError) {
              loading.close()
              ElNotification({
                message: loginStore.message,
                type: 'error',
              })
              loginStore.isError = false
              stopWatch()
            }
          })
        } else {
          return false;
        }
      }
  );
};

const backView = () => {
  router.push({name: 'home'});
};

function sendCaptcha() {
  if (ruleForm.value.user.match(/^1\d{10}$/)) {
    sendCaptchaButtonDisable.value = !sendCaptchaButtonDisable.value
    let time = 60
    sendCaptchaButtonInfo.value = "60"
    const stopInterval = setInterval(() => {
      time--
      sendCaptchaButtonInfo.value = time.toString()
      if (time <= 0) {
        clearInterval(stopInterval)
        sendCaptchaButtonInfo.value = "请输入验证码"
        sendCaptchaButtonDisable.value = !sendCaptchaButtonDisable.value
      }
    }, 1000)
    ElNotification({
      message: '验证码已发送，请注意查收',
      type: 'success',
    })
    loginStore.userLogin.phone = ruleForm.value.user
    loginStore.sentCaptcha()
  } else {
    ElNotification({
      message: '请输入正确的手机号',
      type: 'error',
    })
  }
}
</script>

<style scoped>
.back-but {
  display: flex;
  justify-content: left;
  margin-top: 20px;
  margin-left: 30px;
  color: white;
  background-color: transparent;
  transition-duration: 1s;
  border: 0;
  opacity: 0;
  animation: slide-up 1s ease-in-out forwards;
  animation-delay: 0.5s; /* 调整延迟时间以控制动画开始时间 */
  transition: font-size 0.3s; /* 添加过渡效果 */
}

.back-but:hover {
  font-size: 1.2em; /* 设置按钮文字悬停时变大 */
}

.back-but:hover {
  background-color: #8fb291;
  color: white;
}

.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 60px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.text-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.input-field {
  border: 0;
  width: 270px;
  height: 55px;
  padding: 8px;
  text-align: left;
  border-radius: 10px;
}

.button-container {
  display: flex;
  justify-content: center;
  text-align: center;
  gap: 30px;
  margin-top: 30px;
}

.button1, .button2 {
  top: 80%;
  position: absolute;
  width: 100px;
  height: 40px;
  font-size: 15px;
  color: white;
  background-color: transparent;
  border: white 2px solid;
  border-radius: 30px;
  transition-duration: 0.1s;
  transition: font-size 0.3s; /* 添加过渡效果 */
}

.button1 {
  left: 16%;
}

.button2 {
  left: 60%;
}

.button1:hover, .button2:hover {
  background-color: #8fb291;
  color: white;
  font-size: 1.1em;
}

.button1:active, .button2:active {
  font-size: 0.9em;
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

.back {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: -1;
}

.loginBox {
  left: 50%;
  top: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 400px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  opacity: 0;
  animation: slide-up 1s ease-in-out forwards;
  animation-delay: 0.5s; /* 调整延迟时间以控制动画开始时间 */
}

@keyframes slide-up {
  0% {
    opacity: 0;
    transform: translate(-50%, -30%);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}
</style>