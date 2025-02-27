import { supabase } from '../lib/supabase';
import { handleSupabaseError } from '../utils/error-handling';

export const DatabaseService = {
  async getUser(userId: string) {
    const { data, error } = await supabase
      .from('User')
      .select('*')
      .eq('id', userId)
      .single();
      
    if (error) {
      throw new Error(handleSupabaseError(error));
    }
    
    return data;
  },

  async updateUser(userId: string, updates: any) {
    const { data, error } = await supabase
      .from('User')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();
      
    if (error) {
      throw new Error(handleSupabaseError(error));
    }
    
    return data;
  }
};