
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, User, Settings, Shield, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AuthButton = () => {
  const { user, profile, signOut, loading, isAdmin, isVIP } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <Button variant="outline" disabled>Loading...</Button>;
  }

  if (user) {
    const displayName = profile?.first_name 
      ? `${profile.first_name} ${profile.last_name || ''}`.trim()
      : user.email?.split('@')[0] || 'User';

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2 relative">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">{displayName}</span>
            {isVIP && <Crown className="w-3 h-3 text-yellow-400" />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="px-2 py-1.5 text-sm">
            <div className="font-medium">{displayName}</div>
            <div className="text-xs text-gray-500">{user.email}</div>
            {isVIP && (
              <div className="text-xs text-yellow-600 font-medium">
                {profile?.role?.toUpperCase()} MEMBER
              </div>
            )}
          </div>
          <DropdownMenuSeparator />
          {isAdmin && (
            <DropdownMenuItem onClick={() => navigate('/admin')}>
              <Shield className="w-4 h-4 mr-2" />
              Admin Dashboard
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={() => navigate('/profile')}>
            <Settings className="w-4 h-4 mr-2" />
            Profile Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={signOut} className="text-red-600">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button onClick={() => navigate('/auth')} className="flex items-center gap-2">
      <LogIn className="w-4 h-4" />
      <span className="hidden sm:inline">Sign In</span>
    </Button>
  );
};

export default AuthButton;
