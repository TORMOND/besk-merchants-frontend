import { countries } from './data/locations';
import { useState } from 'react';
import { motion } from 'framer-motion';
// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark} from '@fortawesome/free-solid-svg-icons';

const LocationSelection = ({locationSelection}) => {
 const [selectedOption, setSelectedOption] = useState();
//  const [country, setCountry] = useState('');
 const countriesList = countries;
 const [currencyData, setCurrencyData] = useState('');
 const handleStateChange = event => {
    setSelectedOption(event.target.value);
    localStorage.setItem('country', event.target.value)
    setCurrencyData(countriesList.filter(country => country.abbreviation ===event.target.value)[0].currency)
    localStorage.setItem('currencyData', countriesList.filter(country => country.abbreviation ===event.target.value)[0].currency)
  } ;
  const containerVariants={
    hidden:{
        opacity:0,
    },
    visible:{
        opacity:1,
        transition:{
            type:'spring',
            delay:0.5
        }
    }
}
const boxVariants={
    hidden:{
        opacity:0,
        y:'-100vw'
    },
    visible:{
        opacity:1,
        y:0,
        transition:{
            type:'spring',
            delay:0.5,
            duration:2
        }
    }
}
  return (
    <motion.div
    variants= {containerVariants}
    initial='hidden'
    animate='visible'
    className='w-screen bg-[#00000071] fixed z-30 h-screen flex justify-center items-center box-border'
    >
       <motion.div
        variants= {boxVariants}
        initial='hidden'
        animate='visible'
        className={`rounded-lg flex flex-col p-2 bg-gray-50 w-fit mt-1 h-fit  lg:w-[60%]`}
        >
    <div >
        <div className='w-full flex justify-end p-2'>
               <button onClick={locationSelection} className='border border-gray-300 rounded-sm py-1 px-1.5'>
                    <FontAwesomeIcon icon={faXmark} size="lg" />
                    </button> 
        </div>

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
    </motion.div>
        </motion.div>
  )
}

export default LocationSelection