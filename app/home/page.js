"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { msalInstance } from "../../src/msalInstance";
import Link from "next/link";

export default function Home() {

  const [email, setEmail] = useState("");
  const router = useRouter();

  useEffect(() => {

    const init = async () => {

      await msalInstance.initialize();

      const accounts = msalInstance.getAllAccounts();

      if (accounts.length > 0) {
        setEmail(accounts[0].username);
      } else {
        router.push("/login");
      }

    };

    init();

  }, [router]);


  const logout = async () => {

    await msalInstance.initialize();

    await msalInstance.logoutRedirect({
      postLogoutRedirectUri: "http://localhost:3000/login",
    });

  };


  return (

    <div className="min-h-screen bg-[url('/bg.jpeg')] bg-cover bg-center bg-no-repeat">

      {/* Overlay */}
      <div className="min-h-screen bg-black/10">


        {/* NAVBAR */}
<nav className="w-full bg-white/30 backdrop-blur-lg border-b border-white/20 shadow-lg">

  <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-2">

   <div className="flex items-center gap-6">

  {/* LOGO */}
  <div className="flex items-center bg-white px-4 py-2 rounded-full shadow border border-cyan-600">
    <img
      src="/logo.jpeg"
      alt="Logo"
      className="h-10 w-auto object-contain"
    />
  </div>

  {/* BRAND NAME */}
  <span className="text-cyan-700 font-bold text-2xl tracking-wide">
    Med <span className="text-cyan-500">Plus</span>
  </span>

</div>

   
    {/* USER INFO */}
    <div className="flex items-center gap-4">

      {/* EMAIL */}
      <span className="text-cyan-900 text-sm font-medium">
        {email}
      </span>

      {/* USER AVATAR */}
      <div className="w-9 h-9 rounded-full bg-cyan-800 text-white flex items-center justify-center font-semibold">
        {email ? email.charAt(0).toUpperCase() : "U"}
      </div>

      {/* LOGOUT BUTTON */}
      <button
        onClick={logout}
        className="px-4 py-2 bg-cyan-500 text-white text-sm rounded-lg hover:bg-cyan-600 transition duration-200"
      >
        Logout
      </button>

    </div>

  </div>i

</nav>


        {/* TITLE */}

        <div className="text-center mt-16 text-white">

          <h1 className="text-4xl text-cyan-700 font-bold">
Better healthcare begins with better management.          </h1>

          <p className="mt-2 text-gray-600">
This platform is designed to simplify patient entry and appointment scheduling, helping medical professionals focus more on care and less on paperwork.          </p>

        </div>



        {/* CARDS */}

        <div className="flex justify-center items-center gap-12 mt-20 flex-wrap px-6">


          {/* NEW PATIENT */}

          <Link href="/register">

            <div className="relative w-[360px] h-[240px] rounded-3xl overflow-hidden shadow-2xl cursor-pointer group">

              <img
                src="/patient.jpeg"
                alt="Patient"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />

              <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6 text-white">

                <h2 className="text-2xl font-bold">
                  New Patient
                </h2>

                <p className="text-sm opacity-90">
                  Register new patient entry
                </p>

              </div>

            </div>

          </Link>



          {/* APPOINTMENT */}

          <Link href="/appointment">

            <div className="relative w-[360px] h-[240px] rounded-3xl overflow-hidden shadow-2xl cursor-pointer group">

              <img
                src="/appointment.jpeg"
                alt="Appointment"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />

              <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6 text-white">

                <h2 className="text-2xl font-bold">
                  Appointment
                </h2>

                <p className="text-sm opacity-90">
                  Book doctor consultation
                </p>

              </div>

            </div>

          </Link>

        </div>


      </div>

    </div>

  );

}