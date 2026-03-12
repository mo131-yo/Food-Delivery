  import { api } from "@/lib/axios-instance";

  export const getMe = async () => {
    const token = localStorage.getItem("token") || localStorage.getItem("accessToken");

    try {
      const response = await api.get(`/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;

    } catch (error: any) {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("accessToken");
      }
      
      console.error("Get Me Error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Medeelel tatahad aldaaa garlaa");
    }
  };