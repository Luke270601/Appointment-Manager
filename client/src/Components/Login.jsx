import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/App.css';

const PromptPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef(null);
  const navigate = useNavigate(); // Initialize useHistory


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


  const handleSubmit = () => {
    // Process userInput as needed
    closePopup();
    navigate('/calender')
  };

  return (
    <div id="promptBox" className="popup-container">
      <button className={"login"} onClick={openPopup}>Login</button>
      <div ref={popupRef} className={`popup ${isOpen ? 'open' : ''}`}>
        <li>Enter Login</li>
        <li>Email:</li><input type="text" placeholder="Your input" />
        <br/>
        <li>Password:</li><input type="text" placeholder="Your input" />
        <br/>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default PromptPopup;
