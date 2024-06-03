<script setup lang="ts">
import type { IOwner } from '@/models/global';
import { useOwnerStore } from '@/stores/owner';
import type { Ref, ComputedRef } from 'vue';
import { ref, computed } from 'vue';

const ownerStore = useOwnerStore();

const owner: ComputedRef<IOwner | null> = computed(() => ownerStore.getCurrentOwner);

const activeLocation = {
  rooms: [
    [0, 1, 0],
    
    [0, 6422, 0],
    [0, 0, 1214],
    [0, 1241, 1241],
    [5212, 0, 5125],

    [0, 4254, 0],
    [1298, 1284, 0],
    [6478, 0, 0],
    [9898, 6484, 0],
    [0, 4234, 0],
    [7523, 0, 0],
    
    [0, 9873, 0],
    [0, 7612, 7342],
    [0, 0, 1257],
    [0, 7723, 1638],
    [0, 9674, 0],
    [0, 0, 7534],

    [5125, 6340, 7034],

    [0, 2, 0],
  ],
};
</script>

<template>
  <game-header />
  
  <ModalBase />
  
  <main>
    <Map :location="activeLocation"></Map>
  </main>

</template>
