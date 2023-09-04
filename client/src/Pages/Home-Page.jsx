import '../CSS/App.css';
import { NavBar } from "../Components/NavBar";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate(); // Initialize useHistory

    useEffect(() => {
        fetch("/login")
          .then(response => response.json())
          .then(data => {
            if (data.loggedIn) {
              setLoggedIn(true); // Correct the assignment here
            }
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }, []);

    useEffect(() => {
        if (loggedIn) {
          navigate("/calender")
        }
    }, [loggedIn, navigate]);

    return (
        <div className="home-page">
            <NavBar></NavBar>
        </div>
    );
}

export default HomePage;
