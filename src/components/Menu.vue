<script setup lang="ts">
import {UserFilled, SwitchButton} from "@element-plus/icons-vue";
import '@/style/backNav.css'
import {reactive, toRefs} from "vue";
import router from "@/router";
import {useMusicStore} from "@/store/music";
import {useLoginStore} from "@/store/login";

const loginStore = useLoginStore()
const musicStore = useMusicStore()
const state = reactive({
  fits: ['fill'],
  url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
})
const {fits} = toRefs(state)
let sendSeasonName = defineProps(["seasonName"]) //当前界面的季节
let seasonList = reactive([
  {"seasonName": "芳春", "seasonPath": "/Spring"},
  {"seasonName": "朱夏", "seasonPath": "/Summer"},
  {"seasonName": "劲秋", "seasonPath": "/Autumn"},
  {"seasonName": "清冬", "seasonPath": "/Winter"},
]) //所有季节

/*function backToHome() {
  loginStore.loginOut()
  router.push({name: 'home'});
}*/

// 退出登录
const exit = async () => {

  /*const { data } = await loginOutApi();
  if(data.status===200){
    // 清除用户登录信息
    window.localStorage.removeItem("userStore");
    // 返回登录页
    window.location.href = "/";
  }*/
  await loginStore.loginOut()
  await router.push({name: 'home'});
}

//判断性别
function sex() {
  if (loginStore.user.gender == "1") {
    return "男"
  } else {
    return "女"
  }
}

let Sex = sex()

//获取其余季节
function getSeason() {
  let index = seasonList.findIndex((season) => season.seasonName === sendSeasonName.seasonName)
  if (index > -1)
    seasonList.splice(index, 1)
}

getSeason()
</script>

<template>
  <!--  导航栏-->
  <div class="menu">
    <!-- nav栏-->
    <div style="flex: 1;">
      <div class="dropdown">
        <button class="dropbtn">{{ sendSeasonName.seasonName }}
          <span class="arrow">&#9652;</span>
        </button>
        <div class="dropdown-content">
          <a v-for="season in seasonList" :href="season.seasonPath ">{{ season.seasonName }}</a>
        </div>
      </div>
    </div>

    <div class="imgAndsong">
      <!--专辑照片-->
      <div class="Img-fit">
        <div v-for="fit in fits" :key="fit" class="block">
          <el-avatar shape="square" :size="50" :fit="fit" :src="musicStore.musicInfo.musicPhoto"/>
        </div>
      </div>
      <!--    歌名-->
      <div class="songNameTop">
        <p>{{ musicStore.musicInfo.musicName }}</p>
      </div>
    </div>

    <div class="linkBox">
      <!--登录用户信息 start-->
      <el-popover
          :width="320"
      >
        <!--用户头像 start-->
        <template #reference>
          <el-link :underline="false">
            <!-- 用户没设置头像的情况下使用系统默认的 -->
            <el-avatar :src="loginStore.user.userAvatarUrl"
                       :icon="UserFilled"
                       alt="头像"
                       style="width: 50px;height:50px;border-radius: 50px;margin-left: 20px;"/>
            <span>{{ loginStore.user.userName }}</span>
          </el-link>
        </template>
        <!--用户头像 end-->

        <!--用户信息 start-->
        <template #default>
          <div style="display: flex; gap: 16px; flex-direction: column">
            <div class="info-card">
              <!-- 用户没设置头像的情况下使用系统默认的 -->
              <el-avatar :src="loginStore.user.userAvatarUrl"
                         :icon="UserFilled"
                         alt="头像"
                         style="width: 50px;height:50px;border-radius: 50px;"/>
              <p style="font-size: 23px">{{ loginStore.user.userName }}</p>
              <!--用户签名-->
              <p style="font-size: 17px">{{ loginStore.user.signature }}</p>
            </div>
            <div class="info-card-desc"
                 style="margin: 0">
              <!--性别-->
              <div style="float:left;width: 75px;padding:10px;border-right: 1px;text-align: center;">
                <p>性别</p>
                <p style="font-size: 25px;font-weight:600;">
                  {{ Sex }}
                  <span style="font-size: 10px;font-weight:100;margin-left:5px;">生</span>
                </p>
              </div>
              <!--注册多长时间-->
              <div
                  style="float:left;width: 75px;padding:10px;border-right: 1px;text-align: center;">
                <p>注册</p>
                <p style="font-size: 25px;font-weight:600;">
                  600
                  <span style="font-size: 10px;font-weight:100;margin-left:5px;">天</span>
                </p>
              </div>
              <!--听歌类型-->
              <div
                  style="float:left;width: 75px;padding:10px;text-align: center;">
                <p>听歌类型</p>
                <p style="font-size: 25px;font-weight:600;">
                  乡村
                </p>
              </div>
            </div>
          </div>
        </template>
        <!--用户信息 end-->
      </el-popover>
      <!--登录用户信息 end-->

      <!--退出系统 start-->
      <el-popconfirm confirm-button-text="确认" cancel-button-text="取消" :icon="SwitchButton" icon-color="#30bcd7"
                     title="确认退出系统吗？" @confirm="exit">
        <template #reference>
          <el-link :underline="false">
            <el-icon>
              <SwitchButton/>
            </el-icon>
            <span>退出</span>
          </el-link>
        </template>
      </el-popconfirm>
      <!--退出系统 end-->
    </div>
  </div>
</template>

<style scoped>
.linkBox {
  flex: 1;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: right;
}

.linkBox .el-link {
  margin-right: 25px;
  color: #8c8c8c;
}

.linkBox .el-link:hover {
  color: #30bcd7;
}

.linkBox .el-link span {
  margin-left: 8px;
}

/* 鼠标滑过头像的样式 */
.info-card img {
  width: 55px;
  margin: 0 15px 0 0;
  border-radius: 50px;
  float: left;
}

.info-card p {
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>