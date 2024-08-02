import React, { useState } from 'react';

function UserInfoForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    phone: '',
    website: '',
    visitors: '',
    email: '',
    password: '',
    confirmPassword: '',
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Add form submission logic here
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6">User Information</h2>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="block mb-2 text-sm font-medium">First name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="John"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block mb-2 text-sm font-medium">Last name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Doe"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="company" className="block mb-2 text-sm font-medium">Company</label>
            <input
              type="text"
              id="company"
              name="company"
              className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Flowbite"
              value={formData.company}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block mb-2 text-sm font-medium">Phone number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="123-45-678"
              pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="website" className="block mb-2 text-sm font-medium">Website URL</label>
            <input
              type="url"
              id="website"
              name="website"
              className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="flowbite.com"
              value={formData.website}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="visitors" className="block mb-2 text-sm font-medium">Unique visitors (per month)</label>
            <input
              type="number"
              id="visitors"
              name="visitors"
              className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={formData.visitors}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm font-medium">Email address</label>
          <input
            type="email"
            id="email"
            name="email"
            className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="john.doe@company.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="•••••••••"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium">Confirm password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="•••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              name="remember"
              className="w-4 h-4 border border-gray-600 rounded bg-gray-700 focus:ring-3 focus:ring-blue-600"
              checked={formData.remember}
              onChange={handleChange}
              required
            />
          </div>
          <label htmlFor="remember" className="ms-2 text-sm font-medium">I agree with the <a href="#" className="text-blue-500 hover:underline">terms and conditions</a>.</label>
        </div>
        <div className="flex space-x-4">
          <button type="submit" className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
          <button type="button" className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Edit</button>
          <button type="button" className="text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-4 focus:outline-none focus:ring-yellow-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Save</button>
        </div>
      </form>
    </div>
  );
}

export default UserInfoForm;
