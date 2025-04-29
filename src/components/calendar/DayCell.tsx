
import { useCalendar } from "@/context/CalendarContext";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";

interface DayCellProps {
  date: Date;
  children?: React.ReactNode;
}

const DayCell = ({ date, children }: DayCellProps) => {
  const { isDateOverloaded } = useCalendar();
  const [isHovered, setIsHovered] = useState(false);
  const overloaded = isDateOverloaded(date);

  return (
    <motion.div
      className={cn(
        "h-full w-full relative rounded-md transition-all", 
        overloaded && "overflow-hidden"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={false}
    >
      {overloaded && (
        <motion.div 
          className="absolute inset-0 bg-red-50 pointer-events-none"
          animate={{ 
            opacity: isHovered ? 0.3 : 0.1 
          }}
          transition={{ duration: 0.2 }}
        />
      )}
      {overloaded && (
        <motion.div 
          className="absolute top-0 right-0 bg-maintenance-red text-white text-xs px-2 py-0.5 rounded-bl-md"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Overbooked
        </motion.div>
      )}
      {children}
    </motion.div>
  );
};

export default DayCell;
