import React from 'react';
import NavbarDemo from '../navbar-demo'; // Ensure the path is correct
import Speedometer from './meter';
import PlanCard from './WalletCard';
import CtaSection from './CtaSection'; // Import the new CtaSection component
import '../dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <NavbarDemo />
      <div className="dashboard-content">
        <div className="card-container">
          <PlanCard />
        </div>
        <div className="speedometer-container">
          <Speedometer percentage={100} />
        </div>
      </div>
      <CtaSection /> {/* Add the CtaSection component */}
    </div>
  );
}

export default Dashboard;
