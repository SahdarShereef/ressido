
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Phone } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ConfirmationResult } from 'firebase/auth';

const PhoneOtpLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const { signInWithPhone, confirmPhoneSignIn } = useAuth();

  const handleSendOTP = async () => {
    if (!phoneNumber) return;
    
    setLoading(true);
    try {
      const result = await signInWithPhone(phoneNumber);
      setConfirmationResult(result);
    } catch (error) {
      console.error('Phone sign-in error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!confirmationResult || !otp) return;
    
    setLoading(true);
    try {
      await confirmPhoneSignIn(confirmationResult, otp);
    } catch (error) {
      console.error('OTP verification error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setConfirmationResult(null);
    setOtp('');
  };

  return (
    <div className="space-y-4">
      <div id="recaptcha-container"></div>
      
      {!confirmationResult ? (
        <>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="h-12"
            />
          </div>
          <Button 
            onClick={handleSendOTP}
            disabled={loading || !phoneNumber}
            className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          >
            <Phone className="h-4 w-4 mr-2" />
            {loading ? 'Sending...' : 'Send OTP'}
          </Button>
        </>
      ) : (
        <>
          <div className="space-y-2">
            <Label htmlFor="otp">Enter OTP</Label>
            <Input
              id="otp"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="h-12 text-center text-lg tracking-widest"
              maxLength={6}
            />
          </div>
          <Button 
            onClick={handleVerifyOTP}
            disabled={loading || !otp}
            className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          >
            {loading ? 'Verifying...' : 'Verify & Login'}
          </Button>
          <Button 
            variant="ghost" 
            onClick={handleBack}
            className="w-full text-slate-600"
          >
            Back to Phone Number
          </Button>
        </>
      )}
    </div>
  );
};

export default PhoneOtpLogin;
