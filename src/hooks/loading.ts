import {ElLoading, ElNotification} from "element-plus";
import {watch} from "vue";
import {useMusicStore} from "@/store/music";

let time = 0


function Interval() {
    const musicStore = useMusicStore()
    const stopInterval = setInterval(() => {
        time++
        if (musicStore.musicReady) {
            time = 0
            clearInterval(stopInterval)
        }
        if (time >= 3) {
            if (!musicStore.musicReady) {
                ElNotification({
                    message: '加载失败，请尝试刷新！',
                    type: 'error',
                })
            }
            time = 0
            clearInterval(stopInterval)
        }
    }, 1000)
}

export function musicLoading() {
    const musicStore = useMusicStore()
    const elLoadingOptions = {
        lock: true,
        text: "加载中，请稍后"
    }
    Interval()
    let loading = ElLoading.service(elLoadingOptions)

    watch(() => musicStore.musicReady, () => {
        //重新加载
        if (!musicStore.musicReady) {
            loading = ElLoading.service(elLoadingOptions)
            Interval()
        }
        //加载完成，关闭加载界面
        if (musicStore.musicReady) {
            loading.close()
        }
    })
}