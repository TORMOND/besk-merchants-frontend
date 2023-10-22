import { useRef, useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthContext } from '../Hooks/useAuthContext';
import { useLogout } from '../Hooks/useLogout';
import SideMenu from './SideMenu';

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faCaretDown, faLocationDot, faRightToBracket, faBars, faXmark } 
from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';

import { CartContext } from "../Context/CartContext";
import { useContext } from "react";
import SearchBar from './SearchBar';
import LocationSelection from './LocationSelection';

const NavBar = ({ categories, handleBrands, handleContacts, handleOffers, search, setSearch}) => {
  
  const [userBar, setUserBar] = useState(false);
  const country = localStorage.getItem('country');
  const navigate = useNavigate();
  const {user} = useAuthContext();
  const cart = useContext(CartContext);
  const {logout} = useLogout();


const  cartValue =useRef();
const cartPage =()=>{
  if(cart.items.length > 0){
    navigate('/cart');
  }else{
    alert('Cart is Empty');
  }
  
}

const signInUser =()=>{
  navigate('/LoginPage')
}
const homePage = ()=>{
  navigate('/')
}
const profilePage=()=>{
  navigate('/Profile')
}
const ordersPage=()=>{
  navigate('/Orders')
}
const handleLogout =()=>{
  logout();
}

const userProfile = () =>{
  setUserBar(!userBar)
}

const modalRef = useRef(null);
const handleClickOutside = (event) => {
  if (!modalRef.current || !modalRef.current.contains(event.target)) {
    setUserBar(false)
  }
};
const [open, setOpen] = useState(false);

const selectProduct = (event, id)=>{
 localStorage.setItem('id', id)
 navigate(`/ProductPage/${id}`)
}

const [locationSetUp, setLocation] = useState(false); 
const locationSelection = () =>{  
  setLocation(!locationSetUp)         
}


    return (
   <div className="flex flex-col bg-black w-full box-border top-0 fixed z-20 mb-10" >
  {userBar &&  <div  ref={modalRef} className='dropdown-list absolute z-20 ml-[70vw] lg:ml-[86vw] rounded-md mt-12 bg-white shadow-lg py-4 px-6 '>
    {
            !user &&
             <button className="cursor-pointer p-1 duration-75 bg-purple-500 rounded-md  outline-1 outline-purple-500 flex gap-1 items-center px-4 py-2 text-white" onClick={signInUser}>
          <FontAwesomeIcon icon={faUser} className='my-0 mx-1.5' />
            <span className="text-sm">Sign in</span>
          </button>
          }
    
    {user && <div className='flex flex-col gap-2'>
      <button className="flex gap-2 cursor-pointer duration-75 hover:text-purple-500" onClick={handleLogout}>
         <FontAwesomeIcon icon={faRightToBracket} size="lg" />
            <p className="text-sm">Logout</p>
      </button>

          <button className="cursor-pointer p-1 duration-75 bg-purple-500 rounded-md  outline-1 outline-purple-500 flex gap-1 items-center px-4 py-2 text-white"
           onClick={profilePage}>
          <FontAwesomeIcon icon={faUser} className='my-0 mx-1.5' />
            <span className="text-xs">Profile</span>
          </button>
            <button className="cursor-pointer p-1 duration-75 bg-purple-500 rounded-md  outline-1 outline-purple-500 flex gap-1 items-center px-4 py-2 text-white"
           onClick={ordersPage}>
            <span className="text-xs">Orders</span>
          </button>
          </div>
          
}
    </div>
}
{locationSetUp && <LocationSelection locationSelection={locationSelection} />}
     <div className="flex  sm:flex-row md:items-center justify-between bg-black w-full  text-gray-50 py-2 px-4  box-border ">
      <h2 className='text-lg cursor-pointer' onClick={homePage}>BESK MERCHANTS</h2> 
       <h3 className='text-start cursor-pointer hidden lg:inline-block' onClick={locationSelection}><FontAwesomeIcon icon={faLocationDot} size="lg" /> {country}</h3>
      <div className='hidden lg:inline-block'>
        <SearchBar  />
      </div>
      
       
      <div className="flex gap-5 items-center max-w-7xl">
          <div className="relative cursor-pointer" onClick={cartPage}>
          <FontAwesomeIcon icon={faCartShopping}  className="text-xl my-0 mx-1.5" />
          <span  className="hidden lg:inline-block">Cart</span>
          <div className="text-purple-500 font-bold rounded-full absolute z-1 -mt-8 ml-3 ">
        <h6 ref={cartValue}>{cart.getNumberOfProducts()}</h6>
        </div>
          </div>
          {
            user==null &&
             <div className="cursor-pointer p-1 duration-75 hover:text-purple-200 outline-1 outline-purple-500">
          <FontAwesomeIcon icon={faUser} className='my-0 mx-1.5' />
          <FontAwesomeIcon icon={faCaretDown}  className='my-0 mx-1.5' onClick={userProfile}   />
          </div>
          }
         
          {user &&
          <div className="flex gap-2.5 px-4 py-2 items-center">
           <div className="navbar-item flex items-center cursor-pointer p-1 duration-75 hover:text-purple-500 outline-1 outline-purple-500" 
            onClick={userProfile}
           >
          <FontAwesomeIcon icon={faUser} className='my-0 mx-1.5' />
            <span className='hidden lg:block'>{user.user.firstName}</span>
            <FontAwesomeIcon icon={faCaretDown}  className='my-0 mx-1.5'  />
          </div>

          
          </div>
          }
        
         <div className="text-2xl cursor-pointer text-white " onClick={() => setOpen(!open)}>
            <div >{open ? <FontAwesomeIcon icon={faXmark} size="lg" />: <FontAwesomeIcon icon={faBars} size="lg" />}</div>
          </div>
         <ul
          className={`
         bg-white text-black fixed w-full lg:w-1/4 top-0 overflow-y-auto bottom-0 py-8 pl-4
        duration-500 ${open ? "left-0" : "left-[-100%]"}
        `}
        >
          
         <div className="text-2xl cursor-pointer flex justify-end px-5" onClick={() => setOpen(!open)}>
            <div >{open ? <FontAwesomeIcon icon={faXmark} size="lg" />: <FontAwesomeIcon icon={faBars} size="lg" />}</div>
          </div>
          <li>
            <Link to="/" className="py-7 px-3 inline-block">
              BESK MERCHANTS
            </Link>
          </li>
          <SideMenu />
          <div className="py-5">
            <button></button>
          </div>
        </ul>
      </div>

     </div>

 <div className="w-full flex items-center gap-2 py-2 lg:hidden px-5">
<h3 className='text-start cursor-pointer text-white' onClick={locationSelection}><FontAwesomeIcon icon={faLocationDot} size="lg" /> {country}</h3>
         <SearchBar />
      </div>     

     </div>
       
      );
}

export default NavBar;