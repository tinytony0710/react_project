import { useLocation, useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  function handleLogin(event) {
    event.preventDefault();
    localStorage.setItem("token", "demo-token");
    navigate(from, { replace: true });
  }

  return (
    <form onSubmit={handleLogin}>
      <h1>登入</h1>
      <button type="submit">登入</button>
    </form>
  );
}