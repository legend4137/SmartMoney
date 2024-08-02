
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavbarDemo from '../navbar-demo'; // Ensure the path is correct
import PlanCard from './WalletCard';
import GaugeComponent from 'react-gauge-component';
import './dashboard.css';

const apiUrl = 'http://localhost:12000/health-rec';



function Dashboard() {

  const userName = sessionStorage.getItem("username");
  

  const [data, setData] = useState({
    healthscore:0,
  });

  useEffect(() => {

    const fetchData = async () => {
      try {
        console.log(`Fetching data for userNameee: ${userName}`); // Log userName
        const response = await axios.get(`http://localhost:12000/get_account`, {
          params: {userName} // Use axios params for query strings
        });
        console.log(response); // Log API response data

        setData({
          healthscore : response.data.data.healthScore
        });
      } catch (error) {
        console.error('Error fetching wallet data:', error);
      }
    };

    fetchData();
  }, [userName]);
    
  
  // const [userName, setUserName] = useState(sessionStorage.getItem('username'));
  // const [healthscore, setHealthscore] = useState(0); // State to store healthscore

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       console.log(`Fetching data for userName: ${userName}`); // Log userName
  //       const response = await axios.get(`http://localhost:12000/health-rec`, {
  //         params: { userName } // Use axios params for query strings
  //       });
  //       setHealthscore(response.data.number); // Set healthscore state
  //       console.log('Response data:', response.data.number); // Log API response data
  //     } catch (error) {
  //       console.error('Error fetching wallet data:', error);
  //     }
  //   };

  //   fetchData();
  // }, [userName]);

  return (
    <div className="dashboard">
      <div className="navbar-container">
        <Navbar />
      </div>
      <section className="bg-white dark:bg-gray-900 pt-32">
    <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <h1 className="mb-4 text-3xl font-bold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Hi {userName}!
        </h1>
        <div className="flex justify-center">
            <div className='load'>
            <img className='w-64 max-w-xs pt-4 pb-8 z-200' src="/sample_logo.png" alt="Sample Logo" />
            </div>
        </div>
        <p className="mb-8 mt-8 text-2xl font-bold text-gray-500 lg:text-xl sm:px-16 xl:px-28 dark:text-gray-400">
            Welcome to SmartMoney
        </p>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-28 dark:text-gray-400">
            Here we give you financial advice based on your earning and expense so that you may enjoy your life happily. We hope our product helps you in a good way.
        </p>
    </div>
    </section>

      <section className="bg-white dark:bg-gray-900">
        <div className="gap-8 items-center mt-0 py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
          <img
            className="w-full dark:hidden"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup.svg"
            alt="dashboard image"
          />
          <PlanCard userName='TestData' />
          <div className="mt-4 md:mt-0">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Wallet
            </h2>
            <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">
              This feature looks upon your log book, tracks the expense. If you want to edit this just click the open wallet feature to redirect to the wallet page to get your wallet updated.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-white dark:bg-gray-900">
        <div className="gap-8 items-center mt-8 py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
          <img
            className="w-full dark:hidden"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup.svg"
            alt="dashboard image"
          />
          <div className="mt-4 md:mt-0">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Health Score
            </h2>
            <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">
              Checkout your health score here based on the responses you gave to us. Also below are some of the comments based on the health score.
            </p>
          </div>
          
          <GaugeComponent
  type="semicircle"
  arc={{
    colorArray: ['#FF2121', '#00FF15'],
    padding: 0.02,
    subArcs:
      [
        { limit: 30 },
        { limit: 40 },
        { limit: 60 },
        {},
        {},
        {},
        {}
      ]
  }}
  pointer={{type: "blob", animationDelay: 0 }}
  value={data.healthscore}
/>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
