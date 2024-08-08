import React, {useEffect} from 'react';
import Navbar from './navbar';
import VantaBirds from './hero';
import AboutUs from './aboutUs';
import Footer from './footer';
import aos from 'aos';
import 'aos/dist/aos.css';
import Features from './features';
import { SmoothScrollHero } from './hero';
function Home() {
  useEffect(()=>{
    aos.init();
  }, [])
  return (
    <div>
      <SmoothScrollHero />
    </div>
  );
}

export default Home;
