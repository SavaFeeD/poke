import { defineStore } from 'pinia'
import type { IOwner, ICreateOwner, IPoket, ICreatePoket } from '@/models/global';
import { Table } from '@/services/database';
import router from '@/router';

interface IOwnerForm {
  name: string | null,
  selectedPokemon: string | null,
}

export const useOwnerStore = defineStore('owner', { 
  state: () => ({
    ownerForm: {
      name: null,
      selectedPokemon: null,
    } as IOwnerForm,
    owners: null as IOwner[] | null,
    pokets: null as IPoket[] | null,
    _owner: null as IOwner | null,
    _poket: null as IPoket | null,
  }),

  getters: {
    getOwners: (state) => state.owners,
    getCurrentPoket: (state) => state._poket,
    getCurrentOwner: (state) => state._owner,
    getOwnerFormData: (state) => state.ownerForm,
  },

  actions: {

    selectOwner(name?: string) {
      this.fetchOwners();

      if (!!this.owners) {
        const poke_owner = localStorage.getItem("poke_owner");
        
        let findedOwner: IOwner | null | undefined;

        if (!!poke_owner) {
          findedOwner = this.owners.find((person: IOwner) => person.name === poke_owner);

          this._owner = (!!findedOwner) ? findedOwner : null;
          
          if (!!findedOwner) {
            return router.push(router.resolve({ name: 'game-map', params: { id: '1' } }).href);
          } else {
            return router.push(router.resolve({ name: 'login' }).href);
          }
        }

        if (!!name) {
          findedOwner = this.owners.find((person: IOwner) => person.name === name);
        
          this._owner = (!!findedOwner) ? findedOwner : null;
          
          if (!!findedOwner) {
            localStorage.setItem("poke_owner", name);
            return router.push(router.resolve({ name: 'game-map', params: { id: '1' } }).href);
          } else {
            return router.push(router.resolve({ name: 'login' }).href);
          }
        }
        
      } else {
        return false;
      }
    },

    async selectPoket() {
      await this.fetchPokets();

      const pokets = this.pokets;
      const poketId = this._owner?.poket;

      const condition = !!pokets && !!poketId;
      
      if (condition) {

        const findedPoket = pokets.find((poket: IPoket) => poket.id === poketId);
        this._poket = (!!findedPoket) ? findedPoket : null;

        return this._poket;
      } else {
        return null;
      }
    },

    logOut() {
      localStorage.removeItem("poke_owner");
      return router.push('login');
    },

    setOwnerForm(field: keyof IOwnerForm, data: string | null) {
      this.ownerForm[field] = data;
    },

    async newOwner(ownerName: string, selectedPokemon: string) {
      return await this.createPoket([selectedPokemon])
      .then((poketKey) => {
        if (!!poketKey) {
          return this.createOwner(ownerName, poketKey);
        } else {
          return null;
        };
      });
    },

    async createOwner(name: string, poketId: string) {
      const schema: ICreateOwner = {
        name: name,
        poket: poketId,
      }

      const ownerTable = new Table('owner');
      const key = ownerTable.set<ICreateOwner>(schema);
      const request = ownerTable.update();
      
      return await request.then((_) => key);
    },

    async createPoket(pokemonIdList: Array<string>) {
      const schema: ICreatePoket = {
        pokemons: pokemonIdList,
      }

      const poketTable = new Table('poket');
      const key = poketTable.set<ICreatePoket>(schema);
      const request = poketTable.update();

      return await request.then((_) => key);
    },

    fetchOwners() {
      const ownerTable = new Table('owner');
      const ownersRef = ownerTable.get<IOwner>();
      this.owners = ownersRef.value as IOwner[];
    },

    async fetchPokets() {
      const poketTable = new Table('poket');
      const poketsRef = poketTable.get<IPoket>();
      this.pokets = poketsRef.value as IPoket[];
    }

  },

});
