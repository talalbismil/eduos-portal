import {
  Cloud,
  ShieldCheck,
  Smartphone,
  Cpu,
  Target,
  Sparkles,
} from 'lucide-react';

export default function WhyEduOS() {
  const benefits = [
    {
      icon: <Cloud size={40} />,
      title: 'Cloud Based',
      description:
        'Access school data anytime from anywhere with a modern cloud platform.',
    },

    {
      icon: <ShieldCheck size={40} />,
      title: 'Secure System',
      description:
        'Protected authentication and role-based access for every user.',
    },

    {
      icon: <Smartphone size={40} />,
      title: 'Responsive Design',
      description:
        'EduOS works smoothly on computers, tablets, and mobile devices.',
    },

    {
      icon: <Cpu size={40} />,
      title: 'Future Ready',
      description:
        'Built with modern technologies prepared for future AI features.',
    },

    {
      icon: <Target size={40} />,
      title: 'Simple Management',
      description:
        'Reduce paperwork and manage academic operations efficiently.',
    },

    {
      icon: <Sparkles size={40} />,
      title: 'Modern Experience',
      description: 'A clean and intuitive interface designed for schools.',
    },
  ];

  return (
    <section id="why" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-blue-600 font-semibold uppercase tracking-wider">
            Why EduOS
          </span>

          <h2 className="text-5xl font-bold text-gray-900 mt-4">
            Built For The Future Of Education
          </h2>

          <p className="mt-5 text-lg text-gray-600">
            EduOS combines simplicity, security, and modern technology to create
            a complete digital education ecosystem.
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
          {benefits.map((item, index) => (
            <div
              key={index}
              className="
              border
              rounded-2xl
              p-8
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
                bg-indigo-100
                text-indigo-700
                "
              >
                {item.icon}
              </div>

              <h3 className="mt-6 text-2xl font-bold text-gray-900">
                {item.title}
              </h3>

              <p className="mt-4 text-gray-600 leading-7">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
