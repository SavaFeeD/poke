<script setup lang="ts">

interface IProp {
  state: string | number,
}
const props = defineProps<IProp>();
</script>

<template>
  <img v-if="state === 1" src="@/assets/images/line/Frame 1line.svg" alt="line__bottom-top">
  <img v-if="state === 2" src="@/assets/images/line/Frame 2line.svg" alt="line__bottom-top--left-right">
  <img v-if="state === 3" src="@/assets/images/line/Frame 3line.svg" alt="line__bottom-top--right">
  <img v-if="state === 4" src="@/assets/images/line/Frame 4line.svg" alt="line__bottom-top--left">
  <img v-if="state === 5" src="@/assets/images/line/Frame 5line.svg" alt="line__bottom--left">
  <img v-if="state === 6" src="@/assets/images/line/Frame 6line.svg" alt="line__top--left">
  <img v-if="state === 7" src="@/assets/images/line/Frame 7line.svg" alt="line__top--right">
  <img v-if="state === 8" src="@/assets/images/line/Frame 8line.svg" alt="line__bottom--right">
  <img v-if="state === 9" src="@/assets/images/line/Frame 9line.svg" alt="line__left-right">
  <img v-if="state === 10" src="@/assets/images/line/Frame 10line.svg" alt="line__bottom--left-right">
  <img v-if="state === 11" src="@/assets/images/line/Frame 11line.svg" alt="line__top--left-right">
</template>

<style scoped lang="scss">
img {
  width: 75px;
  height: 75px;
} 
</style>