import React from "react";
import { Link } from "react-router";
import bg from "../assets/heroo-bg.jpeg";

const Home = () => {
  const cards = [
    {
      title: "Priority",
      description: "We put your needs first, ensuring fast and focused service.",
    },
    {
      title: "Searching Ability",
      description: "Find exactly what you need with our smart, efficient search system.",
    },
    {
      title: "Easily Accessible",
      description: "Access our platform anytime, anywhere — no hassle, just ease.",
    },
  ];
  return (
    <div>
      {/* Hero Section */}
      <div
        className="relative h-[60vh] flex items-center justify-center"
        style={{
          backgroundImage: `url(${bg}`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          objectFit: "cover",
          display: "block",
          opacity: 0.87,
          overflowX: "hidden",
          zIndex: 1,
        }}
      >
        {/* Optional overlay */}
        <div className="absolute inset-0 bg-black opacity-40"></div>
        {/* Hero Content */}
        <div className="relative z-10 flex flex-col justify-center items-center h-[60vh] text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Welcome to Task Manager</h1>
          <p className="text-xl">
            Organize your tasks efficiently and securely.
          </p>
        </div>
      </div>
      <h1 className="flex justify-center mb-2 mt-10 space-x-4 font-semibold text-4xl text-cyan-600">
        Welcome to the Secure Task Management System
      </h1>
      <br />
      <p className="flex justify-center ml-20 mr-20 text-cyan-900 space-x-4 text-3xl">
        After Registering, you can able to create, update and delete your own
        tasks. Only admin can able to see all the users.
      </p>
      <br />
      <div className="flex justify-center space-x-4 mt-10 mr-4">
        <Link
          to="/login"
          className="py-2 px-8 text-lg mt-10 mr-4 rounded-[20px] bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-800 transition-all duration-200"
        >
          Log in
        </Link>
        <Link
          to="/register"
          className="py-2 px-8 text-lg mt-10 mr-4 rounded-[20px] bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-800 transition-all duration-200"
        >
          Register
        </Link>
        <Link
          to="/admin"
          className="py-2 px-8 text-lg mt-10 mr-4 rounded-[20px] bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-800 transition-all duration-200"
        >
          Admin Login
        </Link>
      </div>
      {/* Cards---- */}
 <div className="px-4 py-10 bg-white text-center">
      <h2 className="text-3xl font-semibold mb-8 text-gray-800">Why Choose Us</h2>

      {/* Stack vertically on small, grid of 3 on medium+ */}
      <div className="grid gap-4 md:grid-cols-3 max-w-6xl mx-auto ">
        {cards.map((card, index) => (
          <div
            key={index}
            className="border border-gray-300 flex flex-col justify-center items-center rounded-[8px] p-6 shadow-sm bg-gray-50 h-[30vh]"
            style={{ height: "20vh" }}
          >
            <h3 className="text-xl font-semibold text-gray-700 mb-2">{card.title}</h3>
            <p className="text-gray-600 text-sm">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Home;
