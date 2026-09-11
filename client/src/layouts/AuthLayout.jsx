import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-sec dark:bg-sec flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link to="/" className="text-4xl font-extrabold text-brand flex items-center space-x-2">
            <img src="/logo.jpg" alt="One7 Logo" className="h-12 w-auto rounded object-contain mix-blend-multiply" />
            <span>One7</span>
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-heading">
          Welcome to One7
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-card py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
