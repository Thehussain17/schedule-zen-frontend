
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Calendar, Home, Users } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Sidebar = () => {
  const location = useLocation();
  const isMobile = useIsMobile();

  if (isMobile) {
    return null;
  }

  const menuItems = [
    {
      name: "Dashboard",
      icon: <Home size={20} />,
      path: "/",
      active: location.pathname === "/"
    },
    {
      name: "Calendar",
      icon: <Calendar size={20} />,
      path: "/calendar",
      active: location.pathname === "/calendar"
    },
    {
      name: "Technicians",
      icon: <Users size={20} />,
      path: "/technicians",
      active: location.pathname === "/technicians"
    }
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-full">
      <div className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link 
                to={item.path} 
                className={cn(
                  "flex items-center px-4 py-3 text-gray-700 rounded-lg relative overflow-hidden group",
                  item.active && "text-maintenance-blue font-medium"
                )}
              >
                {item.active && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 bg-blue-50 rounded-lg z-0"
                    initial={false}
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
                <span className={cn(
                  "relative z-10 mr-3",
                  item.active ? "text-maintenance-blue" : "text-gray-500 group-hover:text-gray-700"
                )}>
                  {item.icon}
                </span>
                <span className="relative z-10">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
