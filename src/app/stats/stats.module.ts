import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StatsRoutingModule} from './stats-routing.module';
import {StatsComponent} from './stats.component';
import {StatsService} from './stats.service';
import { MapStatsComponent } from './map-stats/map-stats.component';


@NgModule({
    declarations: [StatsComponent, MapStatsComponent],
    imports: [
        CommonModule,
        StatsRoutingModule
    ],
    providers: [StatsService]
})
export class StatsModule {
}
