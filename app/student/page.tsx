import Link from 'next/link';
import {
  BookOpen,
  CalendarCheck,
  ChartBar,
  FileText,
  FolderOpen,
  GraduationCap,
  Sparkles,
} from 'lucide-react';

export default function StudentPage() {
  const modules = [
    {
      title: 'Homework',
      description: 'View assignments and complete your tasks.',
      href: '/student/homework',
      icon: <BookOpen size={45} />,
      image: '📝',
      bg: 'from-blue-500 to-cyan-400',
    },
    {
      title: 'Attendance',
      description: 'Check your attendance record.',
      href: '/student/attendance',
      icon: <CalendarCheck size={45} />,
      image: '📅',
      bg: 'from-green-500 to-emerald-400',
    },
    {
      title: 'Marks',
      description: 'View exams and academic results.',
      href: '/student/marks',
      icon: <ChartBar size={45} />,
      image: '📊',
      bg: 'from-purple-500 to-pink-400',
    },
    {
      title: 'Subjects',
      description: 'View your enrolled subjects.',
      href: '/student/subjects',
      icon: <GraduationCap size={45} />,
      image: '📚',
      bg: 'from-indigo-500 to-blue-400',
    },
    {
      title: 'Resources',
      description: 'Access notes, PDFs and learning material.',
      href: '/student/resources',
      icon: <FolderOpen size={45} />,
      image: '🌎',
      bg: 'from-orange-500 to-yellow-400',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Hero */}
      <div
        className="
        bg-gradient-to-r
        from-blue-700
        to-indigo-600
        rounded-3xl
        p-10
        text-white
        shadow-xl
        mb-10
      "
      >
        <div className="flex items-center gap-4">
          <GraduationCap size={55} />

          <div>
            <h1 className="text-4xl font-bold">Student Dashboard</h1>

            <p className="mt-3 text-blue-100 text-lg">
              Welcome to your EduOS learning portal. Your complete academic
              journey in one place.
            </p>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">
        {[
          ['Subjects', '--', '📚'],
          ['Homework', '--', '📝'],
          ['Attendance', '--', '📅'],
          ['Performance', '--', '🏆'],
        ].map((item) => (
          <div
            key={item[0]}
            className="
              bg-white
              rounded-2xl
              shadow
              p-6
              hover:shadow-xl
              transition
            "
          >
            <div className="text-3xl">{item[2]}</div>

            <h3 className="text-gray-500 mt-3">{item[0]}</h3>

            <p className="text-3xl font-bold text-blue-600 mt-2">{item[1]}</p>
          </div>
        ))}
      </div>

      {/* Modules */}

      <div className="flex items-center gap-3 mb-6">
        <Sparkles className="text-blue-600" />

        <h2 className="text-3xl font-bold">Student Modules</h2>
      </div>

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3
        gap-8
      "
      >
        {modules.map((module) => (
          <Link
            key={module.title}
            href={module.href}
            className="
              group
              bg-white
              rounded-3xl
              overflow-hidden
              shadow
              hover:shadow-2xl
              hover:-translate-y-2
              transition
            "
          >
            {/* Visual Area */}
            <div
              className={`
                h-40
                bg-gradient-to-br
                ${module.bg}
                flex
                items-center
                justify-center
                text-7xl
              `}
            >
              {module.image}
            </div>

            <div className="p-6">
              <div className="text-blue-600">{module.icon}</div>

              <h3 className="text-2xl font-bold mt-4">{module.title}</h3>

              <p className="text-gray-600 mt-2">{module.description}</p>

              <div
                className="
                mt-5
                text-blue-600
                font-semibold
                group-hover:translate-x-2
                transition
              "
              >
                Open →
              </div>
            </div>
          </Link>
        ))}

        {/* Learning Center */}

        <div
          className="
            rounded-3xl
            shadow-xl
            p-6
            text-white
            bg-gradient-to-br
            from-blue-700
            to-indigo-900
          "
        >
          <FileText size={50} />

          <h3 className="text-2xl font-bold mt-5">Learning Center</h3>

          <p className="mt-3 text-blue-100">
            Your complete digital education workspace.
          </p>
        </div>
      </div>
    </div>
  );
}
