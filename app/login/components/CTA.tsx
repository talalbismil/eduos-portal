import Link from 'next/link';
import { ArrowRight, LogIn } from 'lucide-react';

export default function CTA() {
  return (
    <section
      className="
      py-20
      bg-gradient-to-br
      from-blue-700
      via-blue-600
      to-indigo-800
      text-white
      "
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div
          className="
          rounded-3xl
          bg-white/10
          backdrop-blur-lg
          border
          border-white/20
          p-10
          md:p-16
          text-center
          shadow-2xl
          "
        >
          <h2 className="text-4xl md:text-5xl font-extrabold">
            Ready to Transform Your School?
          </h2>

          <p
            className="
            mt-6
            text-lg
            md:text-xl
            text-blue-100
            max-w-3xl
            mx-auto
            leading-8
            "
          >
            Join EduOS and experience a smarter way to manage students,
            teachers, homework, marks, and school operations through one
            powerful platform.
          </p>

          <div
            className="
            mt-10
            flex
            flex-wrap
            justify-center
            gap-5
            "
          >
            <Link
              href="/login"
              className="
              flex
              items-center
              gap-3
              bg-white
              text-blue-700
              font-bold
              px-8
              py-4
              rounded-xl
              shadow-lg
              hover:scale-105
              transition
              "
            >
              <LogIn size={22} />
              Access EduOS
            </Link>

            <a
              href="#features"
              className="
              flex
              items-center
              gap-3
              border-2
              border-white
              px-8
              py-4
              rounded-xl
              font-semibold
              hover:bg-white
              hover:text-blue-700
              transition
              "
            >
              Explore Platform
              <ArrowRight size={22} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
