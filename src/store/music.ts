import {defineStore} from 'pinia'
import {reactive, ref} from "vue";
import axios from "axios";
import {useLoginStore} from "@/store/login";

axios.defaults.baseURL = "http://localhost:3000"

export const useMusicStore = defineStore("music", () => {
    const loginStore = useLoginStore()
    let musicInfo = reactive({
        musicId: undefined,
        musicName: "暂无歌曲",
        musicPhoto: undefined,
        musicSrc: undefined,
    })
    let musicListName = ref("暂无歌单")
    let musicList = ref([])
    let lyricList: any = ref([])
    let currentRow = ref(0)
    let currentMusic = ref(0)

    function getRandom() {
        return Math.floor(Math.random() * 20 + 1)
    }

    async function getMusicList(season: string) {
        let musicListTemp = await axios.get("/get/info", {
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
        let musicCheck = await axios.get("/check/music", {
            params: {
                id: musicList.value[currentMusic.value].musicId,
                cookie: loginStore.getCookie()
            }
        })
        let musicSrcTemp = await axios.get("/song/url/v1", {
            params: {
                id: musicList.value[currentMusic.value].musicId,
                cookie: loginStore.getCookie()
            }
        })
        musicInfo.musicSrc = musicSrcTemp.data.data[0].url
    }

    async function getLyric() {
        lyricList.value.length = 0
        let lyricTemp = await axios.get("/lyric", {
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

    async function getMusic(season: string) {
        await getMusicList(season)
        await getMusicSrc()
        await getLyric()
    }

    async function switchMusic() {
        await getMusicSrc()
        await getLyric()
    }

    return {
        musicInfo,
        musicListName,
        musicList,
        lyricList,
        currentRow,
        currentMusic,
        getMusic,
        switchMusic
    }
})