import React from 'react';
import Navbar from './navbar';
import styles from './Home.module.css';

function Home() {
  return (
    <div>
      <Navbar /> {/* Include the Navbar component */}
      <div className={styles.body}>
        <p>This is the home page</p>
      </div>
    </div>
  )
}

export default Home
