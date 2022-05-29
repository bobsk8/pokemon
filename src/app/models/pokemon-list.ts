import { Pokemon } from "./pokemon";

export class PokemonList {
    constructor(
        public count?: number,
        public next?: string,
        public previous?: string,
        public results?: Pokemon[]
    ) {}
}