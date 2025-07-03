import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Star, Gem, Award, Zap } from "lucide-react";
import { MEMBERSHIP_TIERS, useMembershipBenefits, useCreateMembership, useMembership } from "@/hooks/useMembership";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const VIPMembershipPlans = () => {
  const { user } = useAuth();
  const { data: currentMembership } = useMembership();
  const { data: allBenefits } = useMembershipBenefits();
  const createMembership = useCreateMembership();

  const tierIcons = {
    basic: <Star className="w-6 h-6" />,
    premium: <Crown className="w-6 h-6" />,
    vip: <Gem className="w-6 h-6" />,
    ultra_vip: <Award className="w-6 h-6" />,
    platinum: <Zap className="w-6 h-6" />
  };

  const tierColors = {
    basic: "border-gray-300",
    premium: "border-blue-500",
    vip: "border-purple-500",
    ultra_vip: "border-yellow-500",
    platinum: "border-indigo-500"
  };

  const handleUpgrade = async (tier: keyof typeof MEMBERSHIP_TIERS) => {
    if (!user) {
      toast.error("Please sign in to upgrade your membership");
      return;
    }

    try {
      await createMembership.mutateAsync({
        tier,
        status: 'pending',
        payment_frequency: 'monthly',
        monthly_price: MEMBERSHIP_TIERS[tier].price,
        start_date: new Date().toISOString(),
        auto_renew: true
      });
      
      toast.success(`Successfully upgraded to ${MEMBERSHIP_TIERS[tier].name}!`);
    } catch (error) {
      console.error('Upgrade error:', error);
      toast.error("Failed to upgrade membership. Please try again.");
    }
  };

  const getBenefitsForTier = (tier: keyof typeof MEMBERSHIP_TIERS) => {
    return allBenefits?.filter(benefit => benefit.tier === tier) || [];
  };

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6 text-white tracking-wider">
            VIP MEMBERSHIP TIERS
          </h2>
          <p className="text-xl text-gray-300 font-light mb-8">
            Unlock exclusive benefits and premium services
          </p>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {Object.entries(MEMBERSHIP_TIERS).map(([tier, details]) => {
            const benefits = getBenefitsForTier(tier as keyof typeof MEMBERSHIP_TIERS);
            const isCurrentTier = currentMembership?.tier === tier;
            
            return (
              <Card 
                key={tier} 
                className={`bg-gradient-to-b from-gray-800 to-gray-900 border-2 ${tierColors[tier as keyof typeof tierColors]} text-white relative overflow-hidden hover:scale-105 transition-all duration-300`}
              >
                {tier === 'vip' && (
                  <div className="absolute top-0 right-0 bg-purple-600 text-white px-3 py-1 text-sm font-semibold">
                    POPULAR
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4 text-white">
                    {tierIcons[tier as keyof typeof tierIcons]}
                  </div>
                  <CardTitle className="text-2xl font-light tracking-wide">
                    {details.name}
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    <span className="text-3xl font-light">${details.price.toLocaleString()}</span>
                    {details.price > 0 && <span className="text-sm">/month</span>}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  {benefits.map((benefit) => (
                    <div key={benefit.id} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-white">{benefit.benefit_name}</p>
                        {benefit.benefit_description && (
                          <p className="text-xs text-gray-400">{benefit.benefit_description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
                
                <CardFooter>
                  {isCurrentTier ? (
                    <Badge variant="secondary" className="w-full justify-center py-2">
                      Current Plan
                    </Badge>
                  ) : (
                    <Button 
                      onClick={() => handleUpgrade(tier as keyof typeof MEMBERSHIP_TIERS)}
                      disabled={createMembership.isPending}
                      className="w-full bg-white text-black hover:bg-gray-200 font-light tracking-wider transition-all duration-300"
                    >
                      {details.price === 0 ? 'Get Started' : 'Upgrade Now'}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-400 text-sm">
            All plans include our core features. Upgrade anytime for additional benefits.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Badge variant="outline" className="text-green-400 border-green-400">
              30-Day Money Back Guarantee
            </Badge>
            <Badge variant="outline" className="text-blue-400 border-blue-400">
              Cancel Anytime
            </Badge>
            <Badge variant="outline" className="text-purple-400 border-purple-400">
              24/7 Support
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VIPMembershipPlans;