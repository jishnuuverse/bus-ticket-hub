
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { BlurContainer } from "@/components/ui/BlurContainer";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-gradient-to-b from-blue-50 to-white">
      <BlurContainer className="w-full max-w-md p-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Oops! This page doesn't exist.
          </p>
          <Button onClick={() => navigate("/")} className="px-8">
            Back to Home
          </Button>
        </motion.div>
      </BlurContainer>
    </div>
  );
};

export default NotFound;
