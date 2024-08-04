import React, { useState } from 'react';

const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log({ email, password, repeatPassword, termsAccepted });
  };

  return (

//     <section className="bg-white dark:bg-gray-900 min-h-screen flex items-center">
//     <div className="grid max-w-screen-xl px-8 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-8">
//     <div className="text-center text-gray-500">
    
//     <ReactRoundedImage
//   image={MyPhoto}
//   roundedColor="#321124"
//   imageWidth="150"
//   imageHeight="150"
//   roundedSize="13"
//   hoverColor="#DD1144"
// />

//       <h3 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
//         <a href="#">Bonnie Green</a>
//       </h3>
//       <p>CEO/Co-founder</p>
//       <ul className="flex justify-center mt-4 space-x-4">
//         <li>
//         </li>
//         <li>
//         </li>
//         <li>
//         </li>
//         <li>
//         </li>
//       </ul>
//     </div>
//       <div className="mr-auto place-self-center lg:col-span-7 mr-32">
//         <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
//           Update Account Details
//         </h1>
//         <form className="max-w-sm mx-auto styles.body" onSubmit={handleSubmit}>
//       <div className="mb-5">
//         <label
//           htmlFor="email"
//           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//         >
//           Your email
//         </label>
//         <input
//           type="email"
//           id="email"
//           className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
//           placeholder="name@flowbite.com"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//       </div>
//       <div className="mb-5">
//         <label
//           htmlFor="password"
//           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//         >
//           Your password
//         </label>
//         <input
//           type="password"
//           id="password"
//           className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//       </div>
//       <div className="mb-5">
//         <label
//           htmlFor="repeat-password"
//           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//         >
//           Repeat password
//         </label>
//         <input
//           type="password"
//           id="repeat-password"
//           className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
//           value={repeatPassword}
//           onChange={(e) => setRepeatPassword(e.target.value)}
//           required
//         />
//       </div>
//       <div className="flex items-start mb-5">
//         <div className="flex items-center h-5">
//           <input
//             id="terms"
//             type="checkbox"
//             value=""
//             className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
//             checked={termsAccepted}
//             onChange={(e) => setTermsAccepted(e.target.checked)}
//             required
//           />
//         </div>
//         <label
//           htmlFor="terms"
//           className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
//         >
//           I agree with the{' '}
//           <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">
//             terms and conditions
//           </a>
//         </label>
//       </div>
//       <button
//         type="submit"
//         className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//       >
//         Register new account
//       </button>
//     </form>
//       </div>
//     </div>
//   </section>

<section className="py-8 bg-white md:py-16 dark:bg-gray-900 min-h-screen flex items-center antialiased">
<div className="max-w-screen-xl px-4 mx-auto 2xl:px-0 +">
  <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
    <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
      <img
        className="w-full hidden dark:block"
        src="https://picsum.photos/800/800"
        style={{width: 400, height: 400, borderRadius: 400/ 2}} 
        alt="iMac"
        
      />
    </div>

    <div className="mt-6 sm:mt-8 lg:mt-0">
      <h1 className="text-xl font-semibold text-gray-900 sm:text-3xl dark:text-white">
      EDIT ACCOUNT INFO
      </h1>
      

      <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

       
    </div>
  </div>
</div>
</section>
);
};



export default RegistrationForm;
