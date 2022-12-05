import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  constructor(private http: HttpClient) { }

  public getPokemonTypes(url:string) {
    return this.http.get(url + '/pokemon');
  }
}
