"use client";

import { useEffect, useState, useRef } from "react";
import { P2Pdata } from "../../types/P2Pdata";
import Image from "next/image";
import AnimatedLeftArrows from '../../../public/rebet-assets/AnimatedAssets/glowing_left_arrows.json';
import AnimatedRightArrows from '../../../public/rebet-assets/AnimatedAssets/glowing_right_arrows.json';
import Lottie from "lottie-react";

export default function P2Pslider() {
   const [p2pData, setP2pData] = useState<P2Pdata | null>(null);
   const sliderRef =  useRef<HTMLDivElement>(null);;  
   const buttonRef = useRef<HTMLDivElement>(null); 
   const [isDragging, setIsDragging] = useState(false);
   const [position, setPosition] = useState(0); 
   const [startX, setStartX] = useState(0); 
   const [sliderColor, setSliderColor] = useState("orange");


   const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      setIsDragging(true);
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      setStartX(clientX - position); 
   };

   const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
      if (!isDragging || !sliderRef.current || !buttonRef.current) return;

      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const newX = clientX - startX;
      const maxDrag = 200;
      const constrainedX = Math.max(-maxDrag, Math.min(maxDrag, newX));

      setPosition(constrainedX);

      if (constrainedX > 10) {
         setSliderColor("green"); 
      } else if (constrainedX < -10) {
         setSliderColor("red"); 
      } else {
         setSliderColor("orange"); 
      }
   };

   const handleDragEnd = () => {
      setIsDragging(false);
      const maxDrag = 175; 
      if (position >= maxDrag) {
         console.log("Accepted");
      } else if (position <= -maxDrag) {
         console.log("Declined");
      }
      setPosition(0);
      setSliderColor("orange"); 
   };

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


   const leftArrowImageSrc = sliderColor === "red" ? "/rebet-assets/StaticAssets/red_left_arrows.png" : sliderColor === "green" ? "/rebet-assets/StaticAssets/green_left_arrows.png" : "/rebet-assets/StaticAssets/orange_left_arrows.png"
   const rightArrowImageSrc = sliderColor === "red" ? "/rebet-assets/StaticAssets/red_right_arrows.png" : sliderColor === "green" ? "/rebet-assets/StaticAssets/green_right_arrows.png" : "/rebet-assets/StaticAssets/orange_right_arrows.png"
   const closeImageSrc = sliderColor === "red" ? "/rebet-assets/StaticAssets/red_close.png" : sliderColor === "green" ? "/rebet-assets/StaticAssets/green_close.png" : "/rebet-assets/StaticAssets/white_close.png"
   const checkImageSrc = sliderColor === "red" ? "/rebet-assets/StaticAssets/red_check.png" : sliderColor === "green" ? "/rebet-assets/StaticAssets/green_check.png" : "/rebet-assets/StaticAssets/white_check.png"
   const orbImageSrc = sliderColor === "red" ? "/rebet-assets/StaticAssets/red_button.png" : sliderColor === "green" ? "/rebet-assets/StaticAssets/green_button.png" : "/rebet-assets/StaticAssets/orange_button.png"

   return (
      <div className="p2p-component max-w-[500px] mx-auto my-0 mt-8">
         <div className={`p2p-component__inner relative rounded-[24px] overflow-hidden effect-border--${sliderColor}`}>


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
                     <div className="bet-line relative mt-9 py-1.5 px-10 sm:px-[48px] bg-[rgba(20,20,27,0.5)]  rounded-[12px]">
                        <p className="text-[13px]">{p2pData.received_by.bet_type}</p>
                        <p className="text-[#FD6F27] text-[14px]">{p2pData.received_by.line}</p>
                     </div>
                  </div>
               </div>


               <div className="flex justify-between mt-6 px-0 max-w-[425px] mx-auto"> 
                  <div className="flex flex-col items-start w-[42%]">
                     <div className="flex items-center w-full mb-2 justify-between">
                        <p className="font-extralight uppercase text-[10px] sm:text-[12px]">Bet Amount</p>
                        <div className="flex items-center">
                           <p className="text-[12px] sm:text-[16px]">{p2pData.created_by.bet_amount}.00</p>
                           <Image src="/rebet-assets/StaticAssets/rebet-cash.webp" alt="cash icon"  className="ml-2 h-[17px]" width={17} height={17} />
                        </div>
                     </div>
                     <div className="flex items-center w-full justify-between">
                        <p className="font-extralight uppercase text-[10px] sm:text-[12px]">Payout</p>
                        <div className="flex items-center">
                           <p className="text-[12px] sm:text-[16px]">{p2pData.created_by.bet_payout}.00</p>
                           <Image src="/rebet-assets/StaticAssets/rebet-cash.webp" className="ml-2 h-[17px]" alt="cash icon" width={17} height={17} />
                        </div>
                     </div>
                  </div>
                  <div className="h-[52px] w-[2px] bg-[rgba(250,249,246,0.1)]"></div>
                  <div className="flex flex-col items-end w-[42%]">
                     <div className="flex flex-row-reverse items-center mb-2 w-full justify-between">
                        <p className="font-extralight uppercase text-[10px] sm:text-[12px]">Bet Amount</p>
                        <div className="flex items-center">
                           <p className="text-[12px] sm:text-[16px]">{p2pData.received_by.bet_amount}.00</p>
                           <Image src="/rebet-assets/StaticAssets/rebet-cash.webp" className="ml-2 h-[17px]" alt="cash icon" width={17} height={17} />
                        </div>
                     </div>
                     <div className="flex flex-row-reverse items-center w-full justify-between">
                        <p className="font-extralight uppercase text-[10px] sm:text-[12px]">Payout</p>
                        <div className="flex items-center">
                           <p className="text-[12px] sm:text-[16px]">{p2pData.received_by.bet_payout}.00</p>
                           <Image src="/rebet-assets/StaticAssets/rebet-cash.webp" className="ml-2 h-[17px]" alt="cash icon" width={17} height={17} />
                        </div>
                     </div>
                  </div>
               </div>

               <div       
                  ref={sliderRef}
                  onMouseMove={handleDragMove}
                  onTouchMove={handleDragMove}
                  onMouseUp={handleDragEnd}
                  onTouchEnd={handleDragEnd}
                  onMouseLeave={handleDragEnd} 
                  className={`orb-slider effect--${sliderColor} relative flex items-center justify-around bg-[rgba(20,20,27,0.5)] h-[83px] px-2 rounded-[28px] mt-6 mb-3 overflow-hidden`}
               >
                  <div className="flex items-center">
                     <Image src={closeImageSrc} className="h-[20px] sm:h-[35px] w-[20px] sm:w-[35px] mb-sm-hide" alt="" width={35} height={35}   />
                     <p className="text-[12px] sm:text-[16px] font-semibold ml-1">Decline</p>
                  </div>
                  <div className="flex items-center relative">
                     <Image src={leftArrowImageSrc} className={`h-[40px] absolute -left-[20px] ${isDragging ? "block" : "hidden"}`} alt="" width={65} height={45}  />
                     <Lottie
                        animationData={AnimatedLeftArrows}
                        loop={true}
                        className={`h-[40px] w-[65px] absolute -left-[20px] ${isDragging ? "hidden" : "block"}`}
                     />
                     <div
                        ref={buttonRef}
                        className={`relative -top-[2.5px] cursor-grab active:cursor-grabbing w-[150px] h-[150px] ${
                           isDragging ? "" : "transition-transform duration-300 ease-out"
                        }`}
                        style={{ transform: `translateX(${position}px)` }}
                        onMouseDown={handleDragStart}
                        onTouchStart={handleDragStart}
                     >
                        <Image
                           src={orbImageSrc}
                           alt="Draggable orb"
                           width={150}
                           height={150}
                           className="relative -bottom-[10px]"
                        />
                     </div>              
                     <Image src={rightArrowImageSrc} className={`h-[40px] absolute -right-[20px] ${isDragging ? "block" : "hidden"}`} alt="" width={65} height={45}  />
                      <Lottie
                        animationData={AnimatedRightArrows}
                        loop={true}
                        className={`h-[40px] w-[65px] absolute -right-[20px] ${isDragging ? "hidden" : "block"}`}
                     />
                  </div>
                  <div className="flex items-center"> 
                     <p className="text-[12px] sm:text-[16px] font-semibold mr-1">Accept</p>
                     <Image src={checkImageSrc} className="h-[20px] sm:h-[35px] w-[20px] sm:w-[35px] mb-sm-hide" alt="" width={35} height={35}  />
                  </div>
               </div>

               
            </div>
         </div>
      </div>
   );
}
