
import { useState, useCallback, useMemo } from "react";
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import { useCalendar, MaintenanceTask } from "@/context/CalendarContext";
import { Button } from "@/components/ui/button";
import EventDialog from "@/components/calendar/EventDialog";
import DayCell from "@/components/calendar/DayCell";
import EventItem from "@/components/calendar/EventItem";
import { motion } from "framer-motion";
import { Spinner } from "@/components/ui/spinner";

import "react-big-calendar/lib/css/react-big-calendar.css";

// Use the built-in dateFnsLocalizer instead of custom implementation
const locales = {
  'en-US': enUS,
};

// Use the provided dateFnsLocalizer from react-big-calendar
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const Calendar = () => {
  const { events, setEvents, isDateOverloaded, loading } = useCalendar();
  const [selectedEvent, setSelectedEvent] = useState<MaintenanceTask | null>(null);
  const [showEventDialog, setShowEventDialog] = useState(false);

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

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <Spinner className="w-12 h-12 mx-auto mb-4" />
          <p className="text-lg">Loading maintenance schedule...</p>
        </div>
      </div>
    );
  }

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
          localizer={localizer}
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
