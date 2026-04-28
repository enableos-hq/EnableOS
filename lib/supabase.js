import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    'https://zurkzjhctyfhqcztimnf.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1cmt6amhjdHlmaHFjenRpbW5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2NzYzMTQsImV4cCI6MjA5MjI1MjMxNH0.a_x5O5JZ0YPHs9KMLPCTXnDxuQdd5uhhdaHH8a1jaQk'
  )
}
