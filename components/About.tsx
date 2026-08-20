import { GraduationCap, Users, Building2, Rocket } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side */}
          <div>
            <span className="text-blue-600 font-semibold uppercase tracking-wider">
              About EduOS
            </span>

            <h2 className="text-5xl font-bold text-gray-900 mt-4">
              One Platform for the Entire School
            </h2>

            <p className="mt-6 text-lg text-gray-600 leading-8">
              EduOS (Education Operating System) is a modern school management
              platform that connects students, teachers, and administrators
              through one secure and intelligent system.
            </p>

            <p className="mt-6 text-lg text-gray-600 leading-8">
              Built using Next.js, React, Tailwind CSS, TypeScript, and
              Supabase, EduOS simplifies everyday school operations including
              homework, marks, attendance, and academic management.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-xl p-5 text-center">
                <h3 className="text-3xl font-bold text-blue-700">3</h3>
                <p className="text-gray-600 mt-2">Dedicated Portals</p>
              </div>

              <div className="bg-blue-50 rounded-xl p-5 text-center">
                <h3 className="text-3xl font-bold text-blue-700">100%</h3>
                <p className="text-gray-600 mt-2">Cloud Based</p>
              </div>

              <div className="bg-blue-50 rounded-xl p-5 text-center">
                <h3 className="text-3xl font-bold text-blue-700">Secure</h3>
                <p className="text-gray-600 mt-2">Authentication</p>
              </div>

              <div className="bg-blue-50 rounded-xl p-5 text-center">
                <h3 className="text-3xl font-bold text-blue-700">Modern</h3>
                <p className="text-gray-600 mt-2">Technology Stack</p>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div
            className="
            bg-gradient-to-br
            from-blue-600
            to-blue-800
            rounded-3xl
            p-10
            text-white
            shadow-2xl
            "
          >
            <h3 className="text-3xl font-bold mb-6">Our Vision</h3>

            <p className="text-lg leading-8 text-blue-100">
              Our vision is to provide educational institutions with a modern,
              intelligent, and scalable platform that simplifies school
              management while improving communication and learning for everyone
              involved.
            </p>

            <div className="mt-10 space-y-5">
              <div className="flex items-center gap-4">
                <GraduationCap size={30} />
                <span>Empower Students</span>
              </div>

              <div className="flex items-center gap-4">
                <Users size={30} />
                <span>Support Teachers</span>
              </div>

              <div className="flex items-center gap-4">
                <Building2 size={30} />
                <span>Simplify Administration</span>
              </div>

              <div className="flex items-center gap-4">
                <Rocket size={30} />
                <span>Future-Ready Education</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
