"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function IndexPage() {

  return (
    <div className="min-h-screen bg-green-100 flex items-center px-16">
{/* LOGO */}
<div className="absolute top-6 left-6 flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-md border border-green-200">

  <img
    src="/logo.jpeg"
    alt="Logo"
    className="h-10 w-auto"
  />

  <span className="text-green-800 font-semibold text-lg">
     Med +
  </span>

</div>
      {/* LEFT SECTION */}
      <div className="w-1/2">
    <h1 className="text-4xl font-bold text-green-900 mb-4">Welcome to Our Healthcare Portal</h1>

        {/* Quote */}
        <h1 className="text-6xl font-semibold text-green-800 leading-tight mb-6">
          Your Health,<br/>Our Priority
        </h1>

        <p className="text-gray-600 mb-12 text-lg">
          Secure and seamless access to healthcare services.
          Manage your records and appointments with ease.
        </p>

        {/* Animated Login Box */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          whileHover={{ scale: 1.05 }}
          className="relative w-[320px] p-10 rounded-2xl shadow-xl bg-white border border-green-100"
        >

          {/* subtle glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-600 rounded-2xl blur opacity-20"></div>

          <div className="relative flex flex-col items-center">

            <h2 className="text-xl font-semibold text-green-800 mb-6">
              Patient Portal
            </h2>

            <Link href="/login">
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.1 }}
                className="px-8 py-3 bg-green-700 text-white rounded-full font-semibold shadow-md hover:bg-green-800 transition"
              >
                Login
              </motion.button>
            </Link>

          </div>
        </motion.div>

      </div>


 {/* RIGHT IMAGE SECTION */}
<div className="absolute right-0 top-0 w-1/2 h-screen">

  <motion.img
    src="/pageimg.jpg"
    alt="Doctor"
    initial={{ opacity: 0, x: 80 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8 }}
    className="w-full h-full object-cover"
  />


</div>
    </div>
  );
}