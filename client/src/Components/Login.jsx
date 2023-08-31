import React, {useState} from 'react';
import '../CSS/App.css';

const PromptPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userInput, setUserInput] = useState('');

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = () => {
    // Process userInput as needed
    console.log('User input:', userInput);
    closePopup();
  };

  return (
    <div className="popup-container">
      <button className={"login"} onClick={openPopup}>Open Prompt</button>
      <div className={`popup ${isOpen ? 'open' : ''}`}>
        <span className="close" onClick={closePopup}>&times;</span>
        <p>Enter your information:</p>
        <input type="text" value={userInput} onChange={handleInputChange} placeholder="Your input" />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default PromptPopup;
