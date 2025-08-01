"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react"; // Ensure this is installed

const navLinks = [
  { label: "Login", href: "/" },
  { label: "Signup", href: "/signup" },
  { label: "Profile", href: "/profile", protected: true },
  { label: "Tests", href: "/tests" },
];

export default function Header() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const filteredLinks = navLinks.filter(
    (link) => !link.protected || isLoggedIn
  );

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
          🎓 Test Portal
        </div>

        {/* Desktop nav */}
        <nav className="hidden sm:flex space-x-4">
          {filteredLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm px-3 py-2 rounded-md font-medium transition ${
                pathname === link.href
                  ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-800 dark:text-white"
                  : "text-gray-700 hover:bg-gray-100 hover:text-black dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger menu button */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="sm:hidden text-gray-700 dark:text-gray-300"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <nav className="sm:hidden px-4 pb-4 bg-white dark:bg-gray-900">
          <div className="flex flex-col space-y-2">
            {filteredLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block text-sm px-4 py-2 rounded-md font-medium transition ${
                  pathname === link.href
                    ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-800 dark:text-white"
                    : "text-gray-700 hover:bg-gray-100 hover:text-black dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
