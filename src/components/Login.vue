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
            <el-input v-model="ruleForm.user" type="text" class="input-field"/>
          </el-form-item>
          <!--      密码-->
          <el-form-item prop="pass">
            <el-input v-model="ruleForm.pass" type="password" class="input-field"/>
          </el-form-item>
        </div>
        <!--      button-->
        <div class="button-container">
          <el-button class="button" @click="submitForm(ruleFormRef,userInput,passwordInput)">Login</el-button>
          <el-button class="button" @click="resetForm(ruleFormRef)">Reset</el-button>
        </div>
      </el-form>
    </div>
  </div>
  <!--      返回-->
  <el-button @click="backView()" class="back-but">Back</el-button>
</template>

<script setup lang="ts">
import {reactive, ref} from 'vue'
import type {FormInstance, FormRules} from 'element-plus'
import axios from 'axios'
import { useRouter } from 'vue-router';

const router = useRouter();
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  user: '',
  pass: '',
})

const userInput = ref<HTMLInputElement | null>(null)
const passwordInput = ref<HTMLInputElement | null>(null)

const rules = reactive<FormRules>({
  user: [
    {required: true, message: '请输入用户名', trigger: 'blur'},
  ],
  pass: [
    {required: true, message: '请输入密码', trigger: 'blur'},
  ],
})

const submitForm = async (formEl: FormInstance | undefined, userInput: HTMLInputElement | null, passwordInput: HTMLInputElement | null) => {
  if (!formEl || !userInput || !passwordInput) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      // 发送登录请求
      axios.post('/api/login', {
        username: userInput.value,
        password: passwordInput.value,
      })
          .then(response => {
            // 登录成功
            console.log('登录成功:', response.data)
          })
          .catch(error => {
            // 登录失败
            console.error('登录失败:', error)
          })
    } else {
      console.log('Error Submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const backView = () => {
  router.push({ name: 'home' });
};
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

.button {
  padding: 10px 26px;
  border-radius: 10px;
  font-size: 15px;
  color: white;
  background-color: transparent;
  border: white 2px solid;
  transition-duration: 1s;
}

.button:hover {
  background-color: #8fb291;
  color: white;
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