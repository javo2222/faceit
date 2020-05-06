import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AnalyticsGuard} from "./analytics.guard";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./search/search.module').then(mod => mod.SearchModule),
    canActivate: [AnalyticsGuard]
  },
  {
    path: 'stats/:id',
    loadChildren: () => import('./stats/stats.module').then(mod => mod.StatsModule),
    canActivate: [AnalyticsGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
