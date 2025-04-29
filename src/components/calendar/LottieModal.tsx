
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import Lottie from "lottie-react";
import { motion } from "framer-motion";

interface LottieModalProps {
  isOpen: boolean;
  onClose: () => void;
  animationData: any;
  message: string;
  duration?: number; // Auto-close duration in ms
}

const LottieModal = ({ 
  isOpen, 
  onClose, 
  animationData, 
  message,
  duration = 2000 
}: LottieModalProps) => {
  
  useEffect(() => {
    if (isOpen && duration) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] flex flex-col items-center justify-center p-6">
        <div className="w-40 h-40">
          <Lottie
            animationData={animationData}
            loop={false}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-center text-lg font-medium"
        >
          {message}
        </motion.p>
      </DialogContent>
    </Dialog>
  );
};

export default LottieModal;
