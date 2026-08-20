import {
  BookOpen,
  ClipboardCheck,
  BarChart3,
  Users,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <BookOpen size={40} />,
      title: 'Homework Management',
      description:
        'Teachers can create assignments while students can easily view and complete their homework.',
    },

    {
      icon: <ClipboardCheck size={40} />,
      title: 'Attendance Tracking',
      description:
        'Maintain digital attendance records and monitor student participation.',
    },

    {
      icon: <BarChart3 size={40} />,
      title: 'Marks & Results',
      description:
        'Manage exams, marks, and academic performance in one place.',
    },

    {
      icon: <Users size={40} />,
      title: 'Multi Portal System',
      description:
        'Separate dashboards for students, teachers, and administrators.',
    },

    {
      icon: <ShieldCheck size={40} />,
      title: 'Secure Platform',
      description:
        'Powered by Supabase authentication with protected user access.',
    },

    {
      icon: <Zap size={40} />,
      title: 'Modern Technology',
      description:
        'Built using Next.js, React, Tailwind CSS, TypeScript, and Supabase.',
    },
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-blue-600 font-semibold uppercase tracking-wider">
            Features
          </span>

          <h2 className="text-5xl font-bold text-gray-900 mt-4">
            Everything Your School Needs
          </h2>

          <p className="mt-5 text-lg text-gray-600">
            EduOS provides powerful tools to manage learning, communication, and
            administration from one platform.
          </p>
        </div>

        {/* Cards */}
        <div
          className="
          mt-14
          grid
          md:grid-cols-2
          lg:grid-cols-3
          gap-8
          "
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="
              bg-white
              rounded-2xl
              p-8
              shadow-md
              hover:shadow-xl
              hover:-translate-y-2
              transition-all
              duration-300
              "
            >
              <div
                className="
                w-16
                h-16
                flex
                items-center
                justify-center
                rounded-xl
                bg-blue-100
                text-blue-700
                "
              >
                {feature.icon}
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-6">
                {feature.title}
              </h3>

              <p className="mt-4 text-gray-600 leading-7">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
