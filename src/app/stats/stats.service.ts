import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Player} from '../interfaces/player.interface';
import {MapStatsDetail} from '../interfaces/map-stats-detail.interface';
import {PlayerStats} from '../interfaces/player-stats.interface';
import {MapSegment} from '../interfaces/map-segment.interface';
import {MapUtilClass} from '../shared/classes/map-util.class';
import {forkJoin} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private httpClient: HttpClient) {
  }

  calcTeamMapStats(players: Array<Player>): Array<MapStatsDetail> {
    let mapPool = [];
    const playerResponses = [];
    players.forEach((player, index) => {
      playerResponses.push(this.httpClient.get(`players/${player.player_id}/stats/csgo`));
    });
    forkJoin(playerResponses).subscribe(response => {
      response.forEach(ps => {
        const playerStats: PlayerStats = ps as PlayerStats;
        playerStats.segments.forEach(segment => {
          mapPool = this.enhanceMapPool(mapPool, segment);
        });
      });
    });
    return mapPool;
  }

  enhanceMapPool(mapPool: Array<MapStatsDetail>, segment: MapSegment): Array<MapStatsDetail> {
    const index = mapPool.findIndex(m => m.map === segment.label);
    if (MapUtilClass.MAPPOOL.includes(segment.label)) {
      if (index === -1) {
        const mapStats: MapStatsDetail = {
          kdRatio: +segment.stats['K/D Ratio'],
          matches: +segment.stats.Matches,
          wins: +segment.stats.Wins,
          avgKdRatio: +segment.stats['K/D Ratio'] / +segment.stats.Matches,
          winPercentage: (+segment.stats.Wins / +segment.stats.Matches) * 100,
          map: segment.label,
          mapImg: segment.img_regular
        };
        mapPool.push(mapStats);
      } else {
        const currentMapStats = mapPool[index];
        currentMapStats.kdRatio += +segment.stats['K/D Ratio'];
        currentMapStats.matches += +segment.stats.Matches;
        currentMapStats.wins += +segment.stats.Wins;
        currentMapStats.avgKdRatio = (currentMapStats.kdRatio / currentMapStats.matches);
        currentMapStats.winPercentage = (currentMapStats.wins / currentMapStats.matches) * 100;
        currentMapStats.map = segment.label;
        currentMapStats.mapImg = segment.img_regular;
        mapPool[index] = currentMapStats;
      }
    }
    return this.sortMapStatsDetails(mapPool);
  }

  sortMapStatsDetails(mapPool: Array<MapStatsDetail>) {
    mapPool = mapPool.sort((a, b) => {
      if (a.winPercentage > b.winPercentage) {
        return -1;
      }
      if (b.winPercentage > a.winPercentage) {
        return 1;
      }
      return 0;
    });
    return mapPool;
  }

  convertToWinPercentages(mapStats: Array<MapStatsDetail>): Array<number> {
    const arr = [];
    MapUtilClass.MAPPOOL.forEach(map => {
      mapStats.forEach(m => {
        if (m.map === map) {
          arr.push(m.winPercentage);
        }
      });
    });
    return arr;
  }

}
