import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Check = () => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    axios
      .get("/api/me", { withCredentials: true })
      .then(() => setAuth(true))
      .catch(() => setAuth(false));
  }, []);

  if (auth === null) return <p>Loading...</p>;
  if (!auth) return <Navigate to="/login" />;

  return <Outlet />;
};
export default Check