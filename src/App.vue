<template>
  <RouterView/>
</template>

<script setup lang="ts">
import {useLoginStore} from "@/store/login";
import {onMounted} from "vue";

const loginStore = useLoginStore()

onMounted(() => { //只在挂载时执行一次
  loginStore.getLoginStatus()
})


</script>

<style scoped>

</style>