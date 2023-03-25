import React, { useContext } from 'react';
import { Link, useLocation } from "react-router-dom";
import LoginContext from "../context/authentication/LoginContext";

export default function Navbar() {
  const { isLogin, userLogin } = useContext(LoginContext);

  React.useEffect(() => {
    return async () => {
      await userLogin();
    }
    // eslint-disable-next-line
  }, [])


  // geting path name with react router 
  let location = useLocation();
  // console.log(location);


  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">iNotebook</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} aria-current="page" to="/about">About</Link>
            </li>
          </ul>

          {isLogin.login === false ?
            <form className="d-flex" role="search">
              <Link className="btn btn-primary mx-1" to="/signup">Sign Up</Link>
              <Link className="btn btn-primary mx-1" to="/login">Login</Link>
            </form>
            :
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          }
        </div>
      </div>
    </nav>
  )
}