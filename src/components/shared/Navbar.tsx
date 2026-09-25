"use client";

import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from '@/assets/logo.png'

const Navbar = () => {

    const pathname = usePathname();

    const [planCount, setPlanCount] = useState(0);
    const [savedCount, setSavedCount] = useState(0);

    const updateCounts = () => {

        const todayPlan = JSON.parse(
            localStorage.getItem("todayPlan") || "[]"
        );

        const savedPlan = JSON.parse(
            localStorage.getItem("savedPlan") || "[]"
        );

        setPlanCount(todayPlan.length);
        setSavedCount(savedPlan.length);
    };

    useEffect(() => {

        // Page load হলে count নেওয়া
        updateCounts();

        // Same tab থেকে update হলে
        const handleFitlogUpdate = (event: Event) => {

            const customEvent = event as CustomEvent;

            if (customEvent.detail) {

                setPlanCount(customEvent.detail.planCount);
                setSavedCount(customEvent.detail.savedCount);

            } else {

                updateCounts();

            }
        };

        window.addEventListener(
            "fitlog-update",
            handleFitlogUpdate
        );

        return () => {

            window.removeEventListener(
                "fitlog-update",
                handleFitlogUpdate
            );

        };

    }, []);

    const links = <>
        <li>
            <Link
                href="/#library"
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                    pathname === "/"
                        ? "bg-[#1E2A1A] text-[#C2F800]"
                        : "text-[#9CA3AF] hover:text-white"
                }`}
            >
                Workout
            </Link>
        </li>

        <li>
            <Link
                href="/my-plan"
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                    pathname === "/my-plan"
                        ? "bg-[#1E2A1A] text-[#C2F800]"
                        : "text-[#9CA3AF] hover:text-white"
                }`}
            >
                My Plan
            </Link>
        </li>
    </>;

    const countLinks = (
        <div className='flex items-center gap-4'>

            <Link
                href="/my-plan"
                className='flex items-center gap-2 text-xs font-medium text-[#9CA3AF]'
            >
                Plan
                <span className='bg-[#C2F800] text-black rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold'>
                    {planCount}
                </span>
            </Link>

            <Link
                href="/my-plan"
                className='flex items-center gap-2 text-xs font-medium text-[#9CA3AF]'
            >
                Saved
                <span className='bg-[#343943] text-[#9CA3AF] rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold'>
                    {savedCount}
                </span>
            </Link>

        </div>
    );

    return (
        <div className="navbar bg-[#0C0D10] shadow-sm px-6">

            <div className="navbar-start">

                <div className="dropdown">

                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost lg:hidden"
                    >

                        <svg
                            aria-label="Menu"
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >

                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />

                        </svg>

                    </div>

                    <ul
                        tabIndex={-1}
                        className="menu menu-sm dropdown-content bg-[#15171D] rounded-box z-1 mt-3 w-52 p-2 shadow"
                    >
                        {links}
                    </ul>

                </div>

                <Link
                    href="/"
                    className="flex items-center gap-2 font-bold text-lg text-[#FFFFFF]"
                >

                    <Image
                        src={logo}
                        alt="Fitlog Logo"
                        width={32}
                        height={32}
                    />

                    <h1>FITLOG</h1>

                </Link>

            </div>

            <div className="navbar-center hidden lg:flex">

                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>

            </div>

            <div className="navbar-end">

                {countLinks}

            </div>

        </div>
    );
};

export default Navbar;