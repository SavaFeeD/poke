export type TUrl = `${'https' | 'http'}://${string}`;

export type TUuid = string & { __brand: "/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/" };

export enum EGenerations {
  'i'     = 'generation-i',
  'ii'    = 'generation-ii',
  'iii'   = 'generation-iii',
  'iv'    = 'generation-iv',
  'v'     = 'generation-v',
  'vi'    = 'generation-vi',
  'vii'   = 'generation-vii',
  'viii'  = 'generation-viii',
};

export enum EGames {
  'i-1' = 'red-blue',
  'i-2' = 'yellow',
  'ii-1' = 'crystal',
  'ii-2' = 'gold',
  'ii-3' = 'silver',
  'iii-1' = 'emerald',
  'iii-2' = 'firered-leafgreen',
  'iii-3' = 'ruby-sapphire',
  'iv-1' = 'diamond-pearl',
  'iv-2' = 'heartgold-soulsilver',
  'iv-3' = 'platinum',
  'v-1' = 'black-white', // animated and default
  'vi-1' = 'omegaruby-alphasapphire',
  'vi-2' = 'x-y',
  'vii-1_viii-1' = 'icons', // generation-viii only and generation-vii: icons + ultra-sun-ultra-moon
  'vii-2' = 'ultra-sun-ultra-moon',
}

export interface ICreateOwner {
  name: string,
  poket: string,
}

export interface IOwner extends ICreateOwner {
  id: string,
}

export interface ICreatePoket {
  pokemons: string[],
}

export interface IPoket extends ICreatePoket {
  id: string,
}

export interface IVersion {
  front_default: TUrl | null,
  front_female: TUrl | null,
  back_default?: TUrl | null,
  back_gray?: TUrl | null,
  back_transparent?: TUrl | null,
  front_gray?: TUrl | null,
  front_transparent?: TUrl | null,
  animated?: {
    front_default: TUrl | null,
    front_female: TUrl | null,
    back_default?: TUrl | null,
    back_gray?: TUrl | null,
    back_transparent?: TUrl | null,
    front_gray?: TUrl | null,
    front_transparent?: TUrl | null,
  }
}

export type TGenerations = Record<EGames, IVersion>;
export type TVersion = Record<EGenerations, TGenerations>;

export interface IAbility {
  ability: {
    name: string,
    url: TUrl,
  },
  is_hidden: boolean,
  slot: number,
};

export interface IGameIndice {
  game_index: number,
  version: {
    name: string,
    url: TUrl,
  }
};

export interface IVersionDetail {
  rarity: number,
  version: {
    name: string,
    url: TUrl,
  }
};

export interface IHeldItem {
  item: {
    name: string,
    url: TUrl,
  },
  version_details: IVersionDetail,
};

export interface IVersionGroupDetail {
  level_learned_at: number,
  move_learn_method: {
    name: string,
    url: TUrl,
  },
  version_group: {
    name: string,
    url: TUrl,
  }
};

export interface IMove {
  move: {
    name: string,
    url: TUrl,
  },
  version_group_details: IVersionGroupDetail[],
}

export interface IStat {
  base_stat: number,
  effort: number,
  stat: {
    name: string,
    url: TUrl,
  },
}

export interface IPokemonType {
  slot: number,
  type: {
    name: string,
    url: TUrl,
  },
}