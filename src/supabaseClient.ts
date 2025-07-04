import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bgluvhaacblcwnxmwzvr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnbHV2aGFhY2JsY3dueG13enZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0MzM2MjIsImV4cCI6MjA2NzAwOTYyMn0.jMdMuuu77LDp7Kau-NEgZZrOCWMF2VyYh3D6RKMCCXI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 