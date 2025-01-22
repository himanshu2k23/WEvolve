import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="container p-6 pt-0 mx-auto">
        <hr className="h-px my-2 bg-gray-200 border-none" />
        {/* <div>
          <h1 className="text-lg font-bold text-center lg:text-2xl">
            The latest mental health news and tips, delivered to your inbox weekly.
          </h1>

          <div className="flex flex-col justify-center mx-auto mt-6 space-y-3 md:space-y-0 md:flex-row">
            <input
              id="email"
              type="text"
              className="px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
              placeholder="Email Address"
            />

            <button className="w-full px-6 py-2.5 text-sm font-medium tracking-wider text-white transition-colors duration-300 transform md:w-auto md:mx-4 focus:outline-none bg-gray-800 rounded-lg hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80">
              Subscribe
            </button>
          </div>
        </div> */}

        <div className='mt-7'>
          <p className="text-center text-gray-500">© WEvolve 2024 - All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
