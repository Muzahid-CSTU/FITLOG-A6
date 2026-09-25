import React from 'react';
import Banner from "@/components/HomePage/Banner"
import Library from "@/components/HomePage/Library"

const page = () => {
  return (
    <div className='py-12 px-6'>
      <Banner></Banner>
      <Library></Library>
    </div>
  );
};

export default page;