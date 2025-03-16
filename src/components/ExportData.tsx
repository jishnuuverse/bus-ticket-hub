
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { api } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { Download } from "lucide-react";
import * as XLSX from 'xlsx';

export const ExportData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleExportTravelers = async () => {
    setIsLoading(true);
    try {
      const travelers = await api.getAllTravelers();
      
      if (travelers.length === 0) {
        toast({
          title: "No data found",
          description: "There are no travelers in the database to export.",
          variant: "destructive",
        });
        return;
      }
      
      // Create worksheet from travelers data
      const worksheet = XLSX.utils.json_to_sheet(travelers);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Travelers");
      
      // Save to file
      XLSX.writeFile(workbook, "travelers.xlsx");
      
      toast({
        title: "Export successful",
        description: "Travelers data has been exported to Excel.",
      });
    } catch (error) {
      console.error("Error exporting travelers:", error);
      toast({
        title: "Export failed",
        description: "There was a problem exporting the data.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportBookings = async () => {
    setIsLoading(true);
    try {
      const bookings = await api.getAllTravelDetails();
      
      if (bookings.length === 0) {
        toast({
          title: "No data found",
          description: "There are no bookings in the database to export.",
          variant: "destructive",
        });
        return;
      }
      
      // Create worksheet from bookings data
      const worksheet = XLSX.utils.json_to_sheet(bookings);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Bookings");
      
      // Save to file
      XLSX.writeFile(workbook, "bookings.xlsx");
      
      toast({
        title: "Export successful",
        description: "Booking data has been exported to Excel.",
      });
    } catch (error) {
      console.error("Error exporting bookings:", error);
      toast({
        title: "Export failed",
        description: "There was a problem exporting the data.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportAll = async () => {
    setIsLoading(true);
    try {
      const [travelers, bookings] = await Promise.all([
        api.getAllTravelers(),
        api.getAllTravelDetails()
      ]);
      
      if (travelers.length === 0 && bookings.length === 0) {
        toast({
          title: "No data found",
          description: "There is no data in the database to export.",
          variant: "destructive",
        });
        return;
      }
      
      // Create workbook with multiple sheets
      const workbook = XLSX.utils.book_new();
      
      if (travelers.length > 0) {
        const travelersSheet = XLSX.utils.json_to_sheet(travelers);
        XLSX.utils.book_append_sheet(workbook, travelersSheet, "Travelers");
      }
      
      if (bookings.length > 0) {
        const bookingsSheet = XLSX.utils.json_to_sheet(bookings);
        XLSX.utils.book_append_sheet(workbook, bookingsSheet, "Bookings");
      }
      
      // Save to file
      XLSX.writeFile(workbook, "travel_data.xlsx");
      
      toast({
        title: "Export successful",
        description: "All data has been exported to Excel.",
      });
    } catch (error) {
      console.error("Error exporting all data:", error);
      toast({
        title: "Export failed",
        description: "There was a problem exporting the data.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-4 w-full max-w-md">
      <h2 className="text-xl font-semibold text-center">Export Data</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button 
          onClick={handleExportTravelers} 
          disabled={isLoading}
          className="flex items-center justify-center"
        >
          <Download className="mr-2 h-4 w-4" />
          Travelers
        </Button>
        <Button 
          onClick={handleExportBookings} 
          disabled={isLoading}
          className="flex items-center justify-center"
        >
          <Download className="mr-2 h-4 w-4" />
          Bookings
        </Button>
        <Button 
          onClick={handleExportAll} 
          disabled={isLoading}
          variant="secondary"
          className="flex items-center justify-center"
        >
          <Download className="mr-2 h-4 w-4" />
          All Data
        </Button>
      </div>
      {isLoading && (
        <div className="text-center text-sm text-muted-foreground">
          Processing data...
        </div>
      )}
      <div className="text-center text-sm text-muted-foreground mt-4">
        <p>Files will be downloaded automatically to your device's default download location.</p>
      </div>
    </div>
  );
};
