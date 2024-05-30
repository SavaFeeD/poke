<script setup lang="ts">
import type { IOwner } from '@/models/global';
import { useOwnerStore } from '@/stores/owner';
import { computed, type ComputedRef } from 'vue';

const ownerStore = useOwnerStore();

const owner: ComputedRef<IOwner | null> = computed(() => ownerStore.getCurrentOwner);
</script>

<template>
  <div class="profile-wrap">
    <div class="profile">
      <img src="@/assets/images/Empty.png" alt="Empty">
      <div class="profile__info">
        <h3>{{ owner?.name }}</h3>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.profile {
  display: flex;

  &__info {
    width: 100%;
    padding-left: 20px;

    h3 {
      margin-top: 0;
    }
  }
}
</style>