import Link from "next/link";

export default function Sidebar() {
  return (
    <nav>
      <Link href="/student">
        Dashboard
      </Link>

      <Link href="/student/subjects">
        Subjects
      </Link>

      <Link href="/student/homework">
        Homework
      </Link>

      <Link href="/student/marks">
        Marks
      </Link>

      <Link href="/student/attendance">
        Attendance
      </Link>

      <Link href="/student/resources">
        Resources
      </Link>
    </nav>
  );
}
