
import { format, startOfWeek, endOfWeek, addDays, isSameDay } from 'date-fns';
import { MaintenanceTask } from '@/context/CalendarContext';

export const formatDate = (date: Date): string => {
  return format(date, 'MMM dd, yyyy');
};

export const formatTime = (date: Date): string => {
  return format(date, 'h:mm a');
};

export const formatDateTimeRange = (start: Date, end: Date): string => {
  if (isSameDay(start, end)) {
    return `${formatDate(start)} • ${formatTime(start)} - ${formatTime(end)}`;
  }
  return `${formatDate(start)} ${formatTime(start)} - ${formatDate(end)} ${formatTime(end)}`;
};

// Priority colors
export const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case 'high':
      return 'bg-maintenance-red';
    case 'medium':
      return 'bg-maintenance-yellow';
    case 'low':
      return 'bg-maintenance-green';
    default:
      return 'bg-maintenance-blue';
  }
};

// Status colors
export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'completed':
      return 'bg-maintenance-green';
    case 'in-progress':
      return 'bg-maintenance-blue';
    case 'cancelled':
      return 'bg-maintenance-red';
    default:
      return 'bg-maintenance-gray';
  }
};

export const getMonthWeeks = (month: Date): Date[][] => {
  const weeks: Date[][] = [];
  const start = startOfWeek(month);
  const end = endOfWeek(month);
  
  let currentWeek: Date[] = [];
  let currentDate = start;
  
  while (currentDate <= end) {
    currentWeek.push(currentDate);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    currentDate = addDays(currentDate, 1);
  }
  
  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }
  
  return weeks;
};

export const generateMockTasks = (): MaintenanceTask[] => {
  const now = new Date();
  const tomorrow = addDays(now, 1);
  const dayAfterTomorrow = addDays(now, 2);
  
  return [
    {
      id: '1',
      title: 'HVAC Maintenance',
      start: new Date(now.setHours(10, 0, 0, 0)),
      end: new Date(now.setHours(12, 0, 0, 0)),
      technicianId: '1',
      description: 'Regular maintenance check for the HVAC system',
      priority: 'medium',
      status: 'scheduled'
    },
    {
      id: '2',
      title: 'Electrical Panel Inspection',
      start: new Date(tomorrow.setHours(13, 0, 0, 0)),
      end: new Date(tomorrow.setHours(15, 0, 0, 0)),
      technicianId: '2',
      description: 'Annual inspection of all electrical panels',
      priority: 'high',
      status: 'scheduled'
    },
    {
      id: '3',
      title: 'Plumbing System Check',
      start: new Date(dayAfterTomorrow.setHours(9, 0, 0, 0)),
      end: new Date(dayAfterTomorrow.setHours(11, 0, 0, 0)),
      technicianId: null,
      description: 'Check for leaks and water pressure issues',
      priority: 'low',
      status: 'scheduled'
    }
  ];
};
