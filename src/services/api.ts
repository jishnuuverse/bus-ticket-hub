import { TravelerData, TravelDetails } from "@/context/UserContext";
import { supabase } from "@/integrations/supabase/client";

export const api = {
  // Save traveler data
  saveTravelerData: async (data: TravelerData): Promise<TravelerData> => {
    try {
      console.log("API: Saving traveler data to Supabase", data);
      
      const { data: traveler, error } = await supabase
        .from('travelers')
        .insert({
          name: data.name,
          age: parseInt(data.age),
          gender: data.gender,
          address: data.address,
          email: data.email,
          phone: data.phone
        })
        .select()
        .single();
      
      if (error) {
        console.error("Error saving traveler data:", error);
        throw error;
      }
      
      return {
        ...data,
        id: traveler.id
      };
    } catch (error) {
      console.error("Failed to save traveler data:", error);
      throw error;
    }
  },
  
  // Save travel details
  saveTravelDetails: async (data: TravelDetails, travelerId: string): Promise<TravelDetails> => {
    try {
      console.log("API: Saving travel details to Supabase", data);
      
      const { data: details, error } = await supabase
        .from('travel_details')
        .insert({
          traveler_id: travelerId,
          pickup: data.pickup,
          destination: data.destination,
          travel_date: data.travelDate
        })
        .select()
        .single();
      
      if (error) {
        console.error("Error saving travel details:", error);
        throw error;
      }
      
      return {
        ...data,
        id: details.id
      };
    } catch (error) {
      console.error("Failed to save travel details:", error);
      throw error;
    }
  },
  
  // Get traveler data by email
  getTravelerByEmail: async (email: string): Promise<TravelerData | null> => {
    try {
      const { data, error } = await supabase
        .from('travelers')
        .select('*')
        .eq('email', email)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') {
          // No data found
          return null;
        }
        console.error("Error fetching traveler:", error);
        throw error;
      }
      
      return {
        id: data.id,
        name: data.name,
        age: data.age.toString(),
        gender: data.gender,
        address: data.address,
        email: data.email,
        phone: data.phone
      };
    } catch (error) {
      console.error("Failed to get traveler data:", error);
      return null;
    }
  },
  
  // Get travel details by traveler id
  getTravelDetailsByTravelerId: async (travelerId: string): Promise<TravelDetails | null> => {
    try {
      const { data, error } = await supabase
        .from('travel_details')
        .select('*')
        .eq('traveler_id', travelerId)
        .order('created_at', { ascending: false })
        .maybeSingle();
      
      if (error) {
        console.error("Error fetching travel details:", error);
        throw error;
      }
      
      if (!data) return null;
      
      return {
        id: data.id,
        pickup: data.pickup,
        destination: data.destination,
        travelDate: data.travel_date
      };
    } catch (error) {
      console.error("Failed to get travel details:", error);
      return null;
    }
  },
  
  // Clear all data (logout)
  clearAllData: async (): Promise<void> => {
    // This method is kept for compatibility, but with Supabase,
    // data isn't cleared on logout
    console.log("Logging out - data remains in Supabase database");
  },
  
  // Get all travelers data
  getAllTravelers: async (): Promise<TravelerData[]> => {
    try {
      const { data, error } = await supabase
        .from('travelers')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Error fetching all travelers:", error);
        throw error;
      }
      
      return data.map(traveler => ({
        id: traveler.id,
        name: traveler.name,
        age: traveler.age.toString(),
        gender: traveler.gender,
        address: traveler.address,
        email: traveler.email,
        phone: traveler.phone
      }));
    } catch (error) {
      console.error("Failed to get all travelers:", error);
      throw error;
    }
  },
  
  // Get all travel details
  getAllTravelDetails: async (): Promise<(TravelDetails & { travelerName: string })[]> => {
    try {
      const { data, error } = await supabase
        .from('travel_details')
        .select(`
          *,
          travelers:traveler_id (name)
        `)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Error fetching all travel details:", error);
        throw error;
      }
      
      return data.map(detail => ({
        id: detail.id,
        pickup: detail.pickup,
        destination: detail.destination,
        travelDate: detail.travel_date,
        travelerName: detail.travelers?.name || 'Unknown'
      }));
    } catch (error) {
      console.error("Failed to get all travel details:", error);
      throw error;
    }
  }
};
