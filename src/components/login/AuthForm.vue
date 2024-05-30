<script setup lang="ts">
import { useOwnerStore } from '@/stores/owner';
import type { Ref } from 'vue';
import { ref } from 'vue';

const ownerStore = useOwnerStore();

const ownerName: Ref<string> = ref('');

function auth() {
  ownerStore.selectOwner(ownerName.value);
}
</script>

<template>
  <section
    class="auth-form"
  >
    <div class="auth-form__input-wrap">
      <label class="auth-form__name-label">Name:  </label>
      <input
        type="text"
        class="auth-form__input auth-form__input-name"
        v-model="ownerName"
      />
    </div>
    <button @click="auth">Authorization</button>
  </section>
</template>

<style lang="scss" scoped>
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 30px;

  &__input-wrap {
    display: grid;
    grid-template-columns: 1fr 5fr;
  }

  &__name-label {
    display: flex;
    align-items: center;
    font-size: 20px;
  }

  &__input {
    height: 15px;
    font-size: 18px;
    padding: 10px 10px;
    background-color: #222325;
    border: 1px solid var(--default-text-color);
    border-radius: 5px;
  }
}
</style>