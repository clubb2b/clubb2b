import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export type MembershipTier = 'basic' | 'premium' | 'vip' | 'ultra_vip' | 'platinum';
export type SubscriptionStatus = 'active' | 'cancelled' | 'expired' | 'pending';
export type PaymentFrequency = 'monthly' | 'quarterly' | 'yearly';

export interface VIPMembership {
  id: string;
  user_id: string;
  tier: MembershipTier;
  status: SubscriptionStatus;
  payment_frequency: PaymentFrequency;
  monthly_price: number;
  start_date: string;
  end_date?: string;
  auto_renew: boolean;
  created_at: string;
  updated_at: string;
}

export interface MembershipBenefit {
  id: string;
  tier: MembershipTier;
  benefit_name: string;
  benefit_description?: string;
  is_active: boolean;
}

export interface TransactionFee {
  id: string;
  membership_tier: MembershipTier;
  service_type: string;
  fee_percentage: number;
  min_fee?: number;
  max_fee?: number;
  currency: string;
}

export const MEMBERSHIP_TIERS = {
  basic: { name: 'Basic', price: 0, color: 'gray' },
  premium: { name: 'Premium', price: 500, color: 'blue' },
  vip: { name: 'VIP', price: 2000, color: 'purple' },
  ultra_vip: { name: 'Ultra VIP', price: 5000, color: 'gold' },
  platinum: { name: 'Platinum', price: 10000, color: 'platinum' }
} as const;

export const useMembership = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['membership', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('vip_memberships')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .single();
      
      if (error && error.code !== 'PGRST116') {
        throw error;
      }
      
      return data as VIPMembership | null;
    },
    enabled: !!user
  });
};

export const useMembershipBenefits = (tier?: MembershipTier) => {
  return useQuery({
    queryKey: ['membership-benefits', tier],
    queryFn: async () => {
      let query = supabase
        .from('membership_benefits')
        .select('*')
        .eq('is_active', true);
      
      if (tier) {
        query = query.eq('tier', tier);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data as MembershipBenefit[];
    }
  });
};

export const useTransactionFees = (tier?: MembershipTier) => {
  return useQuery({
    queryKey: ['transaction-fees', tier],
    queryFn: async () => {
      let query = supabase.from('transaction_fees').select('*');
      
      if (tier) {
        query = query.eq('membership_tier', tier);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data as TransactionFee[];
    }
  });
};

export const useCreateMembership = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async (membership: Omit<VIPMembership, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('vip_memberships')
        .insert({
          ...membership,
          user_id: user.id
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['membership'] });
    }
  });
};

export const useUpdateMembership = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<VIPMembership> & { id: string }) => {
      const { data, error } = await supabase
        .from('vip_memberships')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['membership'] });
    }
  });
};

export const useAnalytics = () => {
  const { user } = useAuth();
  
  const trackEvent = useMutation({
    mutationFn: async (event: {
      event_type: string;
      event_category: string;
      event_data?: any;
      page_url?: string;
    }) => {
      const { error } = await supabase
        .from('analytics_events')
        .insert({
          ...event,
          user_id: user?.id || null,
          user_agent: navigator.userAgent,
          page_url: event.page_url || window.location.href
        });
      
      if (error) throw error;
    }
  });
  
  return { trackEvent: trackEvent.mutate };
};