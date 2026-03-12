import { api } from "../axios-instance";

export interface UpdateUserPayload {
  address?: string;
  location?: { 
    type: "Point";
    coordinates: [number, number];
  };
}

export const updateCurrentUser = async (userData: { address: string }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Ta ehleed neverne uu.");
  }

  try {
    const response = await api.patch(`/users/update-user`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Full Error Response:", error.response);
    
    const errorMessage = error.response?.data?.message || "Huselt amjilttai.";
    throw new Error(errorMessage);
  }
};