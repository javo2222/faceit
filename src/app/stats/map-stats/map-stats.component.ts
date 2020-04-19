import {Component, Input, OnInit} from '@angular/core';
import {MapStatsDetail} from '../../interfaces/map-stats-detail.interface';

@Component({
  selector: 'app-map-stats',
  templateUrl: './map-stats.component.html',
  styleUrls: ['./map-stats.component.scss']
})
export class MapStatsComponent implements OnInit {

  @Input()
  mapStats: Array<MapStatsDetail>;

  constructor() {
  }

  ngOnInit(): void {
  }

  round(value: number): number {
    return Math.round(value);
  }

}
