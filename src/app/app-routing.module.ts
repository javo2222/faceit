import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./search/search.module').then(mod => mod.SearchModule),
    canActivate: []
  },
  {
    path: 'stats/:id',
    loadChildren: () => import('./stats/stats.module').then(mod => mod.StatsModule),
    canActivate: []
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
