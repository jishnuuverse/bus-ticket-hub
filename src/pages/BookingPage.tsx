
import { useEffect } from "react";
import { TravelForm } from "@/components/TravelForm";
import { useUser } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const BookingPage = () => {
  const { isLoggedIn, travelerData } = useUser();
  const navigate = useNavigate();
  
  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  if (!travelerData) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-gradient-to-b from-blue-50 to-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <motion.h1 
          className="text-3xl font-semibold tracking-tight"
        >
          Book Your Journey
        </motion.h1>
        <motion.p 
          className="text-muted-foreground mt-2"
        >
          Hello, {travelerData.name}. Where would you like to go?
        </motion.p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="w-full max-w-md"
      >
        <TravelForm />
      </motion.div>
    </div>
  );
};

export default BookingPage;
