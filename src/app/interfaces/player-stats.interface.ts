import {MapSegment} from './map-segment.interface';

export interface PlayerStats {
  player_id: string;
  game: string;
  lifetime: any;
  segments: Array<MapSegment>;
}
