import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-800 text-white w-64">
      <div className="flex items-center justify-center h-16 border-b border-gray-700">
        <h1 className="text-2xl font-bold">My App</h1>
      </div>
      <nav className=" mt-12 flex-1 overflow-y-auto">
        <ul className="space-y-2 p-4">
          <li>
            <Link to="/read" className="flex items-center p-2 rounded-lg hover:bg-gray-700">
             
              <span className="ml-2">Dashboard</span>
            </Link>
          </li>
      
       

        </ul>
      </nav>
   
    </div>
  );
};

export default Sidebar;