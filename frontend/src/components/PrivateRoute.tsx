import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");

    if (!token) {
      navigate("/login"); // Ha nincs token, irányítsd vissza a login oldalra
    }
  }, [navigate]);

  return <>{children}</>; // Ha van token, rendereljük a védett komponenst
};

export default PrivateRoute;
