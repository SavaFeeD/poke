<script setup lang="ts">

interface IProp {
  state: string | number,
}
const props = defineProps<IProp>();
</script>

<template>
  <div class="room" :title="state.toString()">
    <img src="@/assets/images/battle.svg" alt="room" />
  </div>
</template>

<style scoped lang="scss">
.room {
  display: flex;

  justify-content: center;
  align-items: center;

  width: 70px;
  height: 70px;

  border-radius: 5px;

  border: 1px solid var(--primary-color);

  img {
    width: 40px;
    height: 40px;
  }

  &:hover {
    outline: 2px solid var(--primary-color);
    cursor: pointer;
  }
}
</style>