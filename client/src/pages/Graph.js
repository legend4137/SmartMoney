import React, { useEffect, useRef, useState } from 'react';
import ApexCharts from 'apexcharts';
import axios from 'axios';

const SalesChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null); // Ref to hold the chart instance
  const [monthlyExpenses, setMonthlyExpenses] = useState(0);
  const [percentageChange, setPercentageChange] = useState(0);
  const userName = localStorage.getItem("username");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:12000/scrolling?userName=${userName}`);
        const logs = response.data;

        const dailyExpenses = {}; // To store total withdrawals per day
        const monthlyExpenses = {}; // To store total withdrawals per month
        const monthlyData = {}; // To store monthly data for comparison

        Object.keys(logs).forEach((key) => {
          const log = logs[key];
          const date = new Date(log.Date);
          const day = date.toLocaleDateString();
          const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`;

          if (log.transaction === 'withdraw') {
            // Daily expenses
            if (!dailyExpenses[day]) {
              dailyExpenses[day] = 0;
            }
            dailyExpenses[day] += log.amount;

            // Monthly expenses
            if (!monthlyExpenses[monthYear]) {
              monthlyExpenses[monthYear] = 0;
            }
            monthlyExpenses[monthYear] += log.amount;

            // Collect data for percentage change
            if (!monthlyData[monthYear]) {
              monthlyData[monthYear] = 0;
            }
            monthlyData[monthYear] += log.amount;
          }
        });

        // Prepare data for the chart
        const categories = Object.keys(dailyExpenses);
        const seriesData = categories.map(date => dailyExpenses[date]);

        // Get current month and previous month
        const currentMonth = `${new Date().getMonth() + 1}-${new Date().getFullYear()}`;
        const previousMonth = `${new Date().getMonth()}-${new Date().getFullYear()}`;

        // Calculate monthly expenses
        const currentMonthExpenses = monthlyExpenses[currentMonth] || 0;
        const previousMonthExpenses = monthlyExpenses[previousMonth] || 0;

        // Calculate percentage change
        const change = previousMonthExpenses > 0
          ? ((currentMonthExpenses - previousMonthExpenses) / previousMonthExpenses) * 100
          : 0;

        setMonthlyExpenses(currentMonthExpenses);
        setPercentageChange(change.toFixed(2));

        // Update chart options
        const options = {
          xaxis: {
            show: true,
            categories: categories,
            labels: {
              show: true,
              style: {
                fontFamily: "Inter, sans-serif",
                cssClass: 'text-xs font-normal fill-[#1f2937] dark:fill-[#1f2937]'
              }
            },
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
          },
          yaxis: {
            show: true,
            labels: {
              show: true,
              style: {
                fontFamily: "Inter, sans-serif",
                cssClass: 'text-xs font-normal fill-[#1f2937] dark:fill-[#1f2937]'
              },
              formatter: function (value) {
                return '₹' + value;
              }
            },
            min: Math.min(...seriesData) * 0.9, // Dynamic min value with margin
            max: Math.max(...seriesData) * 1.1, // Dynamic max value with margin
          },
          series: [
            {
              name: "Daily Expenses",
              data: seriesData,
              color: "#FF5733", // Different color for expenses
            }
          ],
          chart: {
            sparkline: {
              enabled: false
            },
            height: "100%",
            width: "100%",
            type: "area",
            fontFamily: "Inter, sans-serif",
            dropShadow: {
              enabled: false,
            },
            toolbar: {
              show: false,
            },
          },
          tooltip: {
            enabled: false, // Disable tooltip
          },
          fill: {
            type: "gradient",
            gradient: {
              opacityFrom: 0.55,
              opacityTo: 0,
              shade: "#FF5733",
              gradientToColors: ["#FF5733"],
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            width: 6,
          },
          legend: {
            show: false
          },
          grid: {
            show: false,
          },
        };

        if (chartRef.current) {
          // Only create the chart if it hasn't been created yet
          if (!chartInstance.current) {
            chartInstance.current = new ApexCharts(chartRef.current, options);
            chartInstance.current.render();
          } else {
            // Update existing chart
            chartInstance.current.updateOptions(options);
          }

          // Cleanup on unmount
          return () => {
            if (chartInstance.current) {
              chartInstance.current.destroy();
              chartInstance.current = null;
            }
          };
        } else {
          console.error("Chart ref is null");
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-lg w-full bg-white rounded-lg shadow dark:bg-[#c5bdab] dark:border-[#522922]">
      <div className="flex justify-between p-4 md:p-6 pb-0 md:pb-0">
        <div>
          <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-[#1f2937] pb-2">₹{monthlyExpenses}</h5>
          <p className="text-base font-normal text-gray-500 dark:text-[#1f2937]">Monthly Expenses</p>
        </div>
        <div className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-700 text-center">
          {percentageChange}%
          <svg className="w-3 h-3 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13V1m0 0L1 5m4-4 4 4"/>
          </svg>
        </div>
      </div>
      <div ref={chartRef} id="labels-chart" className="px-2.5"></div>
      <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-[#522922] justify-between mt-5 p-4 md:p-6 pt-0 md:pt-0">
        <div className="flex justify-between items-center pt-5">
          <span className="text-sm font-medium text-gray-500 dark:text-[#1f2937] text-center inline-flex items-center">
            Last 7 days
          </span>
        </div>
      </div>
    </div>
  );
};

export default SalesChart;
