import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Match} from '../interfaces/match.interface';
import {StatsService} from './stats.service';
import {MapStatsDetail} from '../interfaces/map-stats-detail.interface';
import {Team} from '../interfaces/team.interface';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  mapStatsTeam1: Array<MapStatsDetail> = [];
  mapStatsTeam2: Array<MapStatsDetail> = [];
  team1: Team;
  team2: Team;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private statsService: StatsService) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      const match = params.id; // (+) converts string 'id' to a number
      if (match) {
        this.http.get(`matches/${match}`).subscribe(r => {
          const m: Match = r as Match;
          this.team1 = m.teams.faction1;
          this.team2 = m.teams.faction2;
          this.mapStatsTeam1 = this.statsService.calcTeamMapStats(m.teams.faction1.roster);
          this.mapStatsTeam2 = this.statsService.calcTeamMapStats(m.teams.faction2.roster);
        });
      }
    });
  }

}
