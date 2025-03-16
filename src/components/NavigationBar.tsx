
import { useUser } from "@/context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const NavigationBar = () => {
  const { isLoggedIn, logout } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  return (
    <header className="bg-background/50 backdrop-blur-md border-b sticky top-0 z-50">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link to="/" className="font-medium">
            TravelTicket
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Link to="/export">
              <Button variant="ghost" size="sm" className="gap-1">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </Button>
            </Link>
            
            {isLoggedIn && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleLogout}
                className="gap-1"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
