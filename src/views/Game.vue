<script setup lang="ts">
import type { IOwner } from '@/models/global';
import { useOwnerStore } from '@/stores/owner';
import type { Ref, ComputedRef } from 'vue';
import { ref, computed } from 'vue';

const ownerStore = useOwnerStore();

const owner: ComputedRef<IOwner | null> = computed(() => ownerStore.getCurrentOwner);

const activeLocation = {
  // rooms: [
  //   {
  //     group: 'center',
  //     row: 0,
  //     token: '1000',
  //     from: ['center', 'start'],
  //     to: ['center', '1001'],
  //   },
  //   {
  //     group: 'center',
  //     row: 2,
  //     token: '1001',
  //     from: ['center', '1000'],
  //     to: ['center', '1002'],
  //   },
  //   {
  //     group: 'center',
  //     row: 4,
  //     token: '1002',
  //     from: ['center', '1001'],
  //     to: ['center', '1003'],
  //   },
  //   {
  //     row: 6,
  //     group: 'center',
  //     token: '1003',
  //     from: ['center', '1002'],
  //     to: ['center', 'finish'],
  //   },
  //   {
  //     group: 'left',
  //     row: 1,
  //     token: '1004',
  //     from: ['center', '1000'],
  //     to: ['center', '1002'],
  //   },
  //   {
  //     group: 'right',
  //     row: 1,
  //     token: '1005',
  //     from: ['center', '1000'],
  //     to: ['right', '1006'],
  //   },
  //   {
  //     group: 'right',
  //     row: 3,
  //     token: '1006',
  //     from: ['right', '1005'],
  //     to: ['center', '1003'],
  //   },
  // ],
  rooms: [
    [0, 2, 0],
    [0, 6422, 0],
    [0, 0, 1214],
    [0, 1241, 1241],
    [5212, 0, 5125],
    [0, 4254, 0],
    [0, 4234, 0],
    [0, 1, 0],
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
