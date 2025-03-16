
import { useEffect } from "react";
import { ConfirmationMessage } from "@/components/ConfirmationMessage";
import { useUser } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ConfirmationPage = () => {
  const { isLoggedIn, isBookingComplete } = useUser();
  const navigate = useNavigate();
  
  // Redirect if not logged in or booking not complete
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    } else if (!isBookingComplete) {
      navigate("/booking");
    }
  }, [isLoggedIn, isBookingComplete, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-gradient-to-b from-blue-50 to-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <ConfirmationMessage />
      </motion.div>
    </div>
  );
};

export default ConfirmationPage;
