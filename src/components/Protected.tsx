import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "@src/lib/state";

export const Protected = ({ children }: any) => {
  const { isLoggedIn } = useAuthStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [navigate, isLoggedIn]);

  return children;
};
