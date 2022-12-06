import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './_components/header/header.component';
import { FooterComponent } from './_components/footer/footer.component';
import { SidebarComponent } from './_components/sidebar/sidebar.component';
import { MainComponent } from './_components/main/main.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../list/list.module').then(
            (m) => m.ListModule
          ),
      },
      {
        path: 'types',
        loadChildren: () =>
          import('../filter/filter.module').then((m) => m.FilterModule),
      },
      {
        path: 'view',
        loadChildren: () =>
          import('../pokemons/pokemons.module').then((m) => m.PokemonsModule),
      }
    ],
  }];

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        SidebarComponent,
        MainComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
    ]
})
export class GlobalModule { }
