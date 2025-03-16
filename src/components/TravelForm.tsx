import { useState } from "react";
import { useUser, TravelDetails } from "@/context/UserContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { api } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { BlurContainer } from "@/components/ui/BlurContainer";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export function TravelForm() {
  const { travelerData, setTravelDetails, completeBooking } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState<Date | undefined>(
    new Date(Date.now() + 24 * 60 * 60 * 1000) // Tomorrow
  );
  
  const [formData, setFormData] = useState<Omit<TravelDetails, "travelDate">>({
    pickup: "",
    destination: "",
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.pickup.trim()) newErrors.pickup = "Pickup location is required";
    if (!formData.destination.trim()) newErrors.destination = "Destination is required";
    if (!date) newErrors.travelDate = "Travel date is required";
    
    // Check if pickup and destination are the same
    if (formData.pickup && formData.destination && 
        formData.pickup.toLowerCase() === formData.destination.toLowerCase()) {
      newErrors.destination = "Destination cannot be the same as pickup location";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsLoading(true);
    
    try {
      const travelData: TravelDetails = {
        ...formData,
        travelDate: date ? format(date, "yyyy-MM-dd") : "",
      };
      
      // Save to Supabase (through context and API service)
      await setTravelDetails(travelData);
      completeBooking();
      
      toast({
        title: "Success",
        description: "Your booking details have been saved.",
      });
      
      // Navigate to confirmation page
      navigate("/confirmation");
    } catch (error) {
      console.error("Error saving travel details:", error);
      toast({
        title: "Error",
        description: "There was a problem saving your booking.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BlurContainer className="w-full max-w-md p-8 animate-scale-in">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1.5">
          <Label htmlFor="pickup">Pickup Location</Label>
          <Input
            id="pickup"
            name="pickup"
            value={formData.pickup}
            onChange={handleChange}
            className="transition-all duration-200"
            placeholder="New York"
            aria-invalid={!!errors.pickup}
          />
          {errors.pickup && <p className="text-xs text-red-500 mt-1">{errors.pickup}</p>}
        </div>
        
        <div className="space-y-1.5">
          <Label htmlFor="destination">Destination</Label>
          <Input
            id="destination"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            className="transition-all duration-200"
            placeholder="Boston"
            aria-invalid={!!errors.destination}
          />
          {errors.destination && <p className="text-xs text-red-500 mt-1">{errors.destination}</p>}
        </div>
        
        <div className="space-y-1.5">
          <Label htmlFor="travelDate">Date of Travel</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal transition-all duration-200",
                  !date && "text-muted-foreground"
                )}
                id="travelDate"
                aria-invalid={!!errors.travelDate}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Select date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                disabled={date => date < new Date()}
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
          {errors.travelDate && <p className="text-xs text-red-500 mt-1">{errors.travelDate}</p>}
        </div>
        
        <Button 
          type="submit" 
          className="w-full mt-6 transition-all"
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "BOOK TICKETS"}
        </Button>
      </form>
    </BlurContainer>
  );
}
