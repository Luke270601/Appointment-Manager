import '../CSS/App.css';
import {NavBar} from "../Components/NavBar";
import React, { useState, useEffect } from 'react';

function HomePage() {
    const [backendData, setBackendData] = useState({ users: [] });

    useEffect(() => {
      fetch("/api")
        .then(response => response.json())
        .then(data => {
          setBackendData(data);
          console.log(data);
        });
    }, []);

    return (
        <div className="home-page">
                <NavBar></NavBar>
        </div>
    );
}

export default HomePage;
