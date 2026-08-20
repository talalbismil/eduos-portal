import { createClient } from '@/utils/supabase/server';

export async function POST(req: Request) {
  const supabase = await createClient();

  const body = await req.json();

  const { data, error } = await supabase
    .from('marks')
    .insert([
      {
        student_id: body.student_id,
        subject: body.subject,
        exam: body.exam,
        obtained_marks: body.obtained_marks,
        total_marks: body.total_marks,
      },
    ])
    .select();

  if (error) {
    return Response.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }

  return Response.json({
    success: true,
    data,
  });
}
