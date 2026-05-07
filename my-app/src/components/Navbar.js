import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { token, logout } = useContext(AuthContext);

  return (
    <nav>
      <Link to="/">Home</Link> |{" "}
      {token ? (
        <>
          <Link to="/bookmarks">Bookmarks</Link> |{" "}
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link> |{" "}
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}