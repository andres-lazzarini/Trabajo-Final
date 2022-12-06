import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(private http: HttpClient) {}

  getTypePokemons(url: string): Observable<any> {
    return this.http.get(url);
  }

  getTypes(pokemon:string): Observable<any> {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  }
}
