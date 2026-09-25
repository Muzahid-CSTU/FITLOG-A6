import React from 'react';
import Image from "next/image";
import banner from "@/assets/banner.png"

const Banner = () => {
    return (
        <div>
            <div className='bg-[#15171D] border border-[#222630] rounded-2xl md:flex justify-between items-center px-8 md:px-14 py-8 md:py-9'>

                <div className='w-full md:w-[52%] flex flex-col gap-4'>

                    <div className='text-[#C2F800] font-bold text-[9px]'>
                        <p>WORKOUT LIBRARY</p>
                    </div>

                    <div className='text-[#FFFFFF] font-extrabold text-4xl md:text-[40px] leading-[0.95]'>
                        <h1>
                            TRAIN WITH INTENT. LOG EVERY SET.
                        </h1>
                    </div>

                    <div className='font-normal text-[11px] md:text-xs text-[#9CA3AF] leading-relaxed max-w-[430px]'>
                        <p>
                            FitLog is a dark, no-nonsense gym companion: pick a lift,
                            lock it into today's plan, and watch the week's work add up.
                        </p>
                    </div>

                    <div>
                        <button className='btn bg-[#C2F800] hover:bg-[#C2F800] text-black border-none rounded-md px-4 h-7 min-h-7 font-bold text-[8px]'>
                            BROWSE WORKOUTS
                        </button>
                    </div>

                </div>

                <div className='md:flex w-[40%] justify-end'>
                    <Image
                        src={banner}
                        alt="Banner image"
                        className='w-55 h-55 object-contain transition duration-500 hover:scale-105'
                    />
                </div>

            </div>
        </div>
    );
};

export default Banner;