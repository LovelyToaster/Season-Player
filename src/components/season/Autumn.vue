<template>
  <img class="back" src="../../assets/images/green09.JPG" alt="homeImg">
  <!--  导航栏-->
  <div class="menu">
    <!--头像-->
    <div class="userBox">
      <el-avatar :size="50" :icon="UserFilled"/>
    </div>
    <!-- nav栏-->
  </div>
</template>

<script setup lang="ts">
import {UserFilled} from '@element-plus/icons-vue'
</script>

<style scoped>
.menu .userBox {
  justify-content: space-between; /* 元素之间水平间距相等 */
  padding: 0 30px; /* 左右边距10px */
  margin-left: auto; /* 将头像向右推动 */
}

.menu {
  background-color: rgba(255, 255, 255, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  border-radius: 20px;
  display: flex; /* 使用 Flexbox 布局 */
  align-items: center; /* 垂直居中对齐 */
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
</style>