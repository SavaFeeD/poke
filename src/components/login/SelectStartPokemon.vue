<script setup lang="ts">
import type { IPokemon } from '@/models/pokemon';
import { useOwnerStore } from '@/stores/owner';
import { usePokemonStore } from '@/stores/pokemon';
import type { Ref, ComputedRef } from 'vue';
import { ref, computed } from 'vue';

const pokemonStore = usePokemonStore();
const ownerStore = useOwnerStore();

pokemonStore.fetchStartingPokemons();

const selectedPokemon: Ref<string | null> = ref(null);
const loading: Ref<boolean> = ref(false);

const listStartingPokemon: ComputedRef<IPokemon[] | null> = computed(() => pokemonStore.getStartingPokemons);
const ownerName: ComputedRef<string | null> = computed(() => ownerStore.getOwnerFormData.name);

function selectPokemon(id: string) {
  selectedPokemon.value = id;
}

async function newOwner() {
  if (!!selectedPokemon.value && !!ownerName.value) {
    loading.value = true;

    await ownerStore.newOwner(ownerName.value, selectedPokemon.value).then((_) => {
      if (!!ownerName.value) {
        ownerStore.selectOwner(ownerName.value)
        loading.value = false;
      }
    });
  }
}
</script>

<template>
  <section>
    <h3>Hello, {{ ownerName }}!</h3>
    <p>Select you`re stating Pokemon:</p>
    <div
      class="pokemon-list"
      v-if="listStartingPokemon?.length"
    >
      <button
        class="pokemon-preview"
        :class="{ 'pokemon-preview_active': pokemon.id.toString() === selectedPokemon }"
        v-for="(pokemon, pokemonOrder) in listStartingPokemon"
        :key="pokemon.name + '-' + pokemonOrder"
        @click="() => selectPokemon(pokemon.id.toString())"
        :title="pokemon.name"
      >
        <img
          v-if="!!pokemon.sprites.front_default"
          class="pokemon-preview__image"
          :src="pokemon.sprites.front_default"
          :alt="'pokemon-' + pokemon.name"
        >
        <img
          v-else
          src="@/assets/images/Empty.png"
          class="pokemon-preview__image"
          :alt="'pokemon-' + pokemon.name + '-empty'"
        >
      </button>
    </div>

    <button
      class="button-go"
      :class="{ 'button-go_active': !!selectedPokemon }"
      @click="newOwner"
    >
      <Loading v-if="loading" />  
      <span v-else>GO</span>
    </button>
  </section>
</template>

<style lang="scss" scoped>
.pokemon-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.pokemon-preview {
  background: none;
  transition: all .5s;
  border: 1px dashed var(--primary-color);

  &_active {
    border: 1.5px solid var(--primary-color);
    border-radius: 15px;
  }
}

.button-go {
  position: absolute;
  right: -70px;
  top: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 60px;
  height: 60px;

  font-size: 25px;

  opacity: 0;
  transition: all .5s;

  span {
    color: white;
  }

  &_active {
    opacity: 1;
  }
}
</style>