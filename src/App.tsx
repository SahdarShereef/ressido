
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { PropertyProvider } from "./contexts/PropertyContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PropertyRoute from "./components/PropertyRoute";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import PropertySelection from "./pages/PropertySelection";
import TenantOnboarding from "./pages/TenantOnboarding";
import Tenants from "./pages/Tenants";
import RoomBlueprint from "./components/RoomBlueprint";
import Payments from "./pages/Payments";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <PropertyProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route path="/onboard/:token" element={<TenantOnboarding />} />
              <Route path="/properties" element={
                <ProtectedRoute>
                  <PropertySelection />
                </ProtectedRoute>
              } />
              <Route path="/" element={
                <ProtectedRoute>
                  <PropertyRoute>
                    <Layout />
                  </PropertyRoute>
                </ProtectedRoute>
              }>
                <Route index element={<Index />} />
                <Route path="tenants" element={<Tenants />} />
                <Route path="rooms" element={<RoomBlueprint />} />
                <Route path="payments" element={<Payments />} />
                <Route path="reports" element={<Reports />} />
                <Route path="settings" element={<Settings />} />
                <Route path="help" element={<Help />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </PropertyProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
