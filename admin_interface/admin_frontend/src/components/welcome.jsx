import React from "react";

const Welcome = () => {
  return (
    <section className="h-screen text-white flex flex-col justify-center items-center p-4">
      <div className="max-w-4xl text-center">
        {/* Heading */}
        <h1 className="text-5xl font-extrabold tracking-tight mb-6">
          Welcome to Our Platform!
        </h1>

        {/* Subheading */}
        <p className="text-xl mb-8">
          A place to manage and organize your courses and projects efficiently.
        </p>

        {/* Buttons */}
        <div className="flex space-x-6 justify-center">
          <a
            href="/create"
            className="inline-block px-6 py-3 bg-indigo-700 text-lg font-semibold rounded-lg shadow-lg hover:bg-indigo-800 transform transition-all duration-300"
          >
            Create a New Course
          </a>
          <a
            href="/read"
            className="inline-block px-6 py-3 bg-green-700 text-lg font-semibold rounded-lg shadow-lg hover:bg-green-800 transform transition-all duration-300"
          >
            View All Courses
          </a>
        </div>
      </div>

      {/* Image/Logo Section (optional) */}
      <div className="mt-12">
        <img
          src="https://9antra.tn/content/images/LogoBridge.png"
          alt="Platform Logo"
          className="w-40 mx-auto"
        />
      </div>
    </section>
  );
};

export default Welcome;
