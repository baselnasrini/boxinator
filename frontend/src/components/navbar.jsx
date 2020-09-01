import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="/">
        <img
          src="https://www.fortnox.se/wp-content/themes/fortnox2017/image/loggo/fortnox_logo_svart.svg"
          width="150"
          className="d-inline-block mr-1"
          alt=""
        />
        Boxinator
      </a>
      <ul className="navbar-nav mr-auto">
        <Link to="/addbox" style={{ textDecoration: "none" }}>
          <li className="nav-link">Add Box</li>
        </Link>
        <Link to="/listboxes" style={{ textDecoration: "none" }}>
          <li className="nav-link">Boxes List</li>
        </Link>
      </ul>
    </nav>
  );
};

export default NavBar;
