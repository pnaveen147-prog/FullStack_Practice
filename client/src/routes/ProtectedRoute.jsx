import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ children }) {
  const location = useLocation();

  const { isAuthenticated, accessToken } = useSelector((state) => state.auth);

  if (!isAuthenticated || !accessToken) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  if (children) {
    return children;
  }

  return <Outlet />;
}

export default ProtectedRoute;
