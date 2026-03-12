import { api } from "../axios-instance";

 const getCurrentUser = async (token: string | null) => {
  if (!token) return null;

  try {
    const response = await api.get("/users/me", { 
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data; 
  } catch (error) {
    console.error("Get Current User Error:", error);
    localStorage.removeItem("token");
    return null;
  }
};
export default getCurrentUser