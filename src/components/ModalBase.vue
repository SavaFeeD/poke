<script setup lang="ts">
import { computed, ref, type ComputedRef, type Ref } from 'vue';
import { useModalStore, type IOptions } from '@/stores/modals';

const modalStore = useModalStore();

const status: ComputedRef<boolean> = computed(() => modalStore.getStatus);
const options: ComputedRef<IOptions> = computed(() => modalStore.getOptions);

function close() {
  modalStore.close();
}
</script>

<template>
  <div class="modal-bg" v-if="status" @click="close"></div>
  <div class="modal" v-if="status">
    <div class="modal__header">
      <button
        @click="close"
        class="button-outline modal__close"
      >
        X
      </button>
    </div>
    <div class="modal__content">
      <m-pokemon  key="m1" v-if="options.key === 'Pokemon'" />
      <m-poket    key="m2" v-if="options.key === 'Poket'" />
      <m-profile  key="m3" v-if="options.key === 'Profile'" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal-bg {
  position: fixed;

  top: 0;

  width: 100%;
  height: 100vh;

  z-index: 99999;
}

.modal {
  position: fixed;
  z-index: 100000;

  top: 0;

  max-width: 600px;
  min-height: 300px;
  width: 100%;

  top: 50%;
  left: 50%;
  margin-top: -250px;
  margin-left: -321px;

  padding: 20px;

  background-color: var(--default-color);

  border: 1px solid var(--primary-color);

  &__header {
    padding-bottom: 20px;
    display: flex;
    justify-content: flex-end;
  }

  &__close {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>