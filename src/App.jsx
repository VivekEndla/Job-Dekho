import React, { useState } from 'react';
import Approutes from './routes/Approutes';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Default is false

  return (
    
    <Approutes isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
   
  );
}

export default App;
