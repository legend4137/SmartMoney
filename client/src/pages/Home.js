import React, {useEffect} from 'react';
import Navbar from './navbar';
import VantaBirds from './hero';
import AboutUs from './aboutUs';
import Footer from './footer';
import styles from './Home.module.css';
import aos from 'aos';
import 'aos/dist/aos.css';
import Features from './features';

function Home() {
  useEffect(()=>{
    aos.init();
  }, [])
  return (
    <div>
      <VantaBirds />
    <div className={styles.container}>
      <div className="flex justify-center" data-aos="zoom-in" data-aos-duration="3000" >
            <div className='load'>
              <img className='w-64 max-w-xs pt-4 pb-8 z-200' src="/sample_logo.png" alt="Sample Logo" />
            </div>
          </div>
      <div >
        <AboutUs />
        <Features />
      </div>
    </div></div>
  );
}

export default Home;