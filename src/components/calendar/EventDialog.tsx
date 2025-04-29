
import { useState, useEffect } from "react";
import { useCalendar, MaintenanceTask } from "@/context/CalendarContext";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatDateTimeRange, getStatusColor } from "@/lib/calendar-utils";
import TechnicianSelect from "./TechnicianSelect";
import Lottie from "lottie-react";
import { motion } from "framer-motion";

// This is a placeholder - you would need to add real Lottie animations
const completedAnimation = { 
  v: "5.6.5",
  fr: 60,
  ip: 0,
  op: 120,
  w: 400,
  h: 400,
  nm: "Placeholder",
  ddd: 0,
  assets: [],
  layers: []
};

interface EventDialogProps {
  isOpen: boolean;
  onClose: () => void;
  event: MaintenanceTask | null;
}

const EventDialog = ({ isOpen, onClose, event }: EventDialogProps) => {
  const { updateEvent } = useCalendar();
  const [showAnimation, setShowAnimation] = useState(false);
  const [status, setStatus] = useState<MaintenanceTask["status"]>("scheduled");
  const [currentEvent, setCurrentEvent] = useState<MaintenanceTask | null>(null);

  useEffect(() => {
    if (event) {
      setCurrentEvent(event);
      setStatus(event.status);
    }
  }, [event]);

  if (!currentEvent) return null;

  const handleUpdateStatus = (newStatus: MaintenanceTask["status"]) => {
    if (currentEvent) {
      setStatus(newStatus);

      // Show animation when completing a task
      if (newStatus === "completed") {
        setShowAnimation(true);
        setTimeout(() => {
          setShowAnimation(false);
          updateEvent({
            ...currentEvent,
            status: newStatus
          });
        }, 2000);
      } else {
        updateEvent({
          ...currentEvent,
          status: newStatus
        });
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        {showAnimation ? (
          <div className="flex flex-col items-center justify-center py-10">
            <Lottie
              animationData={completedAnimation}
              loop={false}
              style={{ width: 200, height: 200 }}
            />
            <p className="text-xl font-semibold text-maintenance-green mt-4">
              Task Completed!
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">
                {currentEvent.title}
              </DialogTitle>
              <div className="text-sm text-gray-500">
                {formatDateTimeRange(currentEvent.start, currentEvent.end)}
              </div>
            </DialogHeader>

            <div className="my-4 space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-1">Description</h3>
                <p className="text-gray-700">{currentEvent.description}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-1">Priority</h3>
                <div className="flex items-center">
                  <span
                    className={`w-3 h-3 rounded-full mr-2 ${getStatusColor(currentEvent.priority)}`}
                  ></span>
                  <span className="capitalize">{currentEvent.priority}</span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-1">Status</h3>
                <motion.div
                  className="flex items-center space-x-2"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Button
                    size="sm"
                    variant={status === "scheduled" ? "default" : "outline"}
                    onClick={() => handleUpdateStatus("scheduled")}
                  >
                    Scheduled
                  </Button>
                  <Button
                    size="sm"
                    variant={status === "in-progress" ? "default" : "outline"}
                    onClick={() => handleUpdateStatus("in-progress")}
                  >
                    In Progress
                  </Button>
                  <Button
                    size="sm"
                    variant={status === "completed" ? "default" : "outline"}
                    onClick={() => handleUpdateStatus("completed")}
                  >
                    Completed
                  </Button>
                </motion.div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-1">Assigned Technician</h3>
                <TechnicianSelect
                  eventId={currentEvent.id}
                  currentTechnicianId={currentEvent.technicianId}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="ghost" onClick={onClose}>
                Close
              </Button>
              <Button onClick={onClose}>Save Changes</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EventDialog;
