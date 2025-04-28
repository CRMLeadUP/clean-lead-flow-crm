
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';
import { SubscriptionProvider } from './contexts/SubscriptionContext';
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import ResetPassword from "./pages/ResetPassword";
import Subscription from "./pages/Subscription";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <SubscriptionProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/leads" element={<Leads />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/subscription" element={<Subscription />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </SubscriptionProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
