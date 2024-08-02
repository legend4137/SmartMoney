import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import NavbarDemo from '../navbar-demo'; // Ensure the path is correct
import Speedometer from './meter';
import PlanCard from './WalletCard';

const value = sessionStorage.getItem('username');

function Dashboard() {
  const [userName, setUserName] = useState('tharak');
  useEffect(() => {
    const storedUserName = sessionStorage.getItem('username');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

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
          <PlanCard userName={userName} />
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
              Wallet
            </h2>
            <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">
              This feature looks upon your log book, tracks the expense. If you want to edit this just click the open wallet feature to redirect to the wallet page to get your wallet updated.
            </p>
          </div>
          <Speedometer percentage={90} />
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
