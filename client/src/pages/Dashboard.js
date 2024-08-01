import React from 'react';
import NavbarDemo from '../navbar-demo'; // Ensure the path is correct
import Speedometer from './meter';
import PlanCard from './WalletCard';
import CtaSection from './CtaSection'; // Import the new CtaSection component
import '../dashboard.css';

const value = sessionStorage.getItem('username');
const apiUrl = 'https://api.gemini.com/v1/your-endpoint'; 

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="navbar-container">
        <NavbarDemo />
      </div>
      <section className="bg-white dark:bg-gray-900">
      <div className="gap-8 items-center mt-32 py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
        <img
          className="w-full dark:hidden"
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup.svg"
          alt="dashboard image"
        />
        <img
          className="w-full hidden dark:block"
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup-dark.svg"
          alt="dashboard image"
        />
        <div className="mt-4 md:mt-0">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Let's create more tools and ideas that brings us together.
          </h2>
          <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">
            Flowbite helps you connect with friends and communities of people who share your interests. Connecting with
            your friends and family as well as discovering new ones is easy with features like Groups.
          </p>
          <a
            href="#"
            className="inline-flex items-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900"
          >
            Get started
            <svg
              className="ml-2 -mr-1 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
      <div className="dashboard-content">
        <div className="card-container">
          <PlanCard />
          <div className="wallet-content">
            <h1 className="wallet-heading">Wallet</h1>
            <p className="wallet-text">Details about the wallet go here. This can include transaction history, balance, or other relevant information that provides users with a comprehensive view of their wallet status.</p>
          </div>
        </div>
        <div className="speedometer-container">
          <Speedometer percentage={12} />
          
           
          
        </div>
        <div className="recommendations-container">
          <ul className="recommendations">
            <li>Recommendation 1: huwedhuewhuduuuuuuuuuuuhuwedhuewhuduuuuuuuuuuu</li>
            <li>Recommendation 2: huwedhuewhuduuuuuuuuuuuhuwedhuewhuduuuuuuuuuuu</li>
            <li>Recommendation 3: huwedhuewhuduuuuuuuuuuuhuwedhuewhuduuuuuuuuuuu</li>
            <li>Recommendation 4: huwedhuewhuduuuuuuuuuuuhuwedhuewhuduuuuuuuuuuu</li>
            <li>Recommendation 5: huwedhuewhuduuuuuuuuuuuhuwedhuewhuduuuuuuuuuuu</li>
          </ul>
        </div>
      </div>
      <CtaSection />
    </div>
  );
}

export default Dashboard;
