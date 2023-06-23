import React from "react";
import { Header } from "../components";
import { NavLink } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import { Bill } from "../assests";

const CheckOutSuccess = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="container mx-auto px-6 md:px-24 2xl:px-96 bg-gray-100">
        <div className="flex flex-col items-center justify-center mt-10 md:mt-20 gap-12 pb-24 shadow-xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-gray-800 font-bold mb-8">
            Amount Paid Successfully
          </h1>
          <img src={Bill} className="max-w-sm" alt="Bill" />
          <motion.div
            className="w-full flex justify-center"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: -10 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <NavLink
              to={"/"}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-md border border-gray-300 hover:shadow-md text-lg text-gray-800 font-semibold"
            >
              <FaArrowLeft className="text-2xl" />
              <span>Get back to Home</span>
            </NavLink>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default CheckOutSuccess;
