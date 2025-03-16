
import { useEffect } from "react";
import { UserForm } from "@/components/UserForm";
import { useUser } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Bus } from "lucide-react";

const LoginPage = () => {
  const { isLoggedIn } = useUser();
  const navigate = useNavigate();
  
  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/booking");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-gradient-to-b from-blue-50 to-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
          className="inline-block mb-4"
        >
          <Bus className="h-12 w-12 text-primary mx-auto" />
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-3xl font-semibold tracking-tight"
        >
          Welcome to TravelTicket
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-muted-foreground mt-2"
        >
          Please enter your details to continue
        </motion.p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="w-full max-w-md"
      >
        <UserForm />
      </motion.div>
    </div>
  );
};

export default LoginPage;
