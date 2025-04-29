
import { MaintenanceTask } from "@/context/CalendarContext";
import { getPriorityColor } from "@/lib/calendar-utils";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface EventItemProps {
  event: MaintenanceTask;
  onClick: () => void;
}

const EventItem = ({ event, onClick }: EventItemProps) => {
  const priorityColor = getPriorityColor(event.priority);
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "p-2 rounded-md mb-1 cursor-pointer shadow-sm border-l-4",
        priorityColor.replace("bg-", "border-"),
        "bg-white hover:bg-gray-50 transition-colors"
      )}
      onClick={onClick}
    >
      <div className="text-sm font-medium truncate">{event.title}</div>
      <div className="flex items-center text-xs text-gray-500">
        <span>{event.technicianId ? "Assigned" : "Unassigned"}</span>
      </div>
    </motion.div>
  );
};

export default EventItem;
