import React, {useEffect} from 'react';
import Navbar from './navbar';
import VantaBirds from './hero';
import AboutUs from './aboutUs';
import Footer from './footer';
import styles from './Home.module.css';
import aos from 'aos';
import 'aos/dist/aos.css';

function Home() {
  useEffect(()=>{
    aos.init();
  }, [])
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.vantaContainer}>
        <VantaBirds />
      </div>
      <AboutUs />
      <Footer />
    </div>
  );
}

export default Home;