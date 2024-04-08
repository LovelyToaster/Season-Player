import {defineStore} from 'pinia'
import {reactive, ref} from "vue";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000"

export const useMusicStore = defineStore("music", () => {
    let musicInfo = reactive({
        musicId: null,
        musicName: "暂无歌曲",
        musicPhoto: null,
        musicSrc: null,
        musicCheck: null,
    })
    let musicListName = ref("暂无歌单")

    function getMusicList() {

    }

    return {
        musicInfo,
        musicListName
    }
})