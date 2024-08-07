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
      {/* <VantaBirds />
      <div className="flex justify-center" data-aos="zoom-in" data-aos-duration="3000" >
        <div>
        <img className='w-64 max-w-xs pt-50vh pb-8 z-200 ' src="/sample_logo.png" alt="Sample Logo" />
        </div>
      </div>
      <div className =" mt-20vh bg-[#07192f]">
        <AboutUs />
        <Features />
      </div> */}
      <SmoothScrollHero />
    </div>
  );
}

export default Home;
