
import { supabase } from "@/integrations/supabase/client";
import { MaintenanceTask } from "@/context/CalendarContext";
import { formatISO, parseISO } from "date-fns";

export interface Machine {
  Machine_ID: string;
  Machine_Name: string;
  Type: string;
  Location: string;
  Status: string;
  Health: string;
  Last_Check: string;
  Image_URL: string;
}

export interface Technician {
  Log_ID: string;
  Technician: string;
  Machine_ID: string;
  Date: string;
  Issue: string;
  Type: string;
  Action_Taken: string;
  Status: string;
}

export interface MaintenanceLog {
  Log_ID: string;
  Machine_ID: string;
  Technician: string;
  Date: string;
  Issue: string;
  Type: string;
  Action_Taken: string;
  Status: string;
}

export interface MaintenanceSchedule {
  Task_ID: number;
  Task_Name: string;
  Date: string;
  Time_Slot: string;
  Assigned_Technician: string;
  Machine_ID: string;
  Priority: string;
  Overloaded_Day: boolean;
}

// Fetch machines data from Supabase
export const getMachines = async (): Promise<Machine[]> => {
  const { data, error } = await supabase
    .from("machines")
    .select("*");

  if (error) {
    console.error("Error fetching machines:", error);
    return [];
  }
  
  return data || [];
};

// Fetch technicians data from Supabase
export const getTechnicians = async (): Promise<Technician[]> => {
  const { data, error } = await supabase
    .from("technichians")
    .select("*");

  if (error) {
    console.error("Error fetching technicians:", error);
    return [];
  }
  
  return data || [];
};

// Fetch maintenance logs from Supabase
export const getMaintenanceLogs = async (): Promise<MaintenanceLog[]> => {
  const { data, error } = await supabase
    .from("maintenance_log")
    .select("*");

  if (error) {
    console.error("Error fetching maintenance logs:", error);
    return [];
  }
  
  return data || [];
};

// Fetch scheduled maintenance tasks from Supabase
export const getMaintenanceSchedule = async (): Promise<MaintenanceSchedule[]> => {
  const { data, error } = await supabase
    .from("Maintenance_Scheduler")
    .select("*");

  if (error) {
    console.error("Error fetching maintenance schedule:", error);
    return [];
  }
  
  return data || [];
};

// Convert maintenance schedule to calendar events
export const convertScheduleToEvents = (schedules: MaintenanceSchedule[]): MaintenanceTask[] => {
  return schedules.map(schedule => {
    // Parse date and time slot
    const [startTime, endTime] = schedule.Time_Slot.split(' - ');
    const dateStr = schedule.Date;
    
    // Create start and end dates
    const startDate = new Date(`${dateStr} ${startTime}`);
    const endDate = new Date(`${dateStr} ${endTime}`);
    
    return {
      id: `${schedule.Task_ID}`,
      title: schedule.Task_Name || "Maintenance Task",
      start: startDate,
      end: endDate,
      technicianId: schedule.Assigned_Technician || null,
      description: `Maintenance for machine ${schedule.Machine_ID}`,
      priority: (schedule.Priority?.toLowerCase() as "low" | "medium" | "high") || "medium",
      status: "scheduled"
    };
  });
};

// Update a maintenance task in Supabase
export const updateMaintenanceTask = async (taskId: number, updates: Partial<MaintenanceSchedule>): Promise<void> => {
  const { error } = await supabase
    .from("Maintenance_Scheduler")
    .update(updates)
    .eq("Task_ID", taskId);

  if (error) {
    console.error("Error updating maintenance task:", error);
    throw error;
  }
};
