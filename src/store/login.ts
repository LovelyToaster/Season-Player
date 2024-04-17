import {defineStore} from "pinia";
import {reactive, ref} from "vue";
import axios from "axios";
import Cookies from "js-cookie";

// const apiInstance = axios.create({
//     baseURL: 'http://192.168.31.3:4000/api'
// });
const apiInstance = axios.create({
    baseURL: 'https://season-player.lovelytoaster94.top/api'
});

export const useLoginStore = defineStore("login", () => {
    let user = reactive({
        userName: "未登录",
        userAvatarUrl: ""
    })
    // 判断是否登录，初始值为false
    let isLogin = ref(false)
    let userLogin = reactive({
        phone: "",
        captcha: ""
    })
    let reload = ref(false)
    let message = ref()

    function getCookie() {
        return {
            MUSIC_U: Cookies.get("MUSIC_U"),
            __csrf: Cookies.get("__csrf"),
            __remember_me: Cookies.get("__remember_me"),
        }
    }

    async function getLoginStatus() {
        if (getCookie().MUSIC_U != undefined) {
            let loginStatus = await apiInstance.get("/login/status", {
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
    }

    async function loginOut() {
        console.log("退出登录")
        await apiInstance.get("/logout", {
            params: {
                cookie: getCookie()
            }
        })
        Cookies.remove("MUSIC_U")
        Cookies.remove("__csrf")
        Cookies.remove("__remember_me")
        location.reload();
    }

    async function loginCaptcha() {
        let count = 0
        console.log("登录中")
        let login
        //验证码登录
        while (!isLogin.value && count <= 10) {
            count++
            login = await apiInstance.get("/login/cellphone", {
                params: {
                    phone: userLogin.phone,
                    captcha: userLogin.captcha
                }
            })
            if (login.data.cookie != undefined) {
                // cookie分割
                let cookies = login.data.cookie.split(";")
                for (let i = 0; i < cookies.length; i++) {
                    let cookie = cookies[i].split("=");
                    if (cookie[0] === "MUSIC_U" || cookie[0] === "__csrf" || cookie[0] === "__remember_me")
                        Cookies.set(cookie[0], cookie[1], {expires: 7})
                }
            }
            console.log(login.data)
            console.log(login.data.code)
            await getLoginStatus()
            if (login.data.code != -460 && login.data.code != 200) {
                message.value = login.data.message
                break
            }
        }
    }

    async function sentCaptcha() {
        await apiInstance.get("/captcha/sent", {
            params: {
                phone: userLogin.phone
            }
        })
    }

    return {
        user,
        isLogin,
        userLogin,
        reload,
        message,
        getLoginStatus,
        loginCaptcha,
        sentCaptcha,
        getCookie,
        loginOut
    }

})