import { NextResponse } from "next/server";

export async function GET() {
   const P2PBets = [
      { 
         sport: "NFL",
         status: "PENDING",
         created_by: {
            rank: "/rebet-assets/StaticAssets/daimond_icon.svg",
            img: "url/img",
            username: "Kevin",
            bet_type: "Under",
            line: "-50",
            pick: "CIN Bengals",
            bet_amount: 1.0,
            bet_payout: 2.0,
            bet_odds: "1:1",
            bet_currency: "Rebet Cash",
         },
         received_by: {
            rank: "/rebet-assets/StaticAssets/plat_icon.svg",
            img: "url/img",
            username: "Edwin",
            bet_type: "Over",
            line: "+50",
            pick: "Dallas Cowboys",
            bet_amount: 1.0,
            bet_payout: 2.0,
            bet_odds: "1:1",
            bet_currency: "Rebet Cash",
         },
         game: {
            date: "09 DEC",
            time: "08:15 PM",
            bet_type: "Over/Under",
            odds: "1:1",
            line: "50",
            teams: [
               {
                  img: "/rebet-assets/StaticAssets/bengals_logo.webp",
                  teamname: "CIN Bengals",
               },
               {
                  img: "/rebet-assets/StaticAssets/cowboys_logo.webp",
                  teamname: "Dallas Cowboys",
               }
            ]
         }
      },
   ];

  return NextResponse.json(P2PBets);
}
