import { useState } from 'react';
import { ProductsContext } from '../Context/ProductsContext';
import { useContext } from "react";

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const SearchBar = ()=>{
  
    const navigate = useNavigate();

    const selectProduct = (event, id)=>{
     localStorage.setItem('id', id)
     navigate(`/ProductPage/${id}`)
    }

   
const [searchCustomerDetails, setSearchCustomerDetails] = useState(''); 
    const prodContext = useContext(ProductsContext) ;
    // console.log(prodContext.items)
    const x = prodContext.items || [];
    
   const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          // Call your function or perform an action here
          handleEnterKeyAction();
        }
      };
    const handleEnterKeyAction = () => {
        // Replace this with your desired action
        console.log('Enter key was pressed. Input value:',searchCustomerDetails);
        if (searchCustomerDetails !==null && searchCustomerDetails !==''){
            navigate('/search-catalog/' + searchCustomerDetails)
        }
      };
    
    const handleSearch = x.filter(purchase=>   
        Object.values(purchase).join('').toLowerCase().trim().includes(searchCustomerDetails)
        )
        
    const purchasesToDisplay = searchCustomerDetails ? handleSearch : x;  
    const toggleSearch =()=>{
        setSearchCustomerDetails('')
      }
    return(
        <>
        <div className="w-[80%] lg:w-[640px] flex rounded-md overflow-hidden">
        <input 
        type="text" 
        value={searchCustomerDetails}
        placeholder='search products, brands and categories'
        onKeyPress={handleKeyPress}
        onChange={e=>setSearchCustomerDetails(e.target.value.toLocaleLowerCase())}
        className='outline-0 border-0 lg:block text-black  w-[90%] py-2 px-2' />
        
        {searchCustomerDetails? 
         <button onClick={toggleSearch} className="border-0 py-1 px-5 bg-purple-500 text-gray-50 cursor-pointer  lg:inline-block" ><FontAwesomeIcon icon={faXmark} size="lg" /></button>
         :<button  className="border-0 py-1 px-5 bg-purple-500 text-gray-50 cursor-pointer  lg:inline-block" ><FontAwesomeIcon icon={faMagnifyingGlass} size="lg" /></button>
      } 
          <div className='absolute z-10 mt-10  w-full lg:w-[630px] overflow-y-scroll bg-white'>
{searchCustomerDetails? purchasesToDisplay.map((purchase)=>(
<div className="flex gap-2.5 py-1.5 px-2.5 duration-75 cursor-pointer hover:shadow-md max-h-[80vh]" key={purchase._id} 
onClick={event=>selectProduct(event, purchase._id)}>
        <div 
className="w-10 aspect-square object-contain flex bg-no-repeat">
<img src={purchase.img} alt={purchase.img} className='w-full aspect-square m-auto object-contain' />
</div> 
    <div className="customer-name text-black">{purchase.title}</div>
    <div className="other-purchase-details">
    <div className="text-gray-400 ">{purchase.device}</div>
    </div>
   
</div>
         )):<div className='max-h-10'>

            </div>}


         {purchasesToDisplay &&
         <h2 className='m-auto text-gray-400 bg-blue-400'>
           
            {purchasesToDisplay===undefined &&
            <div>
                No Product found 
            </div>
            }
            </h2>
         }


</div>
      </div>
       </>
    )
}

export default SearchBar;