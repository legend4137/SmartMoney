import React, { useEffect, useState } from 'react';
import './meter.css';

const Speedometer = ({ percentage }) => {
  const [displayedPercentage, setDisplayedPercentage] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1000; // total animation duration in ms
    const end = percentage; // final value
    const stepTime = duration / Math.abs(end - start);

    const timer = setInterval(() => {
      start += 1;
      setDisplayedPercentage(start);
      if (start >= end) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [percentage]);

  // Determine the color based on the percentage
  const getColor = (percentage) => {
    if (percentage <= 25) return '#FF0000'; // Red
    if (percentage <= 50) return '#FFA500'; // Orange
    if (percentage <= 75) return '#FFFF00'; // Yellow
    return '#00FF00'; // Green
  };

  // Calculate the length and offset for the current percentage
  const arcLength = 502; // Length of the semi-circle arc
  const adjustedPercentage = displayedPercentage * 1.11; // Increase the factor by 1.2
  const strokeDasharray = `${(arcLength * adjustedPercentage) / 100} ${arcLength}`;

  return (
    <div className="speedometer-container">
      <svg viewBox="0 0 400 200" className="speedometer-svg">
        {/* Background Arc */}
        <path
          d="
            M 20,180
            A 160,160 0 0,1 380,180
          "
          className="speedometer-background"
        />
        {/* Filled Arc */}
        <path
          d="
            M 20,180
            A 160,160 0 0,1 380,180
          "
          className="speedometer-filled"
          style={{
            stroke: getColor(displayedPercentage),
            strokeDasharray,
          }}
        />
      </svg>
      <div className="percentage-display">
        {displayedPercentage}%
      </div>
    </div>
  );
};

export default Speedometer;
