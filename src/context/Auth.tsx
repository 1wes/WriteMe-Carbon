import React, {
  createContext,
  useEffect,
  useState,
  useContext,
  FunctionComponent,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

type AuthContextType = {
  loggedIn: boolean | undefined;
  setLoggedIn: Dispatch<SetStateAction<boolean | undefined>>;
  handleLogin: (role: string) => void | undefined;
  isTokenValid: boolean;
  isLoading: boolean;
  role: string | undefined;
  setRole: Dispatch<SetStateAction<string | undefined>>;
  names: { [key: string]: string };
  setNames: Dispatch<SetStateAction<{ firstName: string; lastName: string }>>;
};

import axiosInstance from "../utils/axios";

import useSWR from "swr";

import { useNavigate, useLocation } from "react-router-dom";

const fetcher = (url: string) =>
  axiosInstance.get(url).then((response: any) => response.data);

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const useAuth = () => {
  return useContext(AuthContext);
};

if (!useAuth) {
  throw new Error("AuthContext must be used within the AuthContextProvider");
}

const AuthContextProvider: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  const { data, error, isLoading } = useSWR(`/api/user/check-token`, fetcher);

  let isTokenValid: boolean = false;

  const currentLocation = useLocation().pathname;

  if (data) {
    if (data.code === 200) {
      isTokenValid = true;
    } else {
      isTokenValid = false;
    }
  }

  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState<boolean | undefined>(undefined);
  const [role, setRole] = useState<string>();
  const [names, setNames] = useState<{ firstName: string; lastName: string }>({
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    if (error) {
      setLoggedIn(false);
    }

    if (data) {
      setLoggedIn(isTokenValid);
      setRole(data.role);
      setNames({
        firstName: data.firstName,
        lastName: data.lastName,
      });
    }
  }, [error, data]);

  useEffect(() => {
    if (loggedIn) {
      if (currentLocation === "/login") {
        handleLogin(role);
      } else {
        navigate(currentLocation);
      }
    } else {
      navigate("/login");
    }
  }, [loggedIn, role, currentLocation]);

  const handleLogin = (UserRole: string | undefined) => {
    UserRole === "User"
      ? navigate("/user-dashboard")
      : navigate("/admin-dashboard");
  };

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        handleLogin,
        isTokenValid,
        isLoading,
        role,
        setRole,
        names,
        setNames,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth };

export default AuthContextProvider;
