
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  isSignInWithEmailLink
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { toast } from 'sonner';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithPhone: (phoneNumber: string) => Promise<ConfirmationResult>;
  confirmPhoneSignIn: (confirmationResult: ConfirmationResult, otp: string) => Promise<void>;
  sendEmailLink: (email: string) => Promise<void>;
  confirmEmailLink: (email: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Google Sign-In
  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success('Successfully signed in with Google!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign in with Google');
      throw error;
    }
  };

  // Phone Sign-In
  const signInWithPhone = async (phoneNumber: string): Promise<ConfirmationResult> => {
    try {
      // Initialize reCAPTCHA
      if (!(window as any).recaptchaVerifier) {
        (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          size: 'invisible',
          callback: () => {
            console.log('reCAPTCHA solved');
          }
        });
      }

      const appVerifier = (window as any).recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      toast.success('OTP sent to your phone!');
      return confirmationResult;
    } catch (error: any) {
      toast.error(error.message || 'Failed to send OTP');
      throw error;
    }
  };

  // Confirm Phone OTP
  const confirmPhoneSignIn = async (confirmationResult: ConfirmationResult, otp: string) => {
    try {
      await confirmationResult.confirm(otp);
      toast.success('Phone verification successful!');
    } catch (error: any) {
      toast.error('Invalid OTP. Please try again.');
      throw error;
    }
  };

  // Email Link Sign-In
  const sendEmailLink = async (email: string) => {
    try {
      const actionCodeSettings = {
        url: window.location.origin + '/auth',
        handleCodeInApp: true,
      };
      
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      localStorage.setItem('emailForSignIn', email);
      toast.success('Sign-in link sent to your email!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to send email link');
      throw error;
    }
  };

  // Confirm Email Link
  const confirmEmailLink = async (email: string) => {
    try {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        await signInWithEmailLink(auth, email, window.location.href);
        localStorage.removeItem('emailForSignIn');
        toast.success('Successfully signed in via email link!');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign in with email link');
      throw error;
    }
  };

  // Logout
  const logout = async () => {
    try {
      await firebaseSignOut(auth);
      toast.success('Logged out successfully!');
    } catch (error: any) {
      toast.error('Failed to logout');
      throw error;
    }
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Check for email link sign-in on page load
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = localStorage.getItem('emailForSignIn');
      if (!email) {
        email = window.prompt('Please provide your email for confirmation');
      }
      if (email) {
        confirmEmailLink(email);
      }
    }

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    loading,
    signInWithGoogle,
    signInWithPhone,
    confirmPhoneSignIn,
    sendEmailLink,
    confirmEmailLink,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
