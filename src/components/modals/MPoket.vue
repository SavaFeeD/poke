<script setup lang="ts">
import type { IPoket } from '@/models/global';
import type { IPokemon } from '@/models/pokemon';
import { useOwnerStore } from '@/stores/owner';
import { usePokemonStore } from '@/stores/pokemon';
import { range } from 'lodash';
import { computed, type ComputedRef, watch, ref, type Ref } from 'vue';
import { VueDraggableNext as draggable } from 'vue-draggable-next';

const ownerStore = useOwnerStore();
const pokemonStore = usePokemonStore();

ownerStore.selectPoket();

const infoActive: Ref<IPokemon | null> = ref(null);

const poket: ComputedRef<IPoket | null> = computed(() => ownerStore.getCurrentPoket);
const poketPokemons: ComputedRef<IPokemon[] | null> = computed(() => pokemonStore.getPoketPokemons);
const hasPoket: ComputedRef<boolean> = computed(() => !!poket.value && !!poket.value?.pokemons && !!poket.value?.pokemons?.length && !!poketPokemons.value);
const countEmptySlots: ComputedRef<number> = computed(() => {
  if (poketPokemons.value === null) return 6;
  else return 6 - poketPokemons.value.length;
});

watch(poket, (value) => {
  console.log(value);
  
  if (value?.pokemons) {
    pokemonStore.fetchPokemonsFromList(value.pokemons);
  }
}, { deep: true, immediate: true });

function viewInfo(pokemon: IPokemon) {
  if (infoActive.value === pokemon) {
    infoActive.value = null;
  } else {
    infoActive.value = pokemon;
  }
}
</script>

<template>
  <div class="poket-wrap">
    <draggable class="poket" v-if="hasPoket">
      <div
        class="poket__pokemon"
        :class="{ 'poket__pokemon_active': infoActive === pokemon }"

        v-for="(pokemon, pokemonOrderInPoket) in poketPokemons"
        :key="`${pokemon.id}-${pokemon.name}-${pokemonOrderInPoket}`"
        
        @click="() => viewInfo(pokemon)"
      >
        <PokemonPreviewBox :unset-border="true" :image="pokemon.sprites.front_default" />
      </div>
      <div
        class="poket__pokemon empty-pokemon-slot"
        v-for="_ in range(0, countEmptySlots)"
      ></div>
    </draggable>
    <div class="poke-info" v-if="!!infoActive">
      <h4>{{ infoActive.name }}</h4>
      <ul v-for="ability in infoActive.abilities">
        <li>{{ ability.ability.name }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.poket-wrap {
  display: flex;
  gap: 10px;
}

.poket {
  display: grid;
  grid-template-columns: repeat(3, 103px);
  grid-template-rows: repeat(2, 103px);

  gap: 10px;

  &__pokemon {
    cursor: pointer;
    border-radius: 7px;
    background-color: #191a1c;
    padding: 1px;

    &_active {
      padding: 0;
      border: 1px solid var(--primary-color);
    }
  }
}

.empty-pokemon-slot {
  cursor: unset;
}

.poke-info {
  padding: 10px;
  width: 100%;
  border: 1px dashed var(--primary-color);
}
</style>