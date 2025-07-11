
export interface Participant {
   rank: string;
   img: string;
   username: string;
   bet_type: string;
   line: string;
   pick: string;
   bet_amount: number;
   bet_payout: number;
   bet_odds: string;
   bet_currency: string;
}

export interface Team {
   img: string;
   teamname: string;
}

export interface Game {
   date: string;
   time: string;
   bet_type: string;
   odds: string;
   line: string;
   teams: Team[];
}

export interface P2Pdata {
   sport: string;
   status: string;
   created_by: Participant;
   received_by: Participant;
   game: Game;
}
