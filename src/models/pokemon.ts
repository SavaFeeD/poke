import type { TUrl, IAbility, IGameIndice, IHeldItem, IMove, TVersion, IStat, IPokemonType, IOwner } from './global';

export interface IPokemon {
  abilities: IAbility[],
  base_experience: number,
  cries: {
    latest: TUrl,
    legacy: TUrl,
  },
  forms: {
    name: string,
    url: TUrl,
  }[],
  game_indices: IGameIndice[],
  height: number,
  held_items: IHeldItem[],
  id: number,
  is_default: boolean,
  location_area_encounters: TUrl,
  moves: IMove[],
  name: string,
  order: number,
  past_abilities: [],
  past_types: [],
  species: {
    name: string,
    url: TUrl,
  },
  sprites: {
    back_default: TUrl | null,
    back_female: TUrl | null,
    back_shiny: TUrl | null,
    back_shiny_female: TUrl | null,
    front_default: TUrl | null,
    front_female: TUrl | null,
    front_shiny: TUrl | null,
    front_shiny_female: TUrl | null,
    other: {
      dream_world: {
        front_default: TUrl | null,
        front_female: TUrl | null,
      },
      home: {
        front_default: TUrl | null,
        front_female: TUrl | null,
        front_shiny: TUrl | null,
        front_shiny_female: TUrl | null,
      },
      "official-artwork": {
        front_default: TUrl | null,
        front_shiny: TUrl | null,
      },
      showdown: {
        back_default: TUrl | null,
        back_female: TUrl | null,
        back_shiny: TUrl | null,
        back_shiny_female: TUrl | null,
        front_default: TUrl | null,
        front_female: TUrl | null,
        front_shiny: TUrl | null,
        front_shiny_female: TUrl | null,
      },
    },
    versions: TVersion,
  },
  stats: IStat[],
  types: IPokemonType[],
  weight: number,
};

class Pokemon {
  public owner: IOwner | null = null;
  public data: IPokemon | null = null;

  init(owner?: IOwner) {
    this.owner = (!!owner) ? owner : null;

    // get poke data
  };
}