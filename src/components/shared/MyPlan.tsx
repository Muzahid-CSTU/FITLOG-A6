"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const MyPlan = () => {

    const [activeTab, setActiveTab] = useState("today");

    const [todayPlan, setTodayPlan] = useState<any[]>([]);

    const [savedPlan, setSavedPlan] = useState<any[]>([]);

    const [doneWorkouts, setDoneWorkouts] = useState<number[]>([]);

    const [toast, setToast] = useState("");

    const [loading, setLoading] = useState(true);


    const showToast = (message: string) => {

        setToast(message);

        setTimeout(() => {
            setToast("");
        }, 2500);

    };


    useEffect(() => {

        const todayData = JSON.parse(
            localStorage.getItem("todayPlan") || "[]"
        );

        const savedData = JSON.parse(
            localStorage.getItem("savedPlan") || "[]"
        );

        const doneData = JSON.parse(
            localStorage.getItem("doneWorkouts") || "[]"
        );

        setTodayPlan(todayData);

        setSavedPlan(savedData);

        setDoneWorkouts(doneData);

        setLoading(false);

    }, []);


    // Current tab er workouts
    const currentPlan =
        activeTab === "today"
            ? todayPlan
            : savedPlan;


    // Current tab er total minutes
    const totalMinutes = currentPlan.reduce(
        (total, workout) =>
            total + Number(workout.duration || 0),
        0
    );


    // Current tab er total calories
    const totalCalories = currentPlan.reduce(
        (total, workout) =>
            total + Number(workout.caloriesBurned || 0),
        0
    );


    const updateNavbar = (
        planCount: number,
        savedCount: number
    ) => {

        window.dispatchEvent(
            new CustomEvent("fitlog-update", {
                detail: {
                    planCount,
                    savedCount
                }
            })
        );

    };


    const removeWorkout = (id: number) => {

        let updatedPlan = todayPlan;

        let updatedSaved = savedPlan;


        if (activeTab === "today") {

            updatedPlan = todayPlan.filter(
                workout => workout.id !== id
            );

            setTodayPlan(updatedPlan);

            localStorage.setItem(
                "todayPlan",
                JSON.stringify(updatedPlan)
            );

        } else {

            updatedSaved = savedPlan.filter(
                workout => workout.id !== id
            );

            setSavedPlan(updatedSaved);

            localStorage.setItem(
                "savedPlan",
                JSON.stringify(updatedSaved)
            );

        }


        updateNavbar(
            updatedPlan.length,
            updatedSaved.length
        );


        showToast("Workout removed");

    };


    const markAsDone = (id: number) => {

        if (doneWorkouts.includes(id)) {
            return;
        }


        const updatedDone = [
            ...doneWorkouts,
            id
        ];


        setDoneWorkouts(updatedDone);


        localStorage.setItem(
            "doneWorkouts",
            JSON.stringify(updatedDone)
        );


        showToast("Workout marked as done");

    };


    return (

        <div className='min-h-screen bg-[#0F1014] text-white'>

            <div className='max-w-6xl mx-auto px-5 py-10'>


                {/* Header */}

                <div className='mb-8'>

                    <h1 className='text-3xl font-bold'>
                        MY PLAN
                    </h1>

                    <p className='text-[#737780] text-sm mt-1'>
                        Cap of five lifts for today. Finish them, then load more.
                    </p>

                </div>


                {/* Metrics */}

                <div className='grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6'>


                    {/* Exercises */}

                    <div className='bg-[#15171D] border border-[#222630] rounded-xl p-5'>

                        <p className='text-[#737780] text-xs'>
                            EXERCISES
                        </p>

                        <p className='text-[#C2F800] text-2xl font-bold'>
                            {currentPlan.length}
                        </p>

                    </div>


                    {/* Minutes */}

                    <div className='bg-[#15171D] border border-[#222630] rounded-xl p-5'>

                        <p className='text-[#737780] text-xs'>
                            MINUTES
                        </p>

                        <p className='text-white text-2xl font-bold'>
                            {totalMinutes}
                        </p>

                    </div>


                    {/* Calories */}

                    <div className='bg-[#15171D] border border-[#222630] rounded-xl p-5'>

                        <p className='text-[#737780] text-xs'>
                            CALORIES
                        </p>

                        <p className='text-white text-2xl font-bold'>
                            {totalCalories}
                        </p>

                    </div>


                </div>


                {/* Tabs */}

                <div className='flex gap-2 mb-5'>

                    <button
                        onClick={() => setActiveTab("today")}
                        className={`px-4 py-2 text-xs rounded-md ${
                            activeTab === "today"
                                ? "bg-[#C2F800] text-black font-bold"
                                : "bg-[#15171D] text-[#9CA3AF]"
                        }`}
                    >
                        Today's Plan
                    </button>


                    <button
                        onClick={() => setActiveTab("saved")}
                        className={`px-4 py-2 text-xs rounded-md ${
                            activeTab === "saved"
                                ? "bg-[#C2F800] text-black font-bold"
                                : "bg-[#15171D] text-[#9CA3AF]"
                        }`}
                    >
                        Saved
                    </button>

                </div>


                {/* Loading */}

                {loading && (

                    <div className='text-center py-20'>

                        <p className='text-[#9CA3AF] text-sm'>
                            Loading workouts...
                        </p>

                    </div>

                )}


                {/* Workout List */}

                {!loading && (

                    <div className='space-y-3'>

                        {currentPlan.map((workout) => {

                            const isDone =
                                doneWorkouts.includes(workout.id);


                            return (

                                <div
                                    key={workout.id}
                                    className={`bg-[#15171D] border border-[#222630] rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center gap-4 ${
                                        isDone
                                            ? "opacity-60"
                                            : ""
                                    }`}
                                >


                                    {/* Image */}

                                    <Image
                                        src={workout.image}
                                        alt={workout.name}
                                        width={100}
                                        height={70}
                                        className='w-full sm:w-24 h-20 object-cover rounded-lg'
                                    />


                                    {/* Information */}

                                    <div className='flex-1'>

                                        <h2
                                            className={`text-white font-bold text-sm ${
                                                isDone
                                                    ? "line-through"
                                                    : ""
                                            }`}
                                        >
                                            {workout.name.toUpperCase()}
                                        </h2>


                                        <p className='text-[#737780] text-xs mt-1'>
                                            {workout.equipment}
                                        </p>


                                        <p className='text-[#737780] text-xs mt-2'>

                                            {workout.duration} min

                                            {" • "}

                                            {workout.caloriesBurned} kcal

                                            {" • "}

                                            ★ {workout.rating}

                                        </p>

                                    </div>


                                    {/* Buttons */}

                                    <div className='flex flex-wrap gap-2'>

                                        <Link
                                            href={`/workout/${workout.id}`}
                                            className='border border-[#343943] text-[#9CA3AF] text-xs px-3 py-2 rounded-md'
                                        >
                                            View Details
                                        </Link>


                                        {activeTab === "today" && (

                                            <button
                                                onClick={() =>
                                                    markAsDone(workout.id)
                                                }
                                                disabled={isDone}
                                                className={`text-xs font-bold px-3 py-2 rounded-md ${
                                                    isDone
                                                        ? "bg-[#343943] text-[#9CA3AF]"
                                                        : "bg-[#C2F800] text-black"
                                                }`}
                                            >

                                                {isDone
                                                    ? "✓ Done"
                                                    : "✓ Mark as Done"}

                                            </button>

                                        )}


                                        <button
                                            onClick={() =>
                                                removeWorkout(workout.id)
                                            }
                                            className='text-[#9CA3AF] hover:text-white text-xl px-2'
                                        >
                                            ×
                                        </button>

                                    </div>

                                </div>

                            );

                        })}

                    </div>

                )}


                {/* Empty State */}

                {!loading && currentPlan.length === 0 && (

                    <div className='text-center py-20'>

                        <h2 className='text-white font-bold text-lg'>
                            NOTHING HERE YET
                        </h2>

                        <p className='text-[#737780] text-sm mt-2'>
                            Browse the library and add a lift to get today moving.
                        </p>

                        <Link
                            href='/#library'
                            className='inline-block bg-[#C2F800] text-black font-bold text-xs px-5 py-3 rounded-lg mt-5'
                        >
                            GO TO WORKOUTS
                        </Link>

                    </div>

                )}

            </div>


            {/* Toast */}

            {toast && (

                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">

                    <div className="bg-[#C2F800] text-black font-bold text-xs px-5 py-3 rounded-lg shadow-lg">

                        {toast}

                    </div>

                </div>

            )}

        </div>

    );

};

export default MyPlan;