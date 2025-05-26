
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { LogOut, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useProperty } from '@/contexts/PropertyContext';
import PropertySwitcher from '@/components/PropertySwitcher';
import { toast } from 'sonner';

const Layout = () => {
  const { currentUser, logout } = useAuth();
  const { isLoading } = useProperty();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/auth');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 text-lg">Switching property...</p>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-blue-50">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-16 bg-white/80 backdrop-blur-sm border-b border-slate-200/60 flex items-center px-6 shadow-sm">
            <SidebarTrigger className="mr-4" />
            <PropertySwitcher />
            <div className="flex-1" />
            <div className="flex items-center space-x-4">
              {currentUser && (
                <div className="flex items-center space-x-2 text-sm text-slate-600">
                  {currentUser.photoURL ? (
                    <img 
                      src={currentUser.photoURL} 
                      alt={currentUser.displayName || 'User'} 
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <span className="hidden sm:block">
                    {currentUser.displayName || currentUser.email || currentUser.phoneNumber}
                  </span>
                </div>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-2 text-slate-600 hover:text-slate-800"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </header>
          <main className="flex-1 p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
