import {Player} from './player.interface';

export interface Team {
  avatar: string;
  faction_id: string;
  leader: string;
  name: string;
  roster: Array<Player>;
  substituted: boolean;
}
