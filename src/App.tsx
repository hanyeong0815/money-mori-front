import React, { useLayoutEffect, useState } from "react";
import "./App.css";
import useAuth from "@store/useAuth";
import STORAGE_KEY from "@utils/storage-key";
import ProtectedRoutes from "@components/routes/ProtectedRoutes";
import UnprotectedRoutes from "@components/routes/UnprotectedRoutes";

function App() {
  const { isAuthenticated } = useAuth();

  const [routeComponents, setRouteComponents] = useState<React.ReactElement>(
    localStorage.getItem(STORAGE_KEY.AUTHUSER) != null ? (
      <ProtectedRoutes />
    ) : (
      <UnprotectedRoutes />
    )
  );

  useLayoutEffect(() => {
    setRouteComponents(
      isAuthenticated ? <ProtectedRoutes /> : <UnprotectedRoutes />
    );
  }, [isAuthenticated]);

  return <div className="min-h-screen">{routeComponents}</div>;
}

export default App;
