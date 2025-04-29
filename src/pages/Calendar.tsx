
import { useState, useCallback, useMemo } from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import { useCalendar, MaintenanceTask } from "@/context/CalendarContext";
import { Button } from "@/components/ui/button";
import EventDialog from "@/components/calendar/EventDialog";
import DayCell from "@/components/calendar/DayCell";
import EventItem from "@/components/calendar/EventItem";
import { generateMockTasks } from "@/lib/calendar-utils";
import { motion } from "framer-motion";

import "react-big-calendar/lib/css/react-big-calendar.css";

// Create a custom localizer without moment dependency
const locales = {
  'en-US': enUS,
};

// Fixed localizer implementation
const localizer = {
  format: (date: Date, formatStr: string) => format(date, formatStr),
  parse: (str: string, formatStr: string) => parse(str, formatStr, new Date()),
  startOfWeek: (date: Date) => startOfWeek(date),
  getDay: (date: Date) => getDay(date),
  locales: locales,
};

const Calendar = () => {
  const { events, setEvents, isDateOverloaded } = useCalendar();
  const [selectedEvent, setSelectedEvent] = useState<MaintenanceTask | null>(null);
  const [showEventDialog, setShowEventDialog] = useState(false);

  // Load mock data if no events exist
  useMemo(() => {
    if (events.length === 0) {
      const mockTasks = generateMockTasks();
      setEvents(mockTasks);
    }
  }, [events.length, setEvents]);

  const handleSelectEvent = useCallback((event: MaintenanceTask) => {
    setSelectedEvent(event);
    setShowEventDialog(true);
  }, []);

  const handleCloseEventDialog = useCallback(() => {
    setShowEventDialog(false);
    setTimeout(() => setSelectedEvent(null), 300);
  }, []);

  const handleSelectSlot = useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      const newEvent: MaintenanceTask = {
        id: Math.random().toString(36).substring(2, 9),
        title: "New Maintenance Task",
        start,
        end,
        technicianId: null,
        description: "Please add a description",
        priority: "medium",
        status: "scheduled",
      };
      setEvents((prev) => [...prev, newEvent]);
    },
    [setEvents]
  );

  // Custom components for BigCalendar
  const components = {
    event: (props: any) => (
      <EventItem event={props.event} onClick={() => handleSelectEvent(props.event)} />
    ),
    dateCellWrapper: (props: any) => (
      <DayCell date={props.value}>
        {props.children}
      </DayCell>
    ),
  };

  return (
    <motion.div 
      className="h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Maintenance Schedule</h1>
        <Button>Add New Task</Button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 h-[80vh]">
        <BigCalendar
          localizer={localizer as any}
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          components={components}
          dayPropGetter={(date) => {
            if (isDateOverloaded(date)) {
              return { className: 'rbc-day-slot-overloaded' };
            }
            return {};
          }}
        />
      </div>

      <EventDialog
        isOpen={showEventDialog}
        onClose={handleCloseEventDialog}
        event={selectedEvent}
      />
    </motion.div>
  );
};

export default Calendar;
