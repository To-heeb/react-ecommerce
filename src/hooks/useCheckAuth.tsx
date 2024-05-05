import { useEffect } from "react";
import { useAppSelector } from "../app/hooks";
import { useNavigate } from "react-router";

const useCheckAuth = () => {
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector((state) => state.account.loggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/signin");
    }
  });

  return () => {};
};

export default useCheckAuth;
