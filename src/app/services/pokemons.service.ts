import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Pokemon } from '../models/pokemon';
import { PokemonList } from '../models/pokemon-list';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  private url = environment.apiEndPoint;
  constructor(
    private http: HttpClient
  ) { }

  public getAll(): Observable<PokemonList> {
    return this.http.get<PokemonList>(`${this.url}pokemon`, httpOptions)
      .pipe(
        catchError(err => {
          console.log('PokemonsService getAll error: ', err);
          return throwError(err);
        })
      );
  }

  public getById(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.url}pokemon/${id}`, httpOptions)
      .pipe(
        catchError(err => {
          console.log('PokemonsService getById error: ', err);
          return throwError(err);
        })
      );
  }
}
