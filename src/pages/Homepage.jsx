import React from 'react';
import Cards from '../components/home/Cards';
import Footer from '../components/common/Footer';
import Hero from '../components/home/Hero';
import Navbar from '../components/common/Navbar';

function Homepage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Cards />
      <Footer />
    </>
  );
}

export default Homepage;
