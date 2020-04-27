import {Component, Input, OnInit} from '@angular/core';
import {Chart} from 'chart.js';
import {MapUtilClass} from '../../shared/classes/map-util.class';
import {StatsService} from '../stats.service';
import {MapStatsDetail} from '../../interfaces/map-stats-detail.interface';

@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.scss']
})
export class RadarChartComponent implements OnInit {

  @Input()
  mapStatsTeam1: Array<MapStatsDetail> = [];

  @Input()
  mapStatsTeam2: Array<MapStatsDetail> = [];

  @Input()
  team1: string;

  @Input()
  team2: string;

  chart;

  constructor(private statsService: StatsService) {
  }

  ngOnInit(): void {
    this.chart = new Chart('canvas', {
      type: 'radar',
      data: {
        labels: MapUtilClass.MAPPOOL,
        datasets: [{
          label: this.team1,
          backgroundColor: 'rgba(200,0,0,.1)',
          borderColor: 'rgba(200,0,0,1)',
          data: this.statsService.convertToWinPercentages(this.mapStatsTeam1)
        }, {
          label: this.team2,
          backgroundColor: 'rgba(0,0,200,0.1)',
          borderColor: 'rgba(0,0,200,1)',
          data: this.statsService.convertToWinPercentages(this.mapStatsTeam2)
        }]
      },
      options: {}
    });
  }

}
