import React from 'react';
import Navbar from './navbar';

function Home() {
  return (
    <div>
      <Navbar /> {/* Include the Navbar component */}
      <div className="p-5">
        <p>This is the home page</p>
      </div>
    </div>
  )
}

export default Home
