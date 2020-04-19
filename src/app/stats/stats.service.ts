import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Player} from '../interfaces/player.interface';
import {MapStatsDetail} from '../interfaces/map-stats-detail.interface';
import {PlayerStats} from '../interfaces/player-stats.interface';
import {MapSegment} from '../interfaces/map-segment.interface';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  private static MAPPOOL = ['de_inferno', 'de_cache', 'de_nuke', 'de_dust2', 'de_train', 'de_vertigo', 'de_mirage', 'de_overpass'];

  constructor(private httpClient: HttpClient) {
  }

  calcTeamMapStats(players: Array<Player>): Promise<any> {
    let mapPool = [];
    return new Promise((resolve, reject) => {
      players.forEach(player => {
        console.log(player.nickname);
        this.httpClient.get(`players/${player.player_id}/stats/csgo`).subscribe(ps => {
          const playerStats: PlayerStats = ps as PlayerStats;
          playerStats.segments.forEach(segment => {
            mapPool = this.enhanceMapPool(mapPool, segment);
          });
        });
      });
      resolve(mapPool);
    });
  }

  enhanceMapPool(mapPool: Array<MapStatsDetail>, segment: MapSegment): Array<MapStatsDetail> {
    const index = mapPool.findIndex(m => m.map === segment.label);
    if (StatsService.MAPPOOL.includes(segment.label)) {
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

  filterByMappool(maps: Array<MapStatsDetail>): Array<MapStatsDetail> {
    maps = maps.filter(m => !!StatsService.MAPPOOL.includes(m.map));
    return maps;
  }

}
