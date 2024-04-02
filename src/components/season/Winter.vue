<template>
  <img class="back" src="../../assets/images/blue01.JPG" alt="homeImg">
  <div class="menu">
    <!--头像-->
    <div class="userBox">
      <el-avatar :size="50" :icon="UserFilled"/><!--可换url路径-->
    </div>
    <!-- nav栏-->
  </div>
</template>

<script setup lang="ts">
import {UserFilled} from "@element-plus/icons-vue";
import '@/style/backNav.css'
</script>

<style scoped>

</style>