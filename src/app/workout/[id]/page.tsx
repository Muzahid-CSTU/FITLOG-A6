import React from 'react';
import Image from "next/image";
import Link from "next/link";
import WorkoutActions from "@/components/shared/WorkoutActions";

const WorkoutDetailsPage = async ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {

    const { id } = await params;

    const res = await fetch(
        `https://api.abcz.workers.dev/api/fitlog/${id}`
    );

    if (!res.ok) {
        return <div>Workout not found</div>;
    }

    const workout = await res.json();

    return (
        <div className='bg-[#0F1014] min-h-screen text-white'>

            <div className='max-w-6xl mx-auto px-4 md:px-8 py-8'>

                {/* Back Button */}
                <Link
                    href="/"
                    className='text-[#9CA3AF] text-sm hover:text-white'
                >
                    ← Back to workouts
                </Link>


                {/* Main Content */}
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6'>

                    {/* LEFT - IMAGE */}
                    <div className='bg-[#15171D] border border-[#222630] rounded-2xl overflow-hidden'>
                        <Image
                            src={workout.image}
                            alt={workout.name}
                            width={800}
                            height={800}
                            className='w-full h-full object-cover'
                        />
                    </div>


                    {/* RIGHT - DETAILS */}
                    <div>

                        {/* Title */}
                        <h1 className='text-white text-3xl md:text-4xl font-extrabold'>
                            {workout.name.toUpperCase()}
                        </h1>


                        {/* Description */}
                        <p className='text-[#9CA3AF] text-sm mt-3 leading-relaxed'>
                            {workout.description}
                        </p>


                        {/* Categories */}
                        <div className='flex flex-wrap gap-2 mt-4'>

                            {workout.muscleGroups.map((muscle: string) => (
                                <span
                                    key={muscle}
                                    className='bg-[#C2F800] text-black font-bold text-xs px-3 py-1 rounded-full'
                                >
                                    {muscle.toUpperCase()}
                                </span>
                            ))}

                        </div>


                        {/* Key Specs */}
                        <div className='bg-[#15171D] border border-[#222630] rounded-xl mt-5 p-5'>

                            <div className='flex justify-between py-2 border-b border-[#222630]'>
                                <span className='text-[#737780] text-xs'>
                                    EQUIPMENT
                                </span>
                                <span className='text-white text-xs'>
                                    {workout.equipment}
                                </span>
                            </div>


                            <div className='flex justify-between py-2 border-b border-[#222630]'>
                                <span className='text-[#737780] text-xs'>
                                    DIFFICULTY
                                </span>
                                <span className='text-white text-xs'>
                                    {workout.difficulty}
                                </span>
                            </div>


                            <div className='flex justify-between py-2 border-b border-[#222630]'>
                                <span className='text-[#737780] text-xs'>
                                    SETS
                                </span>
                                <span className='text-white text-xs'>
                                    {workout.sets}
                                </span>
                            </div>


                            <div className='flex justify-between py-2 border-b border-[#222630]'>
                                <span className='text-[#737780] text-xs'>
                                    REPS
                                </span>
                                <span className='text-white text-xs'>
                                    {workout.reps}
                                </span>
                            </div>


                            <div className='flex justify-between py-2 border-b border-[#222630]'>
                                <span className='text-[#737780] text-xs'>
                                    DURATION
                                </span>
                                <span className='text-white text-xs'>
                                    {workout.duration} min
                                </span>
                            </div>


                            <div className='flex justify-between py-2 border-b border-[#222630]'>
                                <span className='text-[#737780] text-xs'>
                                    CALORIES
                                </span>
                                <span className='text-white text-xs'>
                                    {workout.caloriesBurned} kcal
                                </span>
                            </div>


                            <div className='flex justify-between pt-2'>
                                <span className='text-[#737780] text-xs'>
                                    RATING
                                </span>
                                <span className='text-white text-xs'>
                                    {workout.rating}
                                </span>
                            </div>

                        </div>


                        {/* Instructions */}
                        <div className='mt-6'>

                            <h2 className='text-white text-sm font-bold'>
                                INSTRUCTIONS
                            </h2>

                            <ol className='mt-3 space-y-3'>

                                {workout.instructions.map(
                                    (instruction: string, index: number) => (

                                        <li
                                            key={index}
                                            className='flex gap-3 text-[#9CA3AF] text-xs'
                                        >
                                            <span className='text-[#C2F800] font-bold'>
                                                {index + 1}.
                                            </span>

                                            <span>
                                                {instruction}
                                            </span>
                                        </li>

                                    )
                                )}

                            </ol>

                        </div>


                        {/* Buttons */}
                        <WorkoutActions workout={workout} />

                    </div>

                </div>

            </div>

        </div>
    );
};

export default WorkoutDetailsPage;