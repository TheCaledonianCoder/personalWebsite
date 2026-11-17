import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkAuthStatus } from "../src/services/api";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    checkAuthStatus()
      .then((status) => setIsAuthenticated(status))
      .catch(() => setIsAuthenticated(false));
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className='flex justify-center items-center h-64 text-slate-500 font-["Jost",sans-serif]'>
        Checking authorization...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
