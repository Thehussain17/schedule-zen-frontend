
import { cn } from "@/lib/utils";

interface SpinnerProps {
  className?: string;
}

export const Spinner = ({ className }: SpinnerProps) => {
  return (
    <div className={cn("animate-spin rounded-full border-4 border-t-4 h-6 w-6 border-gray-200 border-t-blue-600", className)}>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
