/*
Description: A persistent navbar element to allow simple navigation of the web application while keeping track of the logged-in state to ensure correct rendering

Author: Luke Scott

Date: 13/09/2023 
*/
import { Link } from "react-router-dom";
import React from 'react';

export function NavBar() {

  // Alter links on the navbar based on whether the user is logged in or not
  return (
    <div>
      <nav className="navbar">
        <div className="logo nav-links">
          <li><Link to={"/"}>Home</Link></li>
        </div>
      </nav>
    </div>
  );
}
