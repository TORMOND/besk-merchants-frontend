import React, { createContext, useContext, useState } from 'react';

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [selectedLocation, setSelectedLocation] = useState('');

  const updateLocation = (location) => {
    setSelectedLocation(location);
    localStorage.setItem('country', location);
    // Add any other logic you need to update the location globally
  };

  return (
    <LocationContext.Provider value={{ selectedLocation, updateLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
