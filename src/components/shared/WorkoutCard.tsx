import React from 'react';
import Image from "next/image";
import Link from "next/link";

const WorkoutCard = ({ workout }: any) => {
    return (
        <Link  href={`/workout/${workout.id}`}>
            <div className='bg-[#15171D] border border-[#222630] rounded-3xl overflow-hidden w-full'>
                <div className='w-full h-67.5'>
                    <Image
                        src={workout.image}
                        alt={workout.name}
                        width={740}
                        height={740}
                        className='w-full h-full object-cover'
                    />
                </div>
                <div className='p-8'>
                    <div className='flex flex-wrap gap-3 mb-6'>
                        {
                            workout.muscleGroups.map((muscle: string) => (
                                <span
                                    key={muscle}
                                    className='bg-[#C2F800] text-black font-bold text-base px-4 py-1 rounded-full'
                                >
                                    {muscle.toUpperCase()}
                                </span>
                            ))
                        }
                    </div>
                    <h2 className='text-white font-extrabold text-2xl leading-tight'>
                        {workout.name.toUpperCase()}
                    </h2>
                    <p className='text-[#9CA3AF] text-lg mt-2'>
                        {workout.equipment}
                    </p>
                    <div className='border-t border-[#282C35] my-6'></div>
                    <div className='flex items-center gap-5 text-[#9CA3AF] text-base'>
                        <div className='flex items-center gap-2'>
                            <span className='text-xl'>◷</span>
                            <span>{workout.duration} min</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <span className='text-xl'>♟</span>
                            <span>{workout.caloriesBurned} kcal</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <span className='text-xl'>☆</span>
                            <span>{workout.rating}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
        
    );
};

export default WorkoutCard;