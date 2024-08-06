import React, {useEffect} from 'react';
import Navbar from './navbar';
import VantaBirds from './hero';
import AboutUs from './aboutUs';
import Footer from './footer';
import styles from './home.module.css';
import aos from 'aos';
import 'aos/dist/aos.css';

function Home() {
  useEffect(()=>{
    aos.init();
  }, [])
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.content}>
        <VantaBirds />
        <AboutUs />
      </div>
      <div data-aos="fade-right" data-aos-duration="3000">
        Health Score: Checkout your health score here based on the responses you gave to us. Also below are some of the comments based on the health score.
        </div>
          


        <div className={styles.features} data-aos="fade-right" data-aos-duration="3000">
        : Checkout your health score here based on the responses you gave to us. Also below are some of the comments based on the health score.
        </div>
        <div className={styles.features} data-aos="fade-right" data-aos-duration="3000">
        Health Score: Checkout your health score here based on the responses you gave to us. Also below are some of the comments based on the health score.
        </div>
        <div className={styles.features} data-aos="fade-right" data-aos-duration="3000">
        Health Score: Checkout your health score here based on the responses you gave to us. Also below are some of the comments based on the health score.
        </div>
      <Footer />
    </div>
  );
}

export default Home;
