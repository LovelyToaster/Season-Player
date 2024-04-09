import {ElLoading, ElNotification} from "element-plus";
import {ref, watch} from "vue";
import {useMusicStore} from "@/store/music";

export function musicLoading() {
    let time = ref(0)
    const musicStore = useMusicStore()
    const elLoadingOptions = {
        lock: true,
        text: "加载中，请稍后"
    }
    let loading = ElLoading.service(elLoadingOptions)

    watch(() => [musicStore.musicReady, time.value], () => {
        //重新加载
        if (!musicStore.musicReady) {
            loading = ElLoading.service(elLoadingOptions)
        }
        //加载完成，关闭加载界面
        if (musicStore.musicReady) {
            loading.close()
            if (time.value >= 5) {
                if (!musicStore.musicReady) {
                    ElNotification({
                        message: '加载失败，请尝试刷新！',
                        type: 'error',
                    })
                }
                clearInterval(stopInterval)
            }
        }
    })

    const stopInterval = setInterval(() => {
        time.value++
    }, 1000)
}