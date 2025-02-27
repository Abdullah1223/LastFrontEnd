import { PostgrestError } from '@supabase/supabase-js';

export function handleSupabaseError(error: PostgrestError | null) {
  if (!error) return null;

  // Log the error for debugging
  console.error('Supabase error:', error);

  // Return user-friendly error messages
  switch (error.code) {
    case '23505': // Unique violation
      return 'This record already exists.';
    case '23503': // Foreign key violation
      return 'Referenced record does not exist.';
    case '42P01': // Undefined table
      return 'Database configuration error.';
    default:
      return 'An unexpected error occurred. Please try again.';
  }
}