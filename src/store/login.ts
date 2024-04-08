import {defineStore} from "pinia";
import {reactive, ref} from "vue";
import axios from "axios";
import Cookies from "js-cookie";

axios.defaults.baseURL = "http://localhost:3000"

export const useLoginStore = defineStore("login", () => {
    let user = reactive({
        userName: "未登录",
        userAvatarUrl: null
    })
    let isLogin = ref(false)
    let userLogin = reactive({
        phone: null,
        captcha: null
    })

    function getCookie() {
        return {
            MUSIC_U: Cookies.get("MUSIC_U"),
            __csrf: Cookies.get("__csrf"),
            __remember_me: Cookies.get("__remember_me"),
        }
    }

    async function getLoginStatus() {
        let loginStatus = await axios.get("/login/status", {
                params: {
                    cookie: getCookie()
                }
            }
        )
        isLogin.value = loginStatus.data.data.code === 200 && !loginStatus.data.data.account.anonimousUser;
        if (isLogin.value === true) {
            user.userName = loginStatus.data.data.profile.nickname
            user.userAvatarUrl = loginStatus.data.data.profile.avatarUrl
        }
    }

    async function loginOut() {
        await axios.get("/logout")
    }

    async function loginCaptcha() {
        console.log("登录中")
        //验证码登录
        let login = await axios.get("/login/cellphone", {
            params: {
                phone: userLogin.phone,
                captcha: userLogin.captcha
            }
        })
        console.log(login.data)
        // cookie分割
        let cookies = login.data.cookie.split(";")
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].split("=");
            if (cookie[0] === "MUSIC_U" || cookie[0] === "__csrf" || cookie[0] === "__remember_me")
                Cookies.set(cookie[0], cookie[1], {expires: 7})
        }
    }

    async function sentCaptcha() {
        console.log("发送成功！", userLogin.phone)
        await axios.get("/captcha/sent", {
            params: {
                phone: userLogin.phone
            }
        })
    }

    return {
        user,
        isLogin,
        userLogin,
        getLoginStatus,
        loginCaptcha,
        sentCaptcha,
        getCookie
    }

})