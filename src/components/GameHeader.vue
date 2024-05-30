<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useOwnerStore } from '@/stores/owner';
import { useModalStore } from '@/stores/modals';

const ownerStore = useOwnerStore();
const modalStore = useModalStore();

function logOut() {
  ownerStore.logOut();
}

function openProfile() {
  modalStore.open({
    key: 'Profile',
  });
}
function openPokemons() {
  modalStore.open({
    key: 'Poket',
  });
}
</script>

<template>
  <header>
    <div class="header">
      <img
        class="logo"
        alt="poke logo"
        src="@/assets/images/logo.svg"
      />

      <div class="wrapper">
        <nav>
          <button @click="openProfile">Profile</button>
          <button @click="openPokemons">Poket</button>
        </nav>
        <button
          @click="logOut"
          class="button-outline"
        >
          Log Out
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  width: 100%;
  max-width: 1200px;
  margin: auto;
}

.logo {
  width: 50px;
  padding: 10px 0 10px 20px;
}

.wrapper {
  width: 100%;
  padding: 0 20px 0 0;

  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    margin-left: 30px;
    display: flex;
    gap: 15px;
  }
}
</style>