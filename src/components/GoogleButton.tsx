
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Chrome } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const GoogleButton = () => {
  const [loading, setLoading] = useState(false);
  const { signInWithGoogle } = useAuth();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Google sign-in error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button 
      variant="outline" 
      onClick={handleGoogleSignIn}
      disabled={loading}
      className="w-full h-12 gap-2 border-slate-200 hover:bg-slate-50"
    >
      <Chrome className="h-4 w-4" />
      {loading ? 'Signing in...' : 'Continue with Google'}
    </Button>
  );
};

export default GoogleButton;
