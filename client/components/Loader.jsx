"use client"


import React from 'react';
import { Puff } from 'react-loader-spinner';

const Loader = ({ color }) => {
  return (
    <div className="loader-container absolute top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center">
      <div className="flex items-center justify-center">
        <div className="rounded-full bg-gray-300 p-4">
          <Puff
            height={30}
            width={30}
            radius={1}
            color={color}
            ariaLabel="puff-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
        <p className="ml-2 text-gray-600">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;

