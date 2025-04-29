
import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Technician {
  id: string;
  name: string;
  specialty: string;
  availability: boolean;
}

export interface MaintenanceTask {
  id: string;
  title: string;
  start: Date;
  end: Date;
  technicianId: string | null;
  description: string;
  priority: "low" | "medium" | "high";
  status: "scheduled" | "in-progress" | "completed" | "cancelled";
}

interface CalendarContextType {
  events: MaintenanceTask[];
  technicians: Technician[];
  taskCounts: Record<string, number>; // date string -> count
  setEvents: React.Dispatch<React.SetStateAction<MaintenanceTask[]>>;
  setTechnicians: React.Dispatch<React.SetStateAction<Technician[]>>;
  addEvent: (event: MaintenanceTask) => void;
  updateEvent: (event: MaintenanceTask) => void;
  deleteEvent: (eventId: string) => void;
  assignTechnician: (eventId: string, technicianId: string) => void;
  isDateOverloaded: (date: Date) => boolean;
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

interface CalendarProviderProps {
  children: ReactNode;
}

export const CalendarProvider = ({ children }: CalendarProviderProps) => {
  const [events, setEvents] = useState<MaintenanceTask[]>([]);
  const [technicians, setTechnicians] = useState<Technician[]>([]);

  // Calculate task counts per day
  const taskCounts: Record<string, number> = events.reduce((counts, event) => {
    const dateStr = event.start.toISOString().split('T')[0];
    if (!counts[dateStr]) {
      counts[dateStr] = 0;
    }
    counts[dateStr]++;
    return counts;
  }, {} as Record<string, number>);

  const addEvent = (event: MaintenanceTask) => {
    setEvents((prev) => [...prev, event]);
  };

  const updateEvent = (updatedEvent: MaintenanceTask) => {
    setEvents((prev) => 
      prev.map((event) => (event.id === updatedEvent.id ? updatedEvent : event))
    );
  };

  const deleteEvent = (eventId: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== eventId));
  };

  const assignTechnician = (eventId: string, technicianId: string) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === eventId ? { ...event, technicianId } : event
      )
    );
  };

  const isDateOverloaded = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return (taskCounts[dateStr] || 0) > 3; // Overloaded if more than 3 tasks
  };

  return (
    <CalendarContext.Provider
      value={{
        events,
        technicians,
        taskCounts,
        setEvents,
        setTechnicians,
        addEvent,
        updateEvent,
        deleteEvent,
        assignTechnician,
        isDateOverloaded
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error("useCalendar must be used within a CalendarProvider");
  }
  return context;
};
