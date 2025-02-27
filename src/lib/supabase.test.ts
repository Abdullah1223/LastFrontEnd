import { supabase } from './supabase';

// Test the connection
const testConnection = async () => {
  try {
    const { data, error } = await supabase.from('User').select('count');
    if (error) {
      console.error('Supabase connection error:', error);
      return false;
    }
    console.log('Supabase connected successfully');
    return true;
  } catch (err) {
    console.error('Supabase test failed:', err);
    return false;
  }
};

export { testConnection };