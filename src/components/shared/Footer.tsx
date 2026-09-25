import React from 'react';
import Image from "next/image";
import logo from '@/assets/logo.png'

const Footer = () => {
    return (
        <div className='bg-[#090A0D] border-1px border-[#1A1D24] py-10'>
            <div className=' flex justify-between px-6'>
                <div className="grid grid-cols-2 font-bold text-lg text-[#FFFFFF]">
                        <Image src={logo} alt="Fotlog Logo" />
                        <h1>FITLOG</h1>
                </div>
                <div className='font-normal text-[11px] md:text-xs text-[#9CA3AF]'>
                    <p>© 2026 FitLog — Workout Library. Train hard, log honest.</p>
                </div>
            </div>
        </div>
        
    );
};

export default Footer;