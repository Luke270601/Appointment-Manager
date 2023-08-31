import React, { useState, useEffect } from 'react';

function App() {
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
    <div className='app'>
      {(backendData.users.length === 0) ? ( 
        <p>loading...</p>
      ) : (
        backendData.users.map((user, i) => (
          <p key={i}>{user}</p>
        ))
      )}
    </div>
  );
}

export default App;
