
import { motion } from "framer-motion";
import { BlurContainer } from "@/components/ui/BlurContainer";

const ExportPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-gradient-to-b from-blue-50 to-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <motion.h1 className="text-3xl font-semibold tracking-tight">
          Export Data
        </motion.h1>
        <motion.p className="text-muted-foreground mt-2">
          Download your travel data to Excel files
        </motion.p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="w-full max-w-md"
      >
      </motion.div>
    </div>
  );
};

export default ExportPage;
