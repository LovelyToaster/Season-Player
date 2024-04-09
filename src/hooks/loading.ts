import {ElLoading} from "element-plus";
import {watch} from "vue";
import {useMusicStore} from "@/store/music";

export function musicLoading() {
    const musicStore = useMusicStore()
    const elLoadingOptions = {
        lock: true,
        text: "加载中，请稍后"
    }
    let loading = ElLoading.service(elLoadingOptions)

    watch(() => musicStore.musicReady, () => {
        //重新加载
        if (!musicStore.musicReady) {
            loading = ElLoading.service(elLoadingOptions)
        }
        //加载完成，关闭加载界面
        if (musicStore.musicReady)
            loading.close()

    })
}
