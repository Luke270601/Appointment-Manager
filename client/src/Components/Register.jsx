/*
Description: Register form to handle adding new user accounts

Author: Luke Scott

Date: 13/09/2023 
*/
import React, { useState } from 'react';
import '../CSS/App.css';
import { useNavigate } from 'react-router';

export function RegisterComponent() {
  // State to manage user input for registration
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Function to allow the user to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Function to send a request to the backend for user registration
  const handleRegister = async () => {
    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, surname, email, password }), // Include firstName and surname
      });

      const data = await response.json();

      // Navigate to the home page after successful registration
      if (response.ok) {
        console.log(data.message);
        navigate("/");
        alert("Account Created, you can now login!");
      } else {
        console.log(data.error);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div id='register-component'>
      <div className='register-box'>
        <form>
          <li>Firstname:</li>
          <input
            type='text'
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
          <li>Surname:</li>
          <input
            type='text'
            value={surname}
            onChange={e => setSurname(e.target.value)}
          />
          <li>Email:</li>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <li>Confirm email:</li>
          <input type='email' />
          <li>Password:</li>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" onClick={togglePasswordVisibility}>
            {showPassword ? 'Hide' : 'Show'}
          </button>
          <li>Confirm Password:</li>
          <input type='password' />
        </form>
        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
}
