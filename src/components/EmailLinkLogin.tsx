
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const EmailLinkLogin = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { sendEmailLink } = useAuth();

  const handleSendEmailLink = async () => {
    if (!email) return;
    
    setLoading(true);
    try {
      await sendEmailLink(email);
      setEmailSent(true);
    } catch (error) {
      console.error('Email link error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <Mail className="h-8 w-8 text-green-600" />
        </div>
        <div>
          <h3 className="text-lg font-medium text-slate-800">Check your email</h3>
          <p className="text-slate-600 mt-1">
            We've sent a sign-in link to <strong>{email}</strong>
          </p>
        </div>
        <Button 
          variant="ghost" 
          onClick={() => setEmailSent(false)}
          className="text-slate-600"
        >
          Use a different email
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-12"
        />
      </div>
      <Button 
        onClick={handleSendEmailLink}
        disabled={loading || !email}
        className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
      >
        <Mail className="h-4 w-4 mr-2" />
        {loading ? 'Sending...' : 'Send Sign-in Link'}
      </Button>
    </div>
  );
};

export default EmailLinkLogin;
