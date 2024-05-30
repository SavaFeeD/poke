<script setup lang="ts">
import type { Ref } from 'vue';
import { ref } from 'vue';

type TLoginState = 'auth' | 'reg' | 'select' | 'finish-reg' | 'finish-auth';

const loginState: Ref<TLoginState> = ref('auth');

const changeState = (state: TLoginState) => loginState.value = state;

</script>

<template>
  <menu-header />
  <main class="login-main">
    <div class="login">

      <nav class="login__navigation">
        <button
          class="login__nav-buttons"
          :class="{ 'login__nav-buttons_active': loginState === 'auth' }"
          @click="changeState('auth')"
        >
          Login
        </button>
        <button
          class="login__nav-buttons"
          :class="{ 'login__nav-buttons_active': loginState === 'reg' }"
          @click="changeState('reg')"  
        >
          New Account
        </button>
      </nav>

      <AuthForm v-if="loginState === 'auth'"/>

      <RegisterForm
        v-if="loginState === 'reg'"
        @change-state="changeState"
      />

      <SelectStartPokemon v-if="loginState === 'select'" />
      
    </div>
  </main>
</template>

<style lang="scss" scoped>
.login-main {
  width: 100%;
  display: flex;
  justify-content: center;
}

.login {
  position: relative;

  display: flex;
  flex-direction: column;

  min-width: 400px;

  padding: 20px;
  margin-top: 200px;

  border: 1px var(--primary-color) solid;
  border-radius: 5px;

  background-color: #191a1c;

  &__navigation {
    display: flex;
    padding: 10px 0;
    gap: 10px;
  }

  &__nav-buttons {
    padding: 4px 8px;

    &_active {
      filter: contrast(1.75);
    }
  }
}
</style>