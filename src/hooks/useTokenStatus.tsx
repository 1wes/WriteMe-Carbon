import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/Auth";

const useTokenStatus = () => {
  const navigate = useNavigate();

  const { loggedIn } = useAuth() ?? {};

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    }
  }, []);
};

export default useTokenStatus;
