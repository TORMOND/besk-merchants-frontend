import { countries } from './data/locations';
import { useState } from 'react';
const LocationSelection = () => {
 const [selectedOption, setSelectedOption] = useState()
  const handleStateChange = event => {
    setSelectedOption(event.target.value);
    localStorage.setItem('country', event.target.value)
  } ;
  
  return (
    <div>
        <div>
            <h4>Choose Your Location</h4>
            <div>
                <div>
                    
                </div>
                <div>
                <select onChange={handleStateChange} className="w-full  p-2 focus:outline-0" >
    {countries && countries.map(country=>(
        <option value={country.abbreviation} key={country.name}>{country.name}</option>
    ))}
    </select>
    <p>{selectedOption}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LocationSelection