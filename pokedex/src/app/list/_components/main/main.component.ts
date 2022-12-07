import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { concat, Subscription } from 'rxjs';
import { PokemonService } from '../../../_global/_services/pokemon.service'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit, OnDestroy{
  loading: boolean = false;
  variablex: string = '';
  pokemons: any[] = [];
  mainpokemons: any[] = [];

  subscriptions: Subscription[] = [];

  constructor(
    private pokemonService: PokemonService,
    private router: Router,
    ) {}

  // get pokemons(): any[] {
  //   return this.pokemonService.pokemons;
  // }

  set subscription(subscription: Subscription) {
    this.subscriptions.push(subscription);
  }

  ngOnInit(): void {
    this.pokemons = this.pokemonService.pokemons;
    this.mainpokemons = this.pokemonService.pokemons;
    if (!this.pokemons.length) {
      this.loadMore();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) =>
      subscription ? subscription.unsubscribe() : 0
    );
  }

  loadMore(): void {
    this.loading = true;
    this.subscription = this.pokemonService.getNext().subscribe(
      (response) => {
        this.pokemonService.next = response.next;
          const details = response.results.map((i: any) =>
            this.pokemonService.get(i.name)
          );
        this.subscription = concat(...details).subscribe((response: any) => {
          this.pokemonService.pokemons.push(response);
          this.pokemons = this.pokemonService.pokemons;
        });
      },
      (error) => console.log('Error Occurred:', error),
      () => (this.loading = false)
    );
  }

  getType(pokemon: any): string {
    return this.pokemonService.getType(pokemon);
  }


  filterPokemons(type:string) {
    this.pokemonService
  }

  redirect(name:any) {
    this.router.navigate(["./view/", name]);
  }

  search() {
    this.pokemons = this.mainpokemons;
    this.pokemons = this.pokemons.filter((pokemon:any) => pokemon.name.indexOf(this.variablex) !== -1);
  }
}
