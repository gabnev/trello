import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import GoogleAuth from "./googleAuth";

const Navbar = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Lists</Link>
        </li>
        <li>
          <Link to="/login"> Login</Link>
        </li>
        <GoogleAuth />
      </ul>
    </div>
  );
};

export default Navbar;
