import { Component, Input, EventEmitter, OnInit, Output } from '@angular/core';

import { Pokemon } from 'src/app/models/pokemon';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  @Input() public pokemons: Pokemon[] = [];
  @Output() public selectForFightEmitter = new EventEmitter<Pokemon>();
  constructor() { }

  ngOnInit(): void {
  }

  public selectForFight(product: Pokemon): void {
    this.selectForFightEmitter.emit(product);
  }

}
