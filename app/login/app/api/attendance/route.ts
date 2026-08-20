import { createClient } from '@/utils/supabase/server';

export async function POST(req: Request) {
  const supabase = await createClient();

  const body = await req.json();

  const { data, error } = await supabase
    .from('attendance')
    .insert([
      {
        student_id: body.student_id,
        status: body.status,
        date: new Date(),
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
