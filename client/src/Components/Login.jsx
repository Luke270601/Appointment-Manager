import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/App.css';

const PromptPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef(null);
  const navigate = useNavigate(); // Initialize useHistory

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch(`/login?email=${email}&password=${password}`);
      const data = await response.json();
      
      if (response.ok) {
        // Login successful, handle accordingly (e.g., redirect)
        console.log(data.message);
        closePopup()
        navigate("/calender")
      } else {
        // Login failed, handle accordingly (e.g., show error message)
        console.log(data.error);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

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

  const openPopup = () => {
    setIsOpen(true);
  };

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
