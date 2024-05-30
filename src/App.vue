<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useOwnerStore } from '@/stores/owner';

const ownerStore = useOwnerStore();

ownerStore.fetchOwners();
ownerStore.fetchPokets();

setTimeout(() => {
  ownerStore.selectOwner();
}, 1000);
</script>

<template>
  <RouterView />
</template>

<style lang="scss">
body {
  background-color: var(--default-color);

  * {
    color: var(--default-text-color);
  }

  &::-webkit-scrollbar {
    width: 3px;
  }
  
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
  }
}

.primary {
  background-color: var(--primary-color);
  color: var(--default-action-color);
}

.primary-text {
  color: var(--primary-color);
}

button {
  border: none;
  background: var(--primary-color);
  border-radius: 4px;
  color: var(--default-action-color);
  font-size: large;
  padding: 10px;
  cursor: pointer;
}

.button-outline {
  border: 1px solid var(--primary-color);
  background: none;
  color: var(--primary-color);
}

a {
  text-decoration: none;
  font-size: large;
  color: var(--default-action-color);
}
</style>
