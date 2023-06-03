import React, { useCallback, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import { useAuthListener } from "service/firebase";
const App = () => {
  const [auth, setAuth] = useState({
    status: "loading",
  });

  const _handler = useCallback((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      setAuth((prev) => ({
        ...prev,
        status: "authenticated",
      }));
      // ...
    } else {
      // User is signed out
      // ...
      setAuth((prev) => ({
        ...prev,
        status: "unauthenticated",
      }));
    }
  }, []);
  useAuthListener(_handler);
  if (auth.status === "loading") {
    return <h1>Loading...</h1>;
  }
  return (
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
  );
};

export default App;
