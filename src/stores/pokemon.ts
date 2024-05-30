import type { IPokemon } from '@/models/pokemon';
import { PokemonApi } from '@/services/pokemon';
import { defineStore } from 'pinia'


export const usePokemonStore = defineStore('pokemon', { 
  state: () => ({
    startingPokemonsIdx: ['1', '4', '7'],
    startingPokemons: null as IPokemon[] | null,
    poketPokemons: null as IPokemon[] | null,
  }),

  getters: {
    getStartingPokemons: (state) => state.startingPokemons,
    getPoketPokemons: (state) => state.poketPokemons,
  },

  actions: {
    
    async fetchStartingPokemons() {
      const requests: Promise<IPokemon>[] = [];
      
      this.startingPokemonsIdx.forEach((id) => {
        requests.push(PokemonApi.pokemon<IPokemon>(id));
      });
      
      this.startingPokemons = await Promise.all(requests).then((res) => res);
    },

    async fetchPokemonsFromList(pokemonIdList: Array<string>) {
      const requests: Promise<IPokemon>[] = [];
      
      pokemonIdList.forEach((id) => {
        requests.push(PokemonApi.pokemon<IPokemon>(id));
      });
      
      this.poketPokemons = await Promise.all(requests).then((res) => res);
    },
    
  },

});
