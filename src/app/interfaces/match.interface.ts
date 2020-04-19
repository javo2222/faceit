import {Teams} from './teams.interface';

export interface Match {
  best_of: number;
  calculate_elo: boolean;
  chat_room_id: string;
  competition_id: string;
  competition_name: string;
  competition_type: string;
  configured_at: number;
  faceit_url: string;
  game: string;
  match_id: string;
  organizer_id: string;
  region: string;
  started_at: number;
  status: string;
  teams: Teams;
  version: number;
  voting: any;
}
