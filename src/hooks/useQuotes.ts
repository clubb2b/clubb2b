
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesInsert } from '@/integrations/supabase/types';

export type Quote = Tables<'quotes'>;
export type QuoteInsert = Omit<TablesInsert<'quotes'>, 'id' | 'created_at' | 'updated_at' | 'quote_number'>;

export const useQuotes = () => {
  return useQuery({
    queryKey: ['quotes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('quotes')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
};

export const useAddQuote = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (quote: QuoteInsert) => {
      // Cast the quote to match the expected type, allowing the database trigger to set quote_number
      const { data, error } = await supabase
        .from('quotes')
        .insert(quote as any)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quotes'] });
    },
  });
};
