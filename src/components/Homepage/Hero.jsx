import React from 'react';
import Typed from 'react-typed';
import { HashLink } from 'react-router-hash-link';


const Hero = () => {
  return (
    <div className='text-white' >
      <div className='bg-opacity-90 max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center' >
        <p className='text-[#00df9a] font-bold p-2'>
          SOLUTION FOR CO2 EMISSION WITH DATA ANALYTICS
        </p>
        <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>
          Daily Carbon Netutrality
        </h1>
        <div className='flex justify-center items-center'>
          <p className='md:text-5xl sm:text-4xl text-xl font-bold py-4'>
            Protect our 
          </p>
          <Typed
          className='md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2'
            strings={["Forests", "Oceans", "Biodiversity", 'Health']}
            typeSpeed={120}
            backSpeed={80}
            loop
          />
        </div>
        <p className='md:text-2xl text-xl font-bold text-gray-500'>Monitor your data analytics to increase revenue for BTB, BTC, & SASS platforms.</p>
        <HashLink smooth to="/#cards" className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black hover:scale-150 duration-300'>Get Started</HashLink>
      </div>
    </div>
  );
};

export default Hero;
