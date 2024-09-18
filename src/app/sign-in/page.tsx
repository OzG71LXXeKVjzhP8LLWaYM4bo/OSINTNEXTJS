"use client";

import { useState } from "react";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

const EmailLogin = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Pass email explicitly and allow user creation
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email, // Pass the email entered by the user
      options: {
        shouldCreateUser: true, // Ensure the user account is created if it doesn't exist
      },
    });

    if (error) {
      setMessage("Error sending magic link. Please try again.");
    } else {
      setMessage("Magic link sent! Check your email.");
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Uncover Intelligence with OSINT Pro</h1>
        <p className="text-gray-500 mb-8">
          Powerful open-source intelligence tool for professionals and researchers
        </p>

        {/* Email Input Form */}
        <form onSubmit={handleLogin} className="flex flex-col items-center space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-96 px-4 py-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
          <button
            type="submit"
            className={`px-6 py-2 bg-black text-white rounded-md shadow-md hover:bg-gray-800 transition-all ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Magic Link"}
          </button>
        </form>

        {/* Status Message */}
        {message && (
          <p className="mt-4 text-gray-700">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default EmailLogin;
