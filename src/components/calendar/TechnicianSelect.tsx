
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCalendar, Technician } from "@/context/CalendarContext";
import { motion } from "framer-motion";

interface TechnicianSelectProps {
  eventId: string;
  currentTechnicianId: string | null;
}

const TechnicianSelect = ({ eventId, currentTechnicianId }: TechnicianSelectProps) => {
  const { technicians, assignTechnician } = useCalendar();

  const handleChange = (value: string) => {
    assignTechnician(eventId, value);
  };

  // Simple animation when rendering
  const containerAnimation = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 }
  };

  return (
    <motion.div 
      className="w-full"
      {...containerAnimation}
    >
      <Select defaultValue={currentTechnicianId || undefined} onValueChange={handleChange}>
        <SelectTrigger>
          <SelectValue placeholder="Assign technician" />
        </SelectTrigger>
        <SelectContent>
          {technicians.length > 0 ? (
            technicians.map((tech: Technician) => (
              <SelectItem key={tech.id} value={tech.id}>
                {tech.name} - {tech.specialty}
              </SelectItem>
            ))
          ) : (
            <SelectItem value="no-techs" disabled>
              No technicians available
            </SelectItem>
          )}
        </SelectContent>
      </Select>
    </motion.div>
  );
};

export default TechnicianSelect;
