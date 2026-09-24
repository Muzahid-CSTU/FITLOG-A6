import React from 'react';
import Image from "next/image";
import banner from "@/assets/banner.png"

const Banner = () => {
    return (
        <div className='px-6'>
            <div className='bg-[#15171D] flex justify-between p-14'>
                <div className='h-75 w-150 '>
                    <p className='text-[#C2F800] font-bold text-[11px]'>WORKOUT LIBRARY</p>
                    <h1 className='text-[#FFFFFF] font-extrabold text-6xl'>TRAIN WITH INTENT. LOG EVERY SET.</h1>
                    <p>FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.</p>
                    <button>BROWSE WORKOUTS</button>
                </div>
                <div>
                    <Image src={banner} alt="Banner image" className="h-83.5 w-83.5 object-cover transition duration-500 hover:scale-105"/>
                </div>
            </div>
        </div>
        
    );
};

export default Banner;