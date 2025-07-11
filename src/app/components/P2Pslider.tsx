"use client";

import { useEffect, useState } from "react";
import { P2Pdata } from "../../types/P2Pdata";
import Image from "next/image";

export default function P2Pslider() {
   const [p2pData, setP2pData] = useState<P2Pdata | null>(null);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const res = await fetch("/api");
            if (!res.ok) {
               throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data: P2Pdata[] = await res.json();
            setP2pData(data[0]);
            console.log("Fetched data:", data);
         } catch (error) {
            console.error("Failed to fetch slides:", error);
         } finally {
            console.log("Fetch attempt finished.");
         }
      };

      fetchData();
   }, []);

   if (!p2pData) {
      return <p>Loading...</p>;
   }

   return (
      <div className="p2p-component max-w-[500px] mx-auto my-0">
         <div className="p2p-component__inner relative rounded-[24px] overflow-hidden">
            <div className="p2p-component__top flex bg-[linear-gradient(90deg,#25252F_0%,#14141B_100%)] relative">
               <div className="w-[40%] p-[18px] clip-diagonal-left">
                  <div className="flex flex-row-reverse justify-end items-center">
                     <p className="ml-4 text-[12px] sm:text-[16px]">{p2pData.created_by?.username}</p>
                     <div className="w-12 h-12 bg-[#652B18] rounded-full flex items-center justify-center text-[#D87A2A] font-bold relative">
                        <span>{p2pData.created_by.username?.charAt(0).toUpperCase()}</span>
                        <div className="user-rank absolute bottom-[0%] right-[-18%] bg-black p-1 rounded-[50%]">
                           <Image src={p2pData.created_by.rank} alt="rank Icon" width={15} height={15} />
                        </div>
                     </div>
                  </div>
               </div>
               <div className="absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#14141B] p-2 rounded-full w-10 h-10 flex items-center justify-center">
                  <p className="italic font-bold text-[12px] sm:text-[16px] uppercase">vs.</p>
               </div>
               <div className="bg-[linear-gradient(90deg,#25252F_0%,#14141B_100%)] w-[60%] p-[18px] clip-diagonal-right">
                  <div className="flex flex-row justify-end items-center text-right">
                     <div className="mr-4">
                        <p className="text-[12px] sm:text-[16px]">{p2pData.received_by.username ? "You": ""}</p>
                        <span className="text-[#FD6F27] text-[12px] sm:text-[14px]">{p2pData.status === "PENDING" ? "Waiting..." : ""}</span>
                     </div>
                     <div className="w-12 h-12 bg-[#652B18] rounded-full flex items-center justify-center text-[#D87A2A] font-bold relative opacity-40">
                        <span>{p2pData.received_by.username?.charAt(0).toUpperCase()}</span>
                        <div className="user-rank absolute bottom-[0%] left-[-18%] bg-black p-1 rounded-[50%]">
                           <Image src={p2pData.received_by.rank} alt="rank Icon" width={15} height={15}  />
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="p-[18px] bg-[linear-gradient(180deg,rgba(101,43,24,0.5)_0%,#25252F_100%)]">
               <div className="flex flex-row items-center justify-between">
                  <div className="flex align-center">
                     <Image src="/rebet-assets/StaticAssets/football_icon.svg" alt="football icon" width={17} height={17} />
                     <span className="ml-2 text-[12px] sm:text-[16px]">{p2pData.sport}</span>
                  </div>
                  <div className="bg-[rgba(250,249,246,0.1)] py-1.5 px-3 border border-2 border-[rgba(250,249,246,0.2)] rounded-[12px]">
                     <p className="italic uppercase text-[12px] sm:text-[14px]">{p2pData.status}</p>
                  </div>
               </div>
               <div className="flex items-center text-center justify-between mt-6">
                  <div className="w-[33%] flex items-center flex-col">
                     <div className="bg-black rounded-full py-4 px-2.5">
                        <Image src={p2pData.game.teams[0].img} alt="team logo" width={60} height={60} />
                     </div>
                     <p className="font-semibold text-[12px] sm:text-[18px] mt-4">{p2pData.game.teams[0].teamname}</p>
                     <div className="bet-line relative mt-8 py-1.5 px-10 sm:px-[48px] bg-[rgba(20,20,27,0.5)] rounded-[12px]">
                        <p className="text-[13px]">{p2pData.created_by.bet_type}</p>
                        <p className="text-[#FD6F27] text-[14px]">{p2pData.created_by.line}</p>
                     </div>
                  </div>
                  <div className="w-[33%]">
                     <div className="mb-6">
                        <p className="text-[#FD6F27]">{p2pData.game.date}</p>
                        <p className="text-[14px]">{p2pData.game.time}</p>
                     </div>
                     <div>
                        <p className="text-[#FD6F27] uppercase text-[12px] mb-2">odds</p>
                        <div className="odds-text relative text-center mx-auto my-0 bg-[linear-gradient(180deg,#FC4233_30%,#FCA732_100%)] shadow-[0px_12px_32px_0px_rgba(252,167,50,0.12),0px_24px_48px_0px_rgba(252,77,51,0.24)] w-[60px] rounded-[18px]">
                           <p className="text-black italic text-[20px] font-semibold tracking-[4px]">{p2pData.game.odds}</p>
                        </div>
                     </div>
                  </div>
                  <div className="w-[33%] flex items-center flex-col">
                     <div className="bg-black rounded-full py-1.5 px-2">
                        <Image src={p2pData.game.teams[1].img} alt="team logo" width={60} height={60} />
                     </div>
                     <p className="font-semibold text-[12px] sm:text-[18px] mt-4">{p2pData.game.teams[1].teamname}</p>
                     <div className="bet-line relative mt-8 py-1.5 px-10 sm:px-[48px] bg-[rgba(20,20,27,0.5)]  rounded-[12px]">
                        <p className="text-[13px]">{p2pData.received_by.bet_type}</p>
                        <p className="text-[#FD6F27] text-[14px]">{p2pData.received_by.line}</p>
                     </div>
                  </div>
               </div>
            </div>
            
         </div>
      </div>
   );
}
