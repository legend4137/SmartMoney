import React from 'react';  // Make sure to import the CSS file

const AboutUs = () => {
  return (
    <section className="bg-white dark:bg-gray-900 pt-32">
    <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
      <h1 className="mb-4 text-3xl font-bold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        About Us
      </h1>
      <p className="mb-8 mt-8 text-2xl font-bold text-gray-500 lg:text-xl sm:px-16 xl:px-28 dark:text-gray-400">
        Smart Money
      </p>
      <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-28 dark:text-gray-400">
      We are dedicated to empowering individuals to take control of their financial future. Our mission is to provide user-friendly tools to help you track expenses, create budgets, and understand your financial health. Our team of experts is committed to making personal finance management simple and accessible. Join us in achieving financial stability and peace of mind. Start your journey to better finances today!
      </p>
    </div>
  </section>

  );
};

export default AboutUs;
