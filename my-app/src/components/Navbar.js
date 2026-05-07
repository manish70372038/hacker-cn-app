import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { token, logout } = useContext(AuthContext);

  return (
    <nav>
      <div className="nav-brand">
        <Link to="/">HN Scraper</Link>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        {token ? (
          <>
            <Link to="/bookmarks">Bookmarks</Link>
            <button className="nav-logout" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}