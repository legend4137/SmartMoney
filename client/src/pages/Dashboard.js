import React from 'react';
import NavbarDemo from '../navbar-demo'; // Ensure the path is correct
import Speedometer from './meter';
import PlanCard from './WalletCard';
import CtaSection from './CtaSection'; // Import the new CtaSection component
import '../dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="navbar-container">
        <NavbarDemo />
      </div>
      <div className="dashboard-content">
        <div className="card-container">
          <PlanCard />
          <div className="wallet-content">
            <h1 className="wallet-heading">Wallet</h1>
            <p className="wallet-text">Details about the wallet go here. This can include transaction history, balance, or other relevant information that provides users with a comprehensive view of their wallet status.</p>
          </div>
        </div>
        <div className="speedometer-container">
          <Speedometer percentage={75} />
          
           
          
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
      <CtaSection /> {/* Ensure this is correctly imported and used if needed */}
    </div>
  );
}

export default Dashboard;
