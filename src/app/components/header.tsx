"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Login", href: "/" },
  { label: "Signup", href: "/signup" },
  { label: "Profile", href: "/profile", protected: true },
  { label: "Tests", href: "/tests" },
];

export default function Header() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-indigo-600">
          🎓 Test Portal
        </div>

        <nav className="space-x-4 hidden sm:block">
          {navLinks
            .filter((link) => !link.protected || isLoggedIn) // ✅ only show protected if logged in
            .map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm px-3 py-2 rounded-md font-medium transition ${
                  pathname === link.href
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {link.label}
              </Link>
            ))}
        </nav>
      </div>
    </header>
  );
}
