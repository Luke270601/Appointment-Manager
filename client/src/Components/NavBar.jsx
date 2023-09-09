import { Link } from "react-router-dom";
import Login from "./Login";
import React, { useState, useEffect } from 'react';

export function NavBar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  function logout(){
    fetch("/logout")
      .then(data => {
        if (data.loggedIn) {
          setLoggedIn(true);
        }
        else{
          setLoggedIn(false);
        }
        setIsLoading(false); // Set loading state to false when fetch is done
      })
      .catch(error => {
        console.error('Error:', error);
        setIsLoading(false); // Set loading state to false in case of an error
      });
  }

  useEffect(() => {
    fetch("/login")
      .then(response => response.json())
      .then(data => {
        if (data.loggedIn) {
          setLoggedIn(true);
        }
        else{
          setLoggedIn(false);
        }
        setIsLoading(false); // Set loading state to false when fetch is done
      })
      .catch(error => {
        console.error('Error:', error);
        setIsLoading(false); // Set loading state to false in case of an error
      });
  }, []);

  if (isLoading) {
    // Return null while loading to prevent rendering
    return (
        <nav className="navbar">          
        <div className="logo nav-links">
        <li><Link to={"/"}>Home</Link></li>
        </div>
        <ul className={"nav-links"}>
            <br></br>
          </ul>
        </nav>
    );
  }

  return (
    <div>
        <nav className="navbar">          
        <div className="logo nav-links">
        <li><Link to={"/"}>Home</Link></li>
        </div>
      {loggedIn ? (
          <ul className={"nav-links"}>
            <li onClick={logout}><Link to={"/"}>Logout</Link></li>
            <li><Link to={"/account"}>Account</Link></li>
          </ul>
      ) : (
        <nav className="navbar">
          <ul className={"nav-links"}>
            <li><Login></Login></li>
            <li><Link to={"/register"}>Register</Link></li>
          </ul>
        </nav>
      )}
        </nav>
    </div>
  );
}
