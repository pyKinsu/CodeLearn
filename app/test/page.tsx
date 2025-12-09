"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { MeteorOrbit } from "@/components/ui/meteor-orbit";

export default function TestPage() {
  const [status, setStatus] = useState("Loading...");

  // Example icons for orbit (replace with your actual icons)
  const orbitIcons = [
    "https://img.icons8.com/color/96/react-native.png",
    "https://img.icons8.com/color/96/firebase.png",
    "https://img.icons8.com/color/96/javascript.png",
  ];

  useEffect(() => {
    try {
      if (auth) {
        setStatus("✅ Firebase initialized successfully!");
      } else {
        setStatus("❌ Firebase not initialized");
      }
    } catch (error: any) {
      setStatus(`❌ Error: ${error.message}`);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900">
      <div className="text-white text-2xl mb-6">{status}</div>

      <MeteorOrbit rippleCount={3} icons={orbitIcons}>
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-slate-800">
          <svg
            data-testid="geist-icon"
            height="32"
            strokeLinejoin="round"
            viewBox="0 0 16 16"
            width="32"
          >
            <path
              d="M8 0C8.26264..."
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </MeteorOrbit>
    </div>
  );
}
