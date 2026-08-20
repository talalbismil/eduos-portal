import Link from 'next/link';
import { GraduationCap, Mail, ShieldCheck, ArrowUp } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 text-white">
              <GraduationCap size={36} />

              <h2 className="text-3xl font-bold">EduOS</h2>
            </div>

            <p className="mt-5 text-gray-400 leading-7">
              Education Operating System — a modern digital platform connecting
              students, teachers, and administrators.
            </p>

            <div className="flex items-center gap-2 mt-5 text-blue-400">
              <ShieldCheck size={20} />

              <span>Secure Education Platform</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-xl font-bold mb-5">Quick Links</h3>

            <ul className="space-y-3">
              <li>
                <a href="#home" className="hover:text-white transition">
                  Home
                </a>
              </li>

              <li>
                <a href="#about" className="hover:text-white transition">
                  About
                </a>
              </li>

              <li>
                <a href="#features" className="hover:text-white transition">
                  Features
                </a>
              </li>

              <li>
                <Link href="/login" className="hover:text-white transition">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Portals */}
          <div>
            <h3 className="text-white text-xl font-bold mb-5">Portals</h3>

            <ul className="space-y-3">
              <li>Student Portal</li>

              <li>Teacher Portal</li>

              <li>Admin Portal</li>

              <li>School Management</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-xl font-bold mb-5">Contact</h3>

            <div className="flex items-center gap-3">
              <Mail size={20} className="text-blue-400" />

              <span>support@eduos.com</span>
            </div>

            <p className="mt-5 text-gray-400 leading-7">
              Built with Next.js, React, Tailwind CSS, TypeScript, and Supabase.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="
          mt-12
          pt-8
          border-t
          border-gray-800
          flex
          flex-col
          md:flex-row
          justify-between
          items-center
          gap-5
          "
        >
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} EduOS. All rights reserved.
          </p>

          <a
            href="#home"
            className="
            flex
            items-center
            gap-2
            text-blue-400
            hover:text-white
            transition
            "
          >
            Back to top
            <ArrowUp size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
