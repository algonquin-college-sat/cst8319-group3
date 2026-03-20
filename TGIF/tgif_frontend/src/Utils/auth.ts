import axios from "axios";

const authFetch = async (url: string, options: any = {}) => {
  const token = localStorage.getItem("token");

  try {
    return await axios({
      url,
      method: options.method || "GET",
      data: options.data || null,
      params: options.params || {}, // ✅ ADD THIS
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...(options.headers || {})
      }
    });

  } catch (err: any) {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    throw err;
  }
};

export default authFetch;