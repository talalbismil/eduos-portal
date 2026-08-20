import Link from 'next/link';

import { GraduationCap, BookOpen, UserRoundCog } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden min-h-screen flex items-center bg-gradient-to-br from-blue-800 via-blue-600 to-indigo-800 text-white"
    >
      {/* Background Glow Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-48 -left-48 w-[500px] h-[500px] bg-blue-300/20 rounded-full blur-3xl" />

        <div className="absolute top-40 -right-48 w-[600px] h-[600px] bg-cyan-300/20 rounded-full blur-3xl" />

        <div className="absolute bottom-0 left-1/2 w-[400px] h-[400px] bg-purple-300/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side */}
          <div>
            <p className="text-blue-200 text-lg font-semibold mb-4">
              Welcome to the Future of Education
            </p>

            <h1 className="text-6xl md:text-7xl font-extrabold leading-tight">
              EduOS
            </h1>

            <h2 className="mt-4 text-3xl md:text-4xl font-bold">
              Education Operating System
            </h2>

            <p className="mt-6 text-lg text-blue-100 leading-8 max-w-xl">
              A complete digital platform connecting students, teachers, and
              administrators through one intelligent school management system.
            </p>

            <p className="mt-4 text-blue-100 leading-7 max-w-xl">
              Manage homework, marks, attendance, courses and academic
              operations with a secure, modern and scalable solution.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap gap-5">
              <Link
                href="/login"
                className="
                bg-white
                text-blue-700
                font-bold
                px-10
                py-4
                rounded-xl
                shadow-xl
                hover:scale-105
                transition-all
                duration-300
                "
              >
                Login Portal
              </Link>

              <a
                href="#features"
                className="
                border-2
                border-white
                px-10
                py-4
                rounded-xl
                font-semibold
                hover:bg-white
                hover:text-blue-700
                transition-all
                duration-300
                "
              >
                Explore Features
              </a>
            </div>

            {/* Stats */}
            <div className="mt-12 flex flex-wrap gap-10">
              <div>
                <h3 className="text-3xl font-bold">3</h3>
                <p className="text-blue-200">User Portals</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold">100%</h3>
                <p className="text-blue-200">Cloud Based</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold">Secure</h3>
                <p className="text-blue-200">Platform</p>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex justify-center">
            <div
              className="
              w-full
              max-w-md
              bg-white/10
              backdrop-blur-xl
              border
              border-white/20
              rounded-3xl
              p-8
              shadow-2xl
              hover:scale-105
              transition-all
              duration-500
              "
            >
              <h3 className="text-3xl font-bold text-center mb-8">
                EduOS Modules
              </h3>

              <div className="space-y-5">
                {/* Student */}
                <div
                  className="
                  bg-white
                  text-gray-800
                  rounded-2xl
                  p-5
                  shadow-lg
                  hover:-translate-y-2
                  transition
                  "
                >
                  <h4 className="text-xl font-bold flex items-center gap-3">
                    <GraduationCap className="text-blue-600" size={30} />
                    Student Portal
                  </h4>

                  <p className="mt-2 text-gray-600">
                    Homework, marks, subjects, attendance and learning
                    resources.
                  </p>
                </div>

                {/* Teacher */}
                <div
                  className="
                  bg-white
                  text-gray-800
                  rounded-2xl
                  p-5
                  shadow-lg
                  hover:-translate-y-2
                  transition
                  "
                >
                  <h4 className="text-xl font-bold flex items-center gap-3">
                    <BookOpen className="text-green-600" size={30} />
                    Teacher Portal
                  </h4>

                  <p className="mt-2 text-gray-600">
                    Manage students, homework, marks and academic activities.
                  </p>
                </div>

                {/* Admin */}
                <div
                  className="
                  bg-white
                  text-gray-800
                  rounded-2xl
                  p-5
                  shadow-lg
                  hover:-translate-y-2
                  transition
                  "
                >
                  <h4 className="text-xl font-bold flex items-center gap-3">
                    <UserRoundCog className="text-purple-600" size={30} />
                    Admin Portal
                  </h4>

                  <p className="mt-2 text-gray-600">
                    Complete school management and administration control.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
