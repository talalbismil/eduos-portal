export default function TechStack() {
  const technologies = [
    {
      name: 'Next.js',
      description: 'React framework for modern web applications.',
      icon: '▲',
    },
    {
      name: 'React',
      description: 'Powerful UI library for interactive interfaces.',
      icon: '⚛️',
    },
    {
      name: 'TypeScript',
      description: 'Strongly typed JavaScript for reliable development.',
      icon: '📘',
    },
    {
      name: 'Tailwind CSS',
      description: 'Utility-first CSS framework for beautiful designs.',
      icon: '🎨',
    },
    {
      name: 'Supabase',
      description: 'Authentication, database and backend services.',
      icon: '🟢',
    },
    {
      name: 'Vercel',
      description: 'Fast and reliable cloud deployment platform.',
      icon: '🚀',
    },
  ];

  return (
    <section
      id="technology"
      className="py-20 bg-gradient-to-br from-blue-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-5xl font-bold text-gray-900">Technology Stack</h2>

          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            EduOS is built using modern technologies to deliver a fast, secure,
            scalable and responsive learning platform.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl hover:-translate-y-2 transition duration-300"
            >
              <div className="text-5xl mb-5">{tech.icon}</div>

              <h3 className="text-2xl font-bold text-blue-700 mb-3">
                {tech.name}
              </h3>

              <p className="text-gray-600 leading-7">{tech.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
