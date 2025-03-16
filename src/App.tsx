
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider, useUser } from "@/context/UserContext";
import { NavigationBar } from "@/components/NavigationBar";
import LoginPage from "./pages/LoginPage";
import BookingPage from "./pages/BookingPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import ExportPage from "./pages/ExportPage";
import NotFound from "./pages/NotFound";

// Add necessary dependencies
import { motion, AnimatePresence } from "framer-motion";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Protected route component
const ProtectedRoute = ({ 
  children, 
  redirectTo,
  condition
}: { 
  children: React.ReactNode, 
  redirectTo: string,
  condition: boolean
}) => {
  return condition ? <>{children}</> : <Navigate to={redirectTo} />;
};

const AppRoutes = () => {
  const { isLoggedIn, isBookingComplete, isLoading } = useUser();
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route 
          path="/booking" 
          element={
            <ProtectedRoute redirectTo="/" condition={isLoggedIn}>
              <BookingPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/confirmation" 
          element={
            <ProtectedRoute redirectTo="/" condition={isLoggedIn && isBookingComplete}>
              <ConfirmationPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/export" 
          element={<ExportPage />} 
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <UserProvider>
        <BrowserRouter>
          <div className="relative min-h-screen">
            <NavigationBar />
            <AppRoutes />
          </div>
        </BrowserRouter>
      </UserProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
