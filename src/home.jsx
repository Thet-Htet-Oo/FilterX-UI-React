import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/");
  };

  return (
    <div>
      <h1>Welcome to Home Page!</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
