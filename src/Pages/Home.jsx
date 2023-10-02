import { useNavigate } from 'react-router-dom';
import  { useState, useRef, useEffect } from 'react';
import { useLogout } from '../Hooks/useLogout';

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp  } from '@fortawesome/free-solid-svg-icons';
import { NavBar, Products, Footer, PopUps, Brands, HeroSection, countries, Categories, HeroMobile}from '../components';

import Modal from '../components/Modal';
import axios from 'axios';

const Home = () => {     

  const navigate = useNavigate();

  const [userBar, setUserBar] = useState(false);
  const userProfileBar =useRef(null);
  const { logout } = useLogout();
  const [show, setShow] = useState(false);
  const [brands, setBrands] = useState(false);
  const [contacts, setContacts] = useState(false);
  const ref = useRef(null);
  const brands_ref = useRef(null);
  const [country, setCountry] = useState('');
 const countriesList = countries
 console.log(countries)

 const [currencyData, setCurrencyData] = useState('');
// const currency  = countriesList.filter(country => country.abbreviation === userCountry)[0].currency


useEffect(()=>{

  // Fetches user location based on IP address
  axios.get(
    'https://ipinfo.io?token=0b3c48d0a4400f'
    )
      .then(response => {
        const data = response.data;
        const userCountry = data.country;
        setCountry(userCountry);
        localStorage.setItem('country', userCountry)
        setCurrencyData(countriesList.filter(country => country.abbreviation === userCountry)[0].currency)
        localStorage.setItem('currencyData', currencyData)
        console.log(currencyData)
        console.log(data)
      })
      .catch(error => {
        console.error('Error fetching IP data:', error);
      });

  fetch('https://api.exchangerate-api.com/v4/latest/USD')
  .then(response =>{
      return response.json();
  }).then(data =>{
    const currency = data.rates;
      localStorage.setItem('USD_KSH', JSON.stringify(currency))
  }).catch(err=>{
    console.log(err.message)
  })
  
}, [])
const signInUser =()=>{
  navigate('/LoginPage')
}
const handleLogout =()=>{
  logout()
}
const userProfile = () =>{
  setUserBar(!userBar)
}
const handleCategories =()=>{
  setShow(!show)
}
const togglePopup =()=>{
setShow(null);
setBrands(null)
setContacts(null)
}

const handleBrands =()=>{
  setBrands(!brands);
}
const handleOffers=()=>{
  setShow(!show);
}
const handleContacts=()=>{
  setContacts(!contacts);
}
const [isModal, setIsModal ] = useState(false);
  const toggleSearch =()=>{
    setIsModal(!isModal)
  }

  const scrollToTop = ()=>{
    window.scrollTo(0, 0);
  }
const [search, setSearch] = useState('')

    return ( 
        <div className="relative bg-gray-100">

   { show && <div id='w-full bg-[rgba(0,0,0,0.5)] fixed z-10 overflow-auto h-full flex' ref={ref}>
   
   <PopUps ref={ref}  togglePopup={togglePopup} />

    </div>}
    { brands && <div id='popups' ref={ref}>
 
   <Brands ref={brands_ref} togglePopup={togglePopup}  />

    </div>}


    {isModal &&
         <Modal 
         toggleSearch={toggleSearch}
         />
      }

<NavBar
 signInUser={signInUser}  categories={handleCategories}
 userProfile={userProfile} handleBrands={handleBrands}
 handleContacts={handleContacts} handleOffers={handleOffers} 
 search={search} setSearch={setSearch}
 toggleSearch={toggleSearch}
 />
{userBar && <div className="user-profile-bar" ref={userProfileBar}>
  <p  className='checkProfile'>PROFILE</p>
  <p className='logout' onClick={handleLogout}>LOG OUT</p>
</div>
}

<HeroSection />
<Categories />
<HeroMobile />
<Products />

<div className='fixed z-30 w-16 h-16 ml-[94%] -mt-24 '>
   <button onClick={scrollToTop}
   className=' text-purple-600 font-bold border-4 border-purple-600  rounded-full w-full h-full '
   ><FontAwesomeIcon icon={faChevronUp} size="lg" /></button>
</div>
<Footer
 generateForm={handleContacts}
 
 />
        </div>
     );
}

export default Home;