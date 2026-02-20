import React, { useContext } from "react";
import { AuthContext } from "../core/AuthContext";

const Navbar: React.FC = () => {
  const { logged, profile, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="/">Home</a>
        <div>
          <ul className="navbar-nav">

            {!logged && (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/register">Cadastrar</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/login">Login</a>
                </li>
              </>
            )}

            {logged && (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/postsCrud">Posts</a>
                </li>
                {profile?.role === 1 && (
                  <li className="nav-item">
                    <a className="nav-link" href="/users">Usuários</a>
                  </li>
                )}
                <li className="nav-item">
                  <a href="#" className="nav-link" onClick={(e) => {
                    e.preventDefault();
                    logout();
                  }}>Logout</a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>

  );
};

export default Navbar;