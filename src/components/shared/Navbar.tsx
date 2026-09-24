import React from 'react';
import Image from "next/image";
import logo from '@/assets/logo.png'

const navbar = () => {
    const links = <>
        <li className='text-[#9CA3AF]'><a>Workout</a></li>
        <li className='text-[#9CA3AF]'><a>My Plan</a></li>
    </>
    const countLinks = <div className='grid grid-cols-2 text-[#9CA3AF]'>
        <div>
            <h2>Plan 0</h2>
        </div>
        <div>
            <h2>Saved 0</h2>
        </div>
    </div>
    return (
        <div className="navbar bg-[#0C0D10] shadow-sm px-6 ">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg aria-label="Menu" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={-1}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <div className="grid grid-cols-2 font-bold text-lg text-[#FFFFFF]">
                    <Image src={logo} alt="Fotlog Logo" />
                    <h1>FITLOG</h1>
                </div>
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

export default navbar;