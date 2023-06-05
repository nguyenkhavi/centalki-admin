import React, { useCallback, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import { useAuthListener } from "service/firebase";
import { baseAxios } from "service/axios";
import { logOut } from "service/firebase";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

const App = () => {
  const [auth, setAuth] = useState({
    status: "loading",
  });

  const _handler = useCallback(async (user) => {
    if (user) {
      try {
        const idToken = await user.getIdToken();
        await baseAxios.post(`/auth/validate-role`, {
          idToken,
          role: "ADMIN",
        });
        baseAxios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${idToken}`;
        setAuth((prev) => ({
          ...prev,
          status: "authenticated",
        }));
      } catch (e) {
        setAuth((prev) => ({
          ...prev,
          status: "not_admin",
        }));
      }
    } else {
      setAuth((prev) => ({
        ...prev,
        status: "unauthenticated",
      }));
    }
  }, []);
  useAuthListener(_handler);

  const _logout = () => logOut();

  if (auth.status === "loading") {
    return <h1>Loading...</h1>;
  }
  if (auth.status === "not_admin") {
    return (
      <div>
        <h1>Only admins allowed... </h1>
        <button onClick={_logout}>Log out</button>
      </div>
    );
  }
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        {auth.status === "authenticated" ? (
          <>
            <Route path="admin/*" element={<AdminLayout />} />
            <Route path="/*" element={<Navigate to="/admin" replace />} />
          </>
        ) : (
          <>
            <Route path="auth/*" element={<AuthLayout />} />
            <Route path="/*" element={<Navigate to="/auth" replace />} />
          </>
        )}
      </Routes>
      <ToastContainer />
    </QueryClientProvider>
  );
};

export default App;
