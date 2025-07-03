
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AuthButton = () => {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <Button variant="outline" disabled>Loading...</Button>;
  }

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={() => navigate('/admin')}>
          <User className="w-4 h-4 mr-2" />
          Admin
        </Button>
        <Button variant="outline" onClick={signOut}>
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <Button onClick={() => navigate('/auth')}>
      <LogIn className="w-4 h-4 mr-2" />
      Sign In
    </Button>
  );
};

export default AuthButton;
