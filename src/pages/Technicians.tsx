
import { useState, useEffect } from "react";
import { useCalendar, Technician } from "@/context/CalendarContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import { Spinner } from "@/components/ui/spinner";

const TechnicianCard = ({ technician }: { technician: Technician }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="h-full">
        <CardHeader>
          <CardTitle>{technician.name}</CardTitle>
          <CardDescription>{technician.specialty}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-sm">Availability:</span>
            <span className={`text-sm font-medium ${technician.availability ? "text-green-600" : "text-red-600"}`}>
              {technician.availability ? "Available" : "Unavailable"}
            </span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button variant="outline" size="sm">View Schedule</Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const Technicians = () => {
  const { technicians, setTechnicians, loading } = useCalendar();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newTechnician, setNewTechnician] = useState<Omit<Technician, "id">>({
    name: "",
    specialty: "",
    availability: true,
  });

  const handleAddTechnician = () => {
    if (newTechnician.name && newTechnician.specialty) {
      const technicianWithId: Technician = {
        ...newTechnician,
        id: Math.random().toString(36).substring(2, 9),
      };
      setTechnicians([...technicians, technicianWithId]);
      setNewTechnician({
        name: "",
        specialty: "",
        availability: true,
      });
      setIsAddDialogOpen(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <Spinner className="w-12 h-12 mx-auto mb-4" />
          <p className="text-lg">Loading technicians...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Technicians</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add Technician</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Technician</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newTechnician.name}
                  onChange={(e) =>
                    setNewTechnician({ ...newTechnician, name: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="specialty" className="text-right">
                  Specialty
                </Label>
                <Input
                  id="specialty"
                  value={newTechnician.specialty}
                  onChange={(e) =>
                    setNewTechnician({
                      ...newTechnician,
                      specialty: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="availability" className="text-right">
                  Available
                </Label>
                <Switch
                  id="availability"
                  checked={newTechnician.availability}
                  onCheckedChange={(checked) =>
                    setNewTechnician({
                      ...newTechnician,
                      availability: checked,
                    })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddTechnician}>
                Add Technician
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {technicians.map((technician) => (
          <motion.div key={technician.id} variants={itemVariants}>
            <TechnicianCard technician={technician} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Technicians;
