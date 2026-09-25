"use client";

import React, { useState } from "react";

const WorkoutActions = ({ workout }: { workout: any }) => {

    const [toast, setToast] = useState("");

    const showToast = (message: string) => {

        setToast(message);

        setTimeout(() => {
            setToast("");
        }, 2500);

    };

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

    const addToPlan = () => {

        const oldPlan = JSON.parse(
            localStorage.getItem("todayPlan") || "[]"
        );

        const oldSaved = JSON.parse(
            localStorage.getItem("savedPlan") || "[]"
        );

        if (oldPlan.length >= 5) {

            showToast(
                "Today's plan is full. Maximum 5 lifts."
            );

            return;
        }

        const alreadyAdded = oldPlan.some(
            (item: any) => item.id === workout.id
        );

        if (alreadyAdded) {

            showToast(
                "Workout is already in today's plan."
            );

            return;
        }

        const updatedPlan = [
            ...oldPlan,
            workout
        ];

        localStorage.setItem(
            "todayPlan",
            JSON.stringify(updatedPlan)
        );

        // Navbar immediately update
        updateNavbar(
            updatedPlan.length,
            oldSaved.length
        );

        showToast(
            "Added to today's plan"
        );
    };

    const saveForLater = () => {

        const oldPlan = JSON.parse(
            localStorage.getItem("todayPlan") || "[]"
        );

        const oldSaved = JSON.parse(
            localStorage.getItem("savedPlan") || "[]"
        );

        const alreadySaved = oldSaved.some(
            (item: any) => item.id === workout.id
        );

        if (alreadySaved) {

            showToast(
                "Workout is already saved."
            );

            return;
        }

        const updatedSaved = [
            ...oldSaved,
            workout
        ];

        localStorage.setItem(
            "savedPlan",
            JSON.stringify(updatedSaved)
        );

        // Navbar immediately update
        updateNavbar(
            oldPlan.length,
            updatedSaved.length
        );

        showToast(
            "Saved for later"
        );
    };

    return (
        <>

            <div className='flex flex-wrap gap-3 mt-6'>

                <button
                    onClick={addToPlan}
                    className='bg-[#C2F800] hover:bg-[#b7ed00] text-black font-bold text-xs px-5 py-3 rounded-lg'
                >
                    ✓ Add to today's plan
                </button>

                <button
                    onClick={saveForLater}
                    className='border border-[#343943] hover:bg-[#1D2027] text-white font-bold text-xs px-5 py-3 rounded-lg'
                >
                    ♡ Save for later
                </button>

            </div>

            {toast && (

                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">

                    <div className="bg-[#C2F800] text-black font-bold text-xs px-5 py-3 rounded-lg shadow-lg">

                        {toast}

                    </div>

                </div>

            )}

        </>
    );
};

export default WorkoutActions;