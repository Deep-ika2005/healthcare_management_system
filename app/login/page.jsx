"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { msalInstance } from "../../src/msalInstance";

export default function LoginPage() {

  const router = useRouter();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {

    const init = async () => {

      await msalInstance.initialize();

      const response = await msalInstance.handleRedirectPromise();

      if (response) {
        router.push("/home");
      } else {
        const accounts = msalInstance.getAllAccounts();
        if (accounts.length > 0) {
          router.push("/home");
        }
      }

      setInitialized(true);
    };

    init();

  }, [router]);

  const handleLogin = async () => {
    await msalInstance.loginRedirect({
      scopes: ["user.read"],
    });
  };

  return (

    <div className="min-h-screen flex">

      {/* LEFT SIDE LOGIN */}
      <div className="w-1/2 flex items-center justify-center bg-gradient-to-br from-green-700 via-emerald-600 to-teal-500 relative">

        {/* glow effects */}
        <div className="absolute w-[400px] h-[400px] bg-green-400 opacity-30 rounded-full blur-3xl top-[-80px] left-[-80px]" />
        <div className="absolute w-[400px] h-[400px] bg-emerald-300 opacity-30 rounded-full blur-3xl bottom-[-80px] right-[-80px]" />

        {/* login card */}
        <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-12 w-[380px] text-center text-white">

          {/* logo */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-white text-green-600 text-3xl font-bold shadow-lg">
              🏥
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-2">
            Health-Aware Gate
          </h1>

          <p className="text-white/80 mb-8 text-sm">
            Smart hospital entry with health monitoring
          </p>

          <button
            onClick={handleLogin}
            disabled={!initialized}
            className="w-full py-3 rounded-xl bg-white text-green-700 font-semibold shadow-lg hover:scale-105 hover:bg-green-50 transition"
          >
            Sign in with Microsoft
          </button>

          <p className="text-xs text-white/70 mt-6">
            Secure login powered by Microsoft
          </p>

        </div>

      </div>


      {/* RIGHT SIDE IMAGE */}
      <div className="w-1/2 h-screen relative">

        <img
          src="/auth.jpeg"
          alt="Healthcare"
          className="absolute w-full h-full object-cover"
        />

      </div>

    </div>

  );
}