import { createContext, useState, useEffect } from "react";
import API from "../api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userBookmarks, setUserBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserBookmarks = async () => {
    try {
      const res = await API.get("/stories/bookmarks");
      setUserBookmarks(res.data.map(s => s._id));
    } catch (err) {
      setUserBookmarks([]);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      // Token milne par bookmarks fetch karein
      API.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
      fetchUserBookmarks();
    }
    setLoading(false);
  }, [token]);

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUserBookmarks([]);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, loading, userBookmarks, fetchUserBookmarks }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};