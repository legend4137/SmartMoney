import React, {useEffect} from 'react';
import Navbar from './navbar';
import HeroSection from './hero';
import ContentSection from './aboutUs';
import aos from 'aos';
import 'aos/dist/aos.css';
import Features from './feature';
import Footer from './footer';
import { SmoothScrollHero } from './hero';
function Home() {
  useEffect(()=>{
    aos.init();
  }, [])
  return (
    <div>
      <HeroSection/>
      <ContentSection />
      <Features/>
      <Footer/>
    </div>
  );
}

export default Home;
