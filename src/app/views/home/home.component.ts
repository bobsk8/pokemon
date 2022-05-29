import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonList } from 'src/app/models/pokemon-list';

import { PokemonsService } from 'src/app/services/pokemons.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public pokemonWinner: Pokemon = new Pokemon();
  public pokemonList: PokemonList = new PokemonList();
  public pokemonFightList: Pokemon[] = [];
  public submitted = false;
  public loading = false;
  private subs: Subscription[] = [];
  constructor(
    private pokemonService: PokemonsService
  ) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  public ngOnDestroy(): void {
    this.subs.forEach(el => el.unsubscribe());
  }

  public getPokemons(): void {
    const sub = this.pokemonService.getAll()
      .subscribe(pokemonList => this.pokemonList = pokemonList);
    this.subs.push(sub);
  }

  public selectForFight(pokemon: Pokemon): void {
    if (this.pokemonFightList.find(el => el.name === pokemon.name)) {
      alert('Pokemon already selected! Please select another pokemon.');
      return;
    }
    this.pokemonFightList.push(pokemon);
  }

  public fight(): void {
    this.submitted = true;    
    if (this.submitted && this.pokemonFightList.length === 0) {
      return;
    }
    this.loading = true;
    setTimeout(() => {      
      this.pokemonWinner = this.getWinner();
      this.removeLosers();
      this.loading = false;
    }, 1000);
  }

  public clear(): void {
    this.pokemonFightList = [];
    this.pokemonWinner = new Pokemon();
    this.submitted = false;
  }

  private getWinner(): Pokemon {
    return this.pokemonFightList[Math.floor(Math.random() * this.pokemonFightList.length)];
  }

  private removeLosers(): void {
    const toRemove = this.pokemonFightList.filter(el => el.name != this.pokemonWinner.name);
    this.pokemonList.results = [...this.pokemonList.results.filter(el1 => !toRemove.find(el2 => el1.name === el2.name))];
  }

}
