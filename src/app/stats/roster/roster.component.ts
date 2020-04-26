import {Component, Input, OnInit} from '@angular/core';
import {Team} from "../../interfaces/team.interface";

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.scss']
})
export class RosterComponent implements OnInit {

  @Input()
  team: Team;

  averageLevel: number;

  constructor() {
  }

  ngOnInit(): void {
    this.averageLevel = this.calcAvgLevel();
  }

  calcAvgLevel() {
    let sum = 0;
    let count = 0;
    console.log(this.team);
    this.team.roster.forEach(player => {
      count++;
      sum += player.game_skill_level;
    });
    console.log(sum);
    return Math.round(sum / count);
  }

}
