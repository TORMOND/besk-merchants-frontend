import  { useState, useEffect } from 'react';
import { backend } from "../components/data/url";

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck } from '@fortawesome/free-solid-svg-icons';

const Location = () => {
  const [locations, setLocations]= useState(null);
    const [isPending, setisPending] =useState(true);
    const [error, setError] = useState(null);
    const [selectedCounty, setSelectedCounty] = useState();
    const [selectedOption, setSelectedOption] = useState()
    const [state, setState] = useState()

  useEffect(()=>{
    const abortCont = new AbortController();
    // setController(abortCont);
    fetch(`${backend}/locations/`)
    .then(res=>{
        if(!res.ok){
            throw Error('Could not fetch that resource')
        }
        return res.json()
    })
    .then(location=>{
     setLocations(location)
     setisPending(false)
     setSelectedCounty(location[0].county)
     setError(null)

    })
    .catch(err=>{
        if(err.name ==='AbortError'){
            console.log('Fetch Aborted')
        }else{
            console.log(err)
            setError(err.message)
            setisPending(false) 
        }
        
    })
    return ()=> abortCont.abort();
}, []);



let categories = [] 
const findCounties =(locations)=>{

for(let i =0; i< locations.length; i++){
   categories.push(locations[i].county)
}
const y = Array.from(new Set(categories))
return y
}

 const counties = locations? findCounties(locations): [] 

 const handleCountyChange = event => {
  setSelectedCounty(event.target.value);
} ;
const handleStateChange = event => {
  setSelectedOption(event.target.value);
  localStorage.setItem('selectedLocation', event.target.value)
} ;

  const [price, setPrice] = useState()
useEffect(()=>{

  console.log(selectedOption) 
  locations?.filter((location)=> location.state ===selectedOption).map(location=>{
      setPrice(location.price)
      const newPrice = location.price
      localStorage.setItem('location-Price', newPrice)
      console.log(newPrice)
  })

}, [selectedOption])


  return (
    <div>
      {isPending &&
      <div>
         <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"></path>
 <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"></path>
 </svg>
      </div>
      }
      <div className>

   <div className="border my-4 border-gray-400 w-1/2"> 
       <select onChange={handleCountyChange} className="w-full  p-2 focus:outline-0 rounded-sm" >
    {counties && counties.map(county=>(
        <option value={county} key={county}>{county}</option>
    ))}
     </select>
   </div>
   <div className="border my-4 border-gray-400 w-1/2"> 
       <select onChange={handleStateChange} className="w-full  p-2 focus:outline-0" >
    {locations && locations.filter((location)=> location.county ===selectedCounty).map(location=>(
        <option value={state} key={location.state}>{location.state}</option>
    ))}
     </select>
   </div>  
{
  price &&
  <div className="flex gap-2 text-sm">
  <FontAwesomeIcon icon={faTruck} size="xl" />
<div className='flex gap-1'>Delivery to  <h4>{selectedOption}</h4>  is<h4> Ksh {price}</h4> & Occurs within the next 48hrs After Purchase</div>
    </div>
}
    </div>
    </div>  
  );
};

export default Location;
