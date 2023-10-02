import  { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [country, setCountry] = useState('');

  useEffect(() => {
    // Fetch the user's IP address
    axios.get('https://ipinfo.io?token=0b3c48d0a4400f')
      .then(response => {
        const data = response.data;
        const userCountry = data.country;
        setCountry(userCountry);
      })
      .catch(error => {
        console.error('Error fetching IP data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Identify User's Country</h1>
      <p>User is in: {country}</p>
    </div>
  );
}

export default App;
