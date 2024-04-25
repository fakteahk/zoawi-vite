import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://pwakmdomurtaxavvnhjk.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3YWttZG9tdXJ0YXhhdnZuaGprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMyODAyMzQsImV4cCI6MjAyODg1NjIzNH0.FSL9DhXOnXp6t7njYUdOF4_Xww31rU53hxAB0-c_76k";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
