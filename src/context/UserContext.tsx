
import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { api } from "@/services/api";

export interface TravelerData {
  id?: string;
  name: string;
  age: string;
  gender: string;
  address: string;
  email: string;
  phone: string;
}

export interface TravelDetails {
  id?: string;
  pickup: string;
  destination: string;
  travelDate: string;
}

interface UserContextType {
  travelerData: TravelerData | null;
  travelDetails: TravelDetails | null;
  setTravelerData: (data: TravelerData) => void;
  setTravelDetails: (data: TravelDetails) => void;
  isLoggedIn: boolean;
  isBookingComplete: boolean;
  completeBooking: () => void;
  logout: () => void;
  isLoading: boolean;
}

const defaultContext: UserContextType = {
  travelerData: null,
  travelDetails: null,
  setTravelerData: () => {},
  setTravelDetails: () => {},
  isLoggedIn: false,
  isBookingComplete: false,
  completeBooking: () => {},
  logout: () => {},
  isLoading: true,
};

const UserContext = createContext<UserContextType>(defaultContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [travelerData, setTravelerDataState] = useState<TravelerData | null>(null);
  const [travelDetails, setTravelDetailsState] = useState<TravelDetails | null>(null);
  const [isBookingComplete, setIsBookingComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session in localStorage (email only)
  useEffect(() => {
    const checkSession = async () => {
      const savedEmail = localStorage.getItem("user_email");
      if (savedEmail) {
        try {
          // Try to fetch user data from Supabase
          const userData = await api.getTravelerByEmail(savedEmail);
          if (userData) {
            setTravelerDataState(userData);
            
            // Check if this user has any travel details
            if (userData.id) {
              const travelData = await api.getTravelDetailsByTravelerId(userData.id);
              if (travelData) {
                setTravelDetailsState(travelData);
                setIsBookingComplete(true);
              }
            }
          }
        } catch (error) {
          console.error("Error restoring session:", error);
        }
      }
      setIsLoading(false);
    };
    
    checkSession();
  }, []);

  const setTravelerData = async (data: TravelerData) => {
    try {
      console.log("Saving traveler data", data);
      const savedData = await api.saveTravelerData(data);
      setTravelerDataState(savedData);
      
      // Store email in localStorage for basic session management
      localStorage.setItem("user_email", data.email);
    } catch (error) {
      console.error("Error setting traveler data:", error);
      throw error;
    }
  };

  const setTravelDetails = async (data: TravelDetails) => {
    try {
      if (!travelerData?.id) {
        throw new Error("No traveler ID available");
      }
      
      console.log("Saving travel details", data);
      const savedData = await api.saveTravelDetails(data, travelerData.id);
      setTravelDetailsState(savedData);
    } catch (error) {
      console.error("Error setting travel details:", error);
      throw error;
    }
  };

  const completeBooking = () => {
    setIsBookingComplete(true);
  };

  const logout = () => {
    localStorage.removeItem("user_email");
    setTravelerDataState(null);
    setTravelDetailsState(null);
    setIsBookingComplete(false);
  };

  return (
    <UserContext.Provider
      value={{
        travelerData,
        travelDetails,
        setTravelerData,
        setTravelDetails,
        isLoggedIn: !!travelerData,
        isBookingComplete,
        completeBooking,
        logout,
        isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
