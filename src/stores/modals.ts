import { defineStore } from 'pinia';

export type TModalName = 'Profile' | 'Poket' | 'Pokemon' | null;

export interface IFields {
  key: TModalName,
  fields: {
    [index: string]: any,
  },
};

export interface IOptions {
  key: TModalName,
  fields?: IFields,
};

export const useModalStore = defineStore('modal', { 
  state: () => ({
    status: false as boolean,
    options: {
      key: null,
      fields: {},
    } as IOptions,
  }),

  getters: {
    getStatus: (state) => state.status,
    getOptions: (state) => state.options,
  },

  actions: {
    
    open(options: IOptions) {
      this.options = options;
      this.status = true;
    },
    
    close() {
      this.status = false;
    },

  },

});
