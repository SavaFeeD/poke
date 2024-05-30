import type { TUrl } from "@/models/global";

export class PokemonApi {
  private static baseUrl: TUrl = 'https://pokeapi.co/api/v2';

  public static async pokemon<IPokemon>(id: string) {
    return await fetch(`${this.baseUrl}/pokemon/${id}`).then((res) => res.json() as IPokemon);
  }
}