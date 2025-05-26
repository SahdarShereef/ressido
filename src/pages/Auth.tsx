
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Phone, Chrome } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import GoogleButton from '@/components/GoogleButton';
import PhoneOtpLogin from '@/components/PhoneOtpLogin';
import EmailLinkLogin from '@/components/EmailLinkLogin';

const Auth = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mx-auto flex items-center justify-center mb-4">
            <span className="text-white font-bold text-2xl">R</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Ressido
          </h1>
          <p className="text-slate-600">Manage your property with ease</p>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-xl text-slate-800">
              Welcome Back
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Tabs defaultValue="google" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="google" className="gap-2">
                  <Chrome className="h-4 w-4" />
                  Google
                </TabsTrigger>
                <TabsTrigger value="phone" className="gap-2">
                  <Phone className="h-4 w-4" />
                  Phone
                </TabsTrigger>
                <TabsTrigger value="email" className="gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </TabsTrigger>
              </TabsList>

              <TabsContent value="google" className="space-y-4">
                <GoogleButton />
              </TabsContent>

              <TabsContent value="phone" className="space-y-4">
                <PhoneOtpLogin />
              </TabsContent>

              <TabsContent value="email" className="space-y-4">
                <EmailLinkLogin />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-slate-500">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Auth;
