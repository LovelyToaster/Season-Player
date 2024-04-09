import {defineStore} from 'pinia'
import {reactive, ref} from "vue";
import axios from "axios";
import {useLoginStore} from "@/store/login";

const apiInstance = axios.create({
    baseURL: 'http://192.168.31.3:4000/api'
});

export const useMusicStore = defineStore("music", () => {
    const loginStore = useLoginStore()
    let musicInfo = reactive({
        musicId: "",
        musicName: "暂无歌曲",
        musicPhoto: "",
        musicSrc: "",
    })
    let musicListName = ref("暂无歌单")
    let musicList = ref([{
        musicId: "",
        musicName: "",
        musicPhoto: "",
    }])
    let lyricList: any = ref([])
    let currentRow = ref(0)
    let currentMusic = ref(0)
    let currentSeason = ref()
    let musicReady = ref(false)

    function getRandom() {
        return Math.floor(Math.random() * 20 + 1)
    }

    async function getMusicList(season: string) {
        let musicListTemp = await apiInstance.get("/get/info", {
            params: {
                keywords: season,
                type: 1000,
                limit: getRandom(),
                offset: getRandom(),
                cookie: loginStore.getCookie()
            }
        })
        musicListName.value = musicListTemp.data.data.musicListName
        musicInfo.musicId = musicListTemp.data.data.musicInfoList[0].musicId
        musicInfo.musicName = musicListTemp.data.data.musicInfoList[0].musicName
        musicInfo.musicPhoto = musicListTemp.data.data.musicInfoList[0].musicPhoto
        musicList.value = musicListTemp.data.data.musicInfoList
    }

    async function getMusicSrc() {
        let musicCheck = await apiInstance.get("/check/music", {
            params: {
                id: musicList.value[currentMusic.value].musicId,
                cookie: loginStore.getCookie()
            }
        })
        let musicSrcTemp = await apiInstance.get("/song/url/v1", {
            params: {
                id: musicList.value[currentMusic.value].musicId,
                cookie: loginStore.getCookie()
            }
        })
        musicInfo.musicSrc = musicSrcTemp.data.data[0].url.slice(0, 4) + "s" + musicSrcTemp.data.data[0].url.slice(4)
    }

    async function getLyric() {
        lyricList.value.length = 0
        let lyricTemp = await apiInstance.get("/lyric", {
            params: {
                id: musicList.value[currentMusic.value].musicId
            }
        })
        let lyricArray = lyricTemp.data.lrc.lyric.split("\n")
        let lyricArrayTemp = []
        for (let i = 0; i < lyricArray.length; i++) {
            lyricArrayTemp.push(lyricArray[i].split("]"))
            let timeArray = lyricArrayTemp[i].at(0).slice(1).split(":")
            let time = timeArray[0] * 60 + Math.ceil(timeArray[1])
            lyricList.value[i] = {
                time: time,
                text: lyricArrayTemp[i].at(1)
            }
        }
    }

    async function getMusic() {
        musicReady.value = false
        currentMusic.value = 0
        await getMusicList(currentSeason.value)
        await getMusicSrc()
        await getLyric()
        musicReady.value = true
    }

    async function switchMusic() {
        musicReady.value = false
        await getMusicSrc()
        await getLyric()
        musicInfo.musicName = musicList.value[currentMusic.value].musicName
        musicInfo.musicPhoto = musicList.value[currentMusic.value].musicPhoto
        musicReady.value = true
    }

    return {
        musicInfo,
        musicListName,
        musicList,
        lyricList,
        currentRow,
        currentMusic,
        currentSeason,
        musicReady,
        getMusic,
        switchMusic
    }
})