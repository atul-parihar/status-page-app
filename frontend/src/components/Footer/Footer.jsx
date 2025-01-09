import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center sm:flex-row justify-between">
          <div className="text-center sm:text-left">
            <p className="text-xl font-bold">Status Viewer</p>
            <p className="text-sm mt-2">© {new Date().getFullYear()} Status Viewer. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
