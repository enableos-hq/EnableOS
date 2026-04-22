import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zurkzjhctyfhqcztimnf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1cmt6amhjdHlmaHFjenRpbW5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2NzYzMTQsImV4cCI6MjA5MjI1MjMxNH0.a_x5O5JZ0YPHs9KMLPCTXnDxuQdd5uhhdaHH8a1jaQk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
