'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  UserRound,
  Trophy,
  Star,
  Flame,
  Clock,
} from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

type Subject = {
  id: number;
  name: string;
  teacher?: string;
};

const subjectThemes = [
  {
    icon: '⚛️',
    color: 'from-cyan-500 via-blue-600 to-indigo-700',
    description: 'Understand the laws of the universe.',
    progress: 72,
  },
  {
    icon: '📐',
    color: 'from-purple-500 via-fuchsia-500 to-pink-600',
    description: 'Master logical thinking and mathematics.',
    progress: 81,
  },
  {
    icon: '🧬',
    color: 'from-green-500 via-emerald-500 to-teal-600',
    description: 'Discover the science of living organisms.',
    progress: 64,
  },
  {
    icon: '📖',
    color: 'from-orange-400 via-amber-500 to-red-500',
    description: 'Build communication and language skills.',
    progress: 76,
  },
  {
    icon: '💻',
    color: 'from-sky-500 via-blue-600 to-indigo-700',
    description: 'Learn modern computing and technology.',
    progress: 58,
  },
];

export default function StudentSubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSubjects();
  }, []);

  async function loadSubjects() {
    try {
      /*
       * 1. Get the currently logged-in Auth user
       */
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        console.error('Auth error:', authError?.message);
        setSubjects([]);
        setLoading(false);
        return;
      }

      /*
       * 2. Convert the internal Auth email:
       *
       * edu-os-004@eduos.local
       *
       * into:
       *
       * EDU-OS-004
       */
      if (!user.email) {
        console.error('Logged-in user has no email');
        setSubjects([]);
        setLoading(false);
        return;
      }

      const registrationNo = user.email
        .split('@')[0]
        .toUpperCase();

      /*
       * 3. Find this student's record.
       *
       * Hifza:
       * EDU-OS-004 → student ID 21
       */
      const {
        data: student,
        error: studentError,
      } = await supabase
        .from('students')
        .select('id')
        .eq('registration_no', registrationNo)
        .single();

      if (studentError || !student) {
        console.error(
          'Student not found:',
          studentError?.message
        );

        setSubjects([]);
        setLoading(false);
        return;
      }

      /*
       * 4. Get ONLY the subject IDs assigned
       *    to this student.
       *
       * We deliberately query student_subjects separately.
       * This avoids depending on a Supabase relationship.
       */
      const {
        data: assignments,
        error: assignmentError,
      } = await supabase
        .from('student_subjects')
        .select('subject_id')
        .eq('student_id', student.id);

      if (assignmentError) {
        console.error(
          'Error loading assignments:',
          assignmentError.message
        );

        setSubjects([]);
        setLoading(false);
        return;
      }

      if (!assignments || assignments.length === 0) {
        setSubjects([]);
        setLoading(false);
        return;
      }

      /*
       * 5. Extract the assigned subject IDs.
       */
      const subjectIds = assignments
        .map((assignment) => assignment.subject_id)
        .filter((id) => id !== null && id !== undefined);

      if (subjectIds.length === 0) {
        setSubjects([]);
        setLoading(false);
        return;
      }

      /*
       * 6. Fetch ONLY those subjects.
       */
      const {
        data: subjectData,
        error: subjectError,
      } = await supabase
        .from('subjects')
        .select('id, name, teacher')
        .in('id', subjectIds)
        .order('id');

      if (subjectError) {
        console.error(
          'Error loading subjects:',
          subjectError.message
        );

        setSubjects([]);
        setLoading(false);
        return;
      }

      /*
       * 7. Display only the student's assigned subjects.
       */
      setSubjects((subjectData as Subject[]) || []);
      setLoading(false);
    } catch (error) {
      console.error(
        'Unexpected error loading subjects:',
        error
      );

      setSubjects([]);
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="text-xl font-semibold text-gray-600">
          Loading your learning space...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-10">

      {/* Hero */}
      <div className="w-full overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-cyan-600 p-10 text-white shadow-2xl">

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-10 items-center">

          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur">
              <GraduationCap size={18} />
              <span className="font-medium">
                EduOS Student Portal
              </span>
            </div>

            <h1 className="mt-6 text-4xl lg:text-5xl font-extrabold">
              Welcome Back 👋
            </h1>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-blue-100">
              Continue your learning journey, complete assignments,
              improve your progress, and unlock new achievements.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">

            <div className="rounded-2xl bg-white/20 p-5 text-center backdrop-blur">
              <Flame size={28} className="mx-auto" />
              <p className="mt-3 text-3xl font-bold">5</p>
              <p className="text-sm text-blue-100">Day Streak</p>
            </div>

            <div className="rounded-2xl bg-white/20 p-5 text-center backdrop-blur">
              <Star size={28} className="mx-auto" />
              <p className="mt-3 text-3xl font-bold">240</p>
              <p className="text-sm text-blue-100">XP</p>
            </div>

            <div className="rounded-2xl bg-white/20 p-5 text-center backdrop-blur">
              <Trophy size={28} className="mx-auto" />
              <p className="mt-3 text-3xl font-bold">3</p>
              <p className="text-sm text-blue-100">Level</p>
            </div>

          </div>
        </div>
      </div>

      {/* Heading */}
      <div className="mt-10 mb-8">
        <h2 className="text-4xl font-bold text-gray-900">
          My Subjects
        </h2>

        <p className="mt-2 text-lg text-gray-600">
          Everything you're currently studying.
        </p>
      </div>

      {/* Subjects */}
      {subjects.length > 0 ? (

        <div className="space-y-8">

          {subjects.map((subject, index) => {

            const theme =
              subjectThemes[index % subjectThemes.length];

            return (
              <div
                key={subject.id}
                className="
                  overflow-hidden
                  rounded-3xl
                  bg-white
                  shadow-xl
                  hover:shadow-2xl
                  transition
                  hover:-translate-y-1
                "
              >

                <div className="flex flex-col xl:flex-row">

                  {/* Visual */}
                  <div
                    className={`
                      xl:w-80
                      w-full
                      h-64
                      xl:h-auto
                      bg-gradient-to-br
                      ${theme.color}
                      flex
                      items-center
                      justify-center
                      p-10
                    `}
                  >

                    <div className="text-center text-white">

                      <div className="text-8xl">
                        {theme.icon}
                      </div>

                      <h3 className="mt-6 text-3xl font-bold">
                        {subject.name}
                      </h3>

                    </div>

                  </div>

                  {/* Content */}
                  <div className="flex-1 p-10">

                    <div className="flex items-start justify-between">

                      <div>

                        <h3 className="text-3xl font-bold">
                          {subject.name}
                        </h3>

                        <p className="mt-3 text-lg text-gray-600">
                          {theme.description}
                        </p>

                      </div>

                      <BookOpen
                        size={36}
                        className="text-blue-600 shrink-0"
                      />

                    </div>

                    <div className="mt-8 grid md:grid-cols-2 gap-5">

                      <div className="flex items-center gap-4 rounded-2xl bg-slate-100 p-5">

                        <UserRound
                          size={24}
                          className="text-blue-600"
                        />

                        <div>

                          <p className="text-sm text-gray-500">
                            Teacher
                          </p>

                          <p className="font-semibold">
                            {subject.teacher ||
                              'Teacher not assigned'}
                          </p>

                        </div>

                      </div>

                      <div className="flex items-center gap-4 rounded-2xl bg-slate-100 p-5">

                        <Clock
                          size={24}
                          className="text-green-600"
                        />

                        <div>

                          <p className="text-sm text-gray-500">
                            Status
                          </p>

                          <p className="font-semibold">
                            Active Learning
                          </p>

                        </div>

                      </div>

                    </div>

                    <div className="mt-8">

                      <div className="flex justify-between mb-2">

                        <span className="font-medium text-gray-700">
                          Learning Progress
                        </span>

                        <span className="font-bold text-blue-600">
                          {theme.progress}%
                        </span>

                      </div>

                      <div className="h-3 rounded-full overflow-hidden bg-gray-200">

                        <div
                          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-600"
                          style={{
                            width: `${theme.progress}%`,
                          }}
                        />

                      </div>

                    </div>

                    <button
                      className="
                        mt-8
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        bg-blue-600
                        px-8
                        py-3
                        text-white
                        font-semibold
                        hover:bg-blue-700
                        transition
                      "
                    >
                      Continue Learning
                      <ArrowRight size={18} />
                    </button>

                  </div>

                </div>

              </div>
            );
          })}

        </div>

      ) : (

        <div className="rounded-3xl bg-white p-12 text-center shadow-lg">

          <BookOpen
            size={56}
            className="mx-auto mb-6 text-gray-400"
          />

          <h3 className="text-2xl font-bold text-gray-800">
            No Subjects Available
          </h3>

          <p className="mt-3 text-gray-500">
            Your teacher hasn't assigned any subjects yet.
          </p>

        </div>

      )}

    </div>
  );
}
