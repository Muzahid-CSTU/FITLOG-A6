import React from 'react';
import WorkoutCard from '../shared/WorkoutCard';

const Library = async () => {

    const res = await fetch('https://api.abcz.workers.dev/api/fitlog');
    const workouts = await res.json();

    return (
        <div className='my-16'>
            <div>
                <h1 className='text-[#FFFFFF] text-3xl font-bold'>
                    THE LIBRARY
                </h1>

                <p className='text-[#9CA3AF] text-sm font-normal'>
                    Twelve lifts covering every major muscle group.
                </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8'>
                {
                    workouts.map((workout: any) => (
                        <WorkoutCard
                            key={workout.id}
                            workout={workout}
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default Library;