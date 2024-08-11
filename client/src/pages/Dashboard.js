import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PlanCard from './WalletCard';
import GaugeComponent from 'react-gauge-component';
import './dashboard.module.css';
// import Navbar from './navbar';
import ChatPopup from './ChatPopup';
import Graph from './Graph';
import ReadOnlyTodoList from './DashboardGoal';
import Footer from './footer';
// import Footer from './footer';
import GlowText from './glowText';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';

const MarkdownRenderer = ({ content }) => {
  return (
    <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
      {content}
    </ReactMarkdown>
  );
};

const apiUrl = 'http://localhost:12000/health-rec';

function Dashboard() {
  const userName = localStorage.getItem("username");
  const [markdownContent, setMarkdownContent] = useState('');

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
      <section className="bg-[#001f41] pt-32">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
          {/* <h1 className="mb-4 text-3xl font-bold tracking-tight leading-none text-[#9ca3af] md:text-5xl lg:text-6xl dark:text-white">
            Hi {userName}!
          </h1> */}
          <GlowText text={`Hi ${userName}!`} className="mb-4 text-3xl font-bold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white" />
          <div className="flex justify-center">
            <div className='load'>
              <img className='w-64 max-w-xs pt-4 pb-8 z-200' src="/sample_logo.png" alt="Sample Logo" />
            </div>
          </div>
          <p className="mb-8 mt-8 text-3xl font-bold text-[#fbf778] lg:text-2xl sm:px-16 xl:px-28 dark:text-[#9ca3af]">
            Welcome to SmartMoney
          </p>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-28 dark:text-[#9ca3af]">
            Here we give you financial advice based on your earning and expense so that you may enjoy your life happily. We hope our product helps you in a good way.
          </p>
        </div>
      </section>

      <section className="bg-[#002956]">
        <div className="gap-8 items-center mt-0 py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
          <PlanCard userName={userName} />
          <div className="mt-4 md:mt-0">
            <Graph />
          </div>
        </div>
      </section>
      <section className="bg-[#001f41]">
        <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
          <div className="mt-4 md:mt-0">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-[#9ca3af]">
              Health Score
            </h2>
            <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-[#9ca3af]">
              Checkout your health score here based on the responses you gave to us. Also below are some of the comments based on the health score.
            </p>
            <div class="flex items-center p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-[#fff7e2] dark:text-[#1f2937]" role="alert">
            <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span class="sr-only">Info</span>
            <div>
              <ul></ul>
              <span className="font-medium text-base">
                <ul>
                  <li><MarkdownRenderer content={data.alert1} /></li>
                  <li><MarkdownRenderer content={data.alert2} /></li>
                  <li><MarkdownRenderer content={data.alert3} /></li>
                </ul>
              </span>
            </div>
          </div>
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

          {/* <div class="flex items-center p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-[#fff7e2] dark:text-[#1f2937]" role="alert">
            <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span class="sr-only">Info</span>
            <div>
              <ul></ul>
              <span className="font-medium text-base">
                <ul>
                  <li><MarkdownRenderer content={data.alert1} /></li>
                  <li><MarkdownRenderer content={data.alert2} /></li>
                  <li><MarkdownRenderer content={data.alert3} /></li>
                </ul>
              </span>
            </div>
          </div> */}

        </div>
      </section>

      <ChatPopup />

      <Footer />
    </div>
  );
}

export default Dashboard;
