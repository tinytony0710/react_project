import { Navigate, useLocation } from "react-router";

function RequireAuth({ children }) {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("token") === "demo-token";

  if (!isLoggedIn) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return children;
}

export default RequireAuth