import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/app'

  if (code) {
    const supabase = createClient(
      'https://zurkzjhctyfhqcztimnf.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1cmt6amhjdHlmaHFjenRpbW5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2NzYzMTQsImV4cCI6MjA5MjI1MjMxNH0.a_x5O5JZ0YPHs9KMLPCTXnDxuQdd5uhhdaHH8a1jaQk'
    )
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) return NextResponse.redirect(`${origin}${next}`)
  }

  return NextResponse.redirect(`${origin}/login?error=auth`)
}
