'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
              E
            </div>

            <div>
              <h1 className="text-2xl font-bold text-blue-700">EduOS</h1>

              <p className="text-xs text-gray-500">
                Education Operating System
              </p>
            </div>
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#home"
              className="text-gray-700 hover:text-blue-600 transition font-medium"
            >
              Home
            </a>

            <a
              href="#features"
              className="text-gray-700 hover:text-blue-600 transition font-medium"
            >
              Features
            </a>

            <a
              href="#about"
              className="text-gray-700 hover:text-blue-600 transition font-medium"
            >
              About
            </a>

            <a
              href="#technology"
              className="text-gray-700 hover:text-blue-600 transition font-medium"
            >
              Technology
            </a>

            <a
              href="#contact"
              className="text-gray-700 hover:text-blue-600 transition font-medium"
            >
              Contact
            </a>
          </div>

          {/* Login Button */}
          <Link
            href="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition shadow-lg"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
