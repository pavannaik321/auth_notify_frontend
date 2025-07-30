"use client";
import { useEffect, useState } from "react";
import API from "@/lib/api";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { disconnectSocket } from "@/lib/socket";

type Profile = {
  id: string;
  name: string;
  email: string;
};

export default function Profile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const router = useRouter();
  const auth = useAuth();
  const token = auth?.token;
  const loading = auth?.loading;

  useEffect(() => {
    if (loading) return;

    if (!token) {
      router.push("/");
    } else {
      API.get("https://auth-notify-backend.onrender.com/api/user/profile").then((res) => setProfile(res.data));
    }
  }, [token, loading]);

  if (loading || !profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-xl font-semibold text-gray-500 animate-pulse">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-white to-indigo-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl ring-1 ring-gray-200">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">👤 Profile Overview</h2>
          <p className="mt-1 text-sm text-gray-500">Heres your account information</p>
        </div>

        <div className="space-y-4 text-gray-700">
          <div>
            <span className="block text-sm font-medium text-gray-500">Full Name</span>
            <span className="mt-1 block text-lg font-semibold">{profile.name}</span>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-500">Email Address</span>
            <span className="mt-1 block text-lg font-semibold">{profile.email}</span>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-500">User ID</span>
            <span className="mt-1 block break-all text-sm text-gray-600">{profile.id}</span>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              disconnectSocket(); 
              localStorage.removeItem("token");
              router.push("/");
            }}
            className="rounded-md bg-red-500 px-4 py-2 text-white transition hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
