<template>
  <img class="back" src="../../assets/images/green09.JPG" alt="homeImg">
  <!--  导航栏-->
  <div class="menu">
    <!--头像-->
    <div class="userBox">
      <el-avatar :size="50" :icon="UserFilled"/>
    </div>
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

  </div>

</template>

<script setup lang="ts">
import {UserFilled} from '@element-plus/icons-vue'
import '@/style/backNav.css'

</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
  margin-top: 0;
  margin-left: 2%;
  height: 40px;
  border: 3px #ffffff solid;
  border-radius: 20px;
  transition: padding 0.3s ease; /* 添加过渡效果 */
  padding: 0 10px; /* 初始左右内边距 */
}

.dropdown:hover {
  padding: 0 20px; /* 点击时的左右内边距 */
}

.dropbtn {
  background-color: transparent;
  color: black;
  padding: 10px 16px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 18px;
  letter-spacing: 5px;
  font-weight: bold;
}

.arrow {
  margin-left: 5px;
  transition: transform 0.3s ease;
}

.dropdown:hover .arrow {
  transform: rotate(180deg);
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: transparent;
  min-width: 105px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  z-index: 1;
  left: 0;
  top: 100%;
  border-radius: 15px;
  animation: dropdownAnimation 0.3s ease-out; /* 添加动画属性 */
  animation-fill-mode: forwards; /* 保持动画最后一帧状态 */
}

.dropdown-content a {
  color: white;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  font-size: 18px;
  letter-spacing: 5px;
  font-weight: bold;
}

.dropdown-content a:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.dropdown:hover .dropdown-content {
  display: block;
}

@keyframes dropdownAnimation {
  0% {
    transform: translateY(-20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>