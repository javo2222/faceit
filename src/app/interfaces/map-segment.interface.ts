import {MapStats} from './map-stats.interface';

export interface MapSegment {
  stats: MapStats;
  type: string;
  mode: string;
  label: string;
  img_small: string;
  img_regular: string;
}
