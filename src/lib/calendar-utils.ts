
import { format, isSameDay } from 'date-fns';
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
