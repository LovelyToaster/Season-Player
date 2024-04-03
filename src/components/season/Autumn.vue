<template>
  <img class="back" src="../../assets/images/green09.JPG" alt="homeImg">
  <!--  导航栏-->
  <div class="menu">
    <!--头像-->
    <div class="userBox">
      <el-avatar :size="50" :icon="UserFilled"/>
    </div>
<<<<<<< HEAD
  </div>
  <!-- nav栏-->
  <div class="dropdown">
    <button class="dropbtn">劲秋
      <span class="arrow">&#9652;</span>
    </button>
    <div class="dropdown-content">
      <a href="#">芳春</a>
      <a href="#">朱夏</a>
      <a href="#">清冬</a>
    </div>
  </div>

  <!--  歌单大图-->
  <div class="songListBox">
    <p>秋季限定🍁收获属于秋天的丰饶吧</p>
  </div>

    <!-- nav栏-->
  </div>
</template>

<script setup lang="ts">
import {UserFilled} from '@element-plus/icons-vue'

import '@/style/backNav.css'

</script>

<style scoped>


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
>>>>>>> origin/style
</style>