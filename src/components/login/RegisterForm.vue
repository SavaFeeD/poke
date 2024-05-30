<script setup lang="ts">
import { useOwnerStore } from '@/stores/owner';
import type { Ref } from 'vue';
import { ref } from 'vue';

const ownerStore = useOwnerStore();

const emit = defineEmits(['changeState']);

const ownerName: Ref<string> = ref('');

function nextStep() {
  ownerStore.setOwnerForm('name', ownerName.value);
  emit('changeState', 'select');
}
</script>

<template>
  <section
    class="register-form" 
  >
    <div class="register-form__input-wrap">
      <label class="register-form__name-label">Name:  </label>
      <input
        type="text"
        class="register-form__input register-form__input-name"
        v-model="ownerName"
      />
    </div>
    
    <button @click="nextStep">Select Pokemon</button>
  </section>
</template>

<style lang="scss" scoped>
.register-form {
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