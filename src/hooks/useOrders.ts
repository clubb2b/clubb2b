
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesInsert } from '@/integrations/supabase/types';

export type Order = Tables<'orders'>;
export type OrderInsert = Omit<TablesInsert<'orders'>, 'id' | 'created_at' | 'updated_at' | 'order_number'>;

export const useOrders = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          customers (*),
          vehicles (*),
          order_payments (*)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
};

export const useAddOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (order: OrderInsert) => {
      const { data, error } = await supabase
        .from('orders')
        .insert(order)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};
