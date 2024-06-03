<script setup lang="ts">

interface IProp {
  state: string | number,
}
const props = defineProps<IProp>();
</script>

<template>
  <div
    class="room start-room"
    title="start room"
    v-if="state === 1"
  >
    <img src="@/assets/images/battle.svg" alt="start-room" />
  </div>
  <div
    class="room finish-room"
    title="finish room"
    v-else-if="state === 2"
  >
    <img src="@/assets/images/battle.svg" alt="start-room" />
  </div>
  <div
    v-else
    class="room"
    :title="state.toString()"
  >
    <img src="@/assets/images/battle.svg" alt="battle-room" />
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

.start-room {
  border: 1px solid #31c6b1;
  width: 72px;
  height: 72px;
}
.finish-room {
  border: 1px solid #c64731;
  width: 72px;
  height: 72px;
}
</style>