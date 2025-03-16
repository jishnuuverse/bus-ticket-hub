
import { motion } from "framer-motion";
import { BlurContainer } from "@/components/ui/BlurContainer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { CheckCircle } from "lucide-react";

export function ConfirmationMessage() {
  const navigate = useNavigate();
  const { logout } = useUser();

  const handleBookAgain = () => {
    navigate("/booking");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const circleVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.175, 0.885, 0.32, 1.275],
        delay: 0.2,
      },
    },
  };

  return (
    <BlurContainer className="w-full max-w-md p-8 text-center">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <motion.div variants={circleVariants} className="flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className="text-2xl font-semibold tracking-tight"
        >
          Congratulations!
        </motion.h2>

        <motion.p variants={itemVariants} className="text-lg">
          Your tickets booked successfully.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col space-y-3 pt-4"
        >
          <Button onClick={handleBookAgain} variant="outline">
            Book Another Trip
          </Button>
          <Button onClick={handleLogout} variant="ghost">
            Back to Login
          </Button>
        </motion.div>
      </motion.div>
    </BlurContainer>
  );
}
