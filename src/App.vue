<template>
  <RouterView/>
</template>

<script setup lang="ts">
import {useLoginStore} from "@/store/login";
import {onMounted} from "vue";

const store = useLoginStore()

onMounted(() => { //只在挂载时执行一次
  store.getLoginStatus()
})


</script>

<style scoped>

</style>