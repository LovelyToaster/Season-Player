import {ElLoading, ElNotification} from "element-plus";
import {watch} from "vue";
import {useMusicStore} from "@/store/music";

export function musicLoading() {
    const musicStore = useMusicStore()
    const elLoadingOptions = {
        lock: true,
        text: "加载中，请稍后"
    }
    let loading = ElLoading.service(elLoadingOptions)
    let time = 0

    watch(() => [musicStore.musicReady, musicStore.isError], () => {
        //重新加载
        if (!musicStore.musicReady) {
            loading = ElLoading.service(elLoadingOptions)
        }
        //加载完成，关闭加载界面
        if (musicStore.musicReady) {
            time = 0
            loading.close()
        }
        if (musicStore.isError && time === 0) {
            ElNotification({
                message: '加载失败，请尝试刷新！',
                type: 'error',
            })
            musicStore.isError = false
            time = 1
        }
    })
}