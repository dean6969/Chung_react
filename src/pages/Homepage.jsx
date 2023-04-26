import React from 'react';
import Cards from '../components/Homepage/Cards';
import Footer from '../components/Homepage/Footer';
import Hero from '../components/Homepage/Hero';
import Navbar from '../components/Homepage/Navbar';

function Homepage() {
  return (
    <div>
      <Navbar />
      <Hero />
      {/* <Analytics />
      <Newsletter /> */}
      <Cards/>
      <Footer />
    </div>
  );
}

export default Homepage;
