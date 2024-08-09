import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PlanCard from './WalletCard';
import GaugeComponent from 'react-gauge-component';
import './dashboard.module.css';
// import Navbar from './navbar';
import ChatPopup from './ChatPopup';
import Graph from './Graph';
import TodoList from './GoalComponent';
import ReadOnlyTodoList from './DashboardGoal';
// import Footer from './footer';

const apiUrl = 'http://localhost:12000/health-rec';

function Dashboard() {
  const userName = localStorage.getItem("username");

  const [data, setData] = useState({
    healthscore: 0,
    alert1: "",
    alert2: "",
    alert3: ""
  });

  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(`Fetching data for userNameee: ${userName}`); // Log userName
        const response = await axios.get('http://localhost:12000/get_account', {
          params: { userName } // Use axios params for query strings
        });
        console.log(response); // Log API response data

        setData({
          healthscore: response.data.data.healthScore,
          alert1: response.data.data.alert1,
          alert2: response.data.data.alert2,
          alert3: response.data.data.alert3
        });
        console.log("hi");
        
        console.log("hi");
        
      } catch (error) {
        console.error('Error fetching wallet data:', error);
      }
    };

    fetchData();
  }, [userName]);

  return (
    <div className="dashboard">
      <div className="navbar-container">
      </div>
      <section className="bg-white bg-zinc-950 pt-32">
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

      <section className="bg-white bg-zinc-950">
        <div className="gap-8 items-center mt-0 py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
          <PlanCard userName={userName} />
          <ReadOnlyTodoList/>
          <div className="mt-4 md:mt-0">
            <Graph />
          </div>
        </div>
      </section>
      <section className="bg-white bg-zinc-950">
        <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
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
              subArcs: [
                { limit: 30 },
                { limit: 40 },
                { limit: 60 },
                {},
                {},
                {},
                {}
              ]
            }}
            pointer={{ type: "blob", animationDelay: 0 }}
            value={data.healthscore}
          />

          <div class="flex items-center p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
            <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
            </svg>
            <span class="sr-only">Info</span>
            <div>
              <ul></ul>
              <span class="font-medium">
                <ul>
                  <li>{data.alert1}</li>
                  <li>{data.alert2}</li>
                  <li>{data.alert3}</li>
                </ul>
              </span>
            </div>
          </div>

        </div>
      </section>

      <ChatPopup />
    </div>
  );
}

export default Dashboard;
