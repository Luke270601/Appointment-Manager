/*
Description: A small popup login element which handles the user's login and subsequent redirection to the main user page

Author: Luke Scott

Date: 13/09/2023 
*/

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/App.css';

const PromptPopup = () => {
  // State to manage the open/close state of the login popup
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef(null);
  const navigate = useNavigate(); // Initialize useHistory for navigation

  // State to manage user input for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Function to handle the login process
  const handleLogin = async () => {
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Send email and password in the request body
      });
      
      const data = await response.json();
  
      if (response.ok) {
        // Login successful, handle accordingly (e.g., redirect)
        console.log(data.message);
        closePopup();
        navigate("/calendar"); // Redirect to the calendar page on successful login
      } else {
        // Login failed, handle accordingly (e.g., show error message)
        console.log(data.error);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  
  // Effect to close the popup when clicking outside of it
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        closePopup();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  // Function to open the login popup
  const openPopup = () => {
    setIsOpen(true);
  };

  // Function to close the login popup
  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <div id="promptBox" className="popup-container">
      <button className={"login"} onClick={openPopup}>Login</button>
      <div ref={popupRef} className={`popup ${isOpen ? 'open' : ''}`}>
        <li>Enter Login</li>
        <li>Email:</li>      
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <br/>
        <li>Password:</li>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <br/>
        <button onClick={handleLogin}>Submit</button>
      </div>
    </div>
  );
};

export default PromptPopup;
