
import { countries } from './data/locations';
// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css/default';

const options = {
     type         : 'loop',
     autoplay     : false,
     pauseOnHover : true,
     resetProgress: false,
     perPage: 4,
   };


  import { backend } from './data/url';
  import { ProductsContext } from '../Context/ProductsContext';
 
const Products = () => {
   const [products, setProducts] = useState(null);
   const [isPending, setIsPending] = useState(false);
   const[error, setError] = useState(null)
   const prodContext = useContext(ProductsContext);
   const fetchProducts = ()=>{
     setIsPending(true)
      fetch(`${backend}/Products/`)
      .then((res)=>{
       if(!res.ok){
          throw Error('Could not fetch the data ');
       }
        return res.json();
      }).then(data=> {    
  
        setProducts(data);
        setIsPending(false)
        prodContext.setProducts(data)
      })
      .catch(error=> {
         console.log(error)
        setIsPending(false)
        setError(error.message)
      })
   } 
   const currencies = JSON.parse(localStorage.getItem('USD_KSH')) || {KES:147} ;
      const currencyData = localStorage.getItem('currencyData') || 'KES';
      function findValueByKey(obj, key) {
        return obj[key];
      }
   useEffect(()=>{
      prodContext.items.length>0?setProducts(prodContext.items):fetchProducts()
    }, []);

   // const cart = useContext(CartContext);
  
      // console.log(currencies)
      
      const currencyValue = findValueByKey(currencies, currencyData);
      // if (currencyValue !== undefined) {
      //   console.log(`The value for  is ${currencyValue}`);
      // } else {
      //   console.log(`${currencyData} not found in the object`);
      // }
let categories = [] 
const findCategories =(products)=>{

for(let i =0; i< products.length; i++){
   categories.push(products[i].device)
}
const y = Array.from(new Set(categories))
return y
}

           const items = products? findCategories(products): [] 
    
     const navigate = useNavigate();

     const selectProduct = (event, id)=>{
      localStorage.setItem('id', id)
      navigate(`/ProductPage/${id}`)
     }
     const filteredCategoryPage = (categoryName)=>{
      localStorage.setItem('categorySelected', categoryName)
      navigate(`/Category/${categoryName}`)
    }
    function getDeviceType() {
      const width = window.innerWidth;
      if (width < 768) {
          return 'Mobile';
      } else if (width >= 768 && width < 1024) {
          return 'Tablet';
      } else {
          return 'Desktop';
      }
  }


  const deviceType = getDeviceType();
  deviceType==='Mobile'? options.perPage = 2:options.perPage = 4

  const userCountry = localStorage.getItem('country');
//   const [currencyData, setCurrencyData] = useState('');
   const currency  = userCountry? countries.filter(country => country.abbreviation === userCountry)[0].currency :1;
   console.log(currency)
   
  
  return ( 
        <div className="w-full box-border md:w-full flex justify-center relative">
        <div className="bg-gray-100 p-0  lg:p-5 max-w-6xl mx-auto">

               {isPending &&     
               <div>         
            <Loading />
            <Loading />
             <Loading />
              <Loading />
            </div>
                  }
               {error &&       
        <Loading />
               }


            {products &&

            items.map((item)=>(
                <div key={item} className="w-full my-4 rounded-sm overflow-hidden shadow-md shadow-gray-400/50">
             <div className="flex gap-3 py-2 px-4 items-center bg-purple-400 justify-between">
                 <h3>{item}</h3>   
                 <button onClick={()=>filteredCategoryPage(`${item}`)} 
                 className='flex gap-1 duration-75 font-semibold hover:underline items-center hover:text-blue-400 '>View More <FontAwesomeIcon icon={faChevronRight} /></button>  
            </div>

            <Splide  
        options={options}     
        hasTrack={true}
        className='w-screen box-border md:w-full h-full flex relative  p-0 m-0 bg-white'>
   
               {products.filter((product)=>product.device ===item).slice(0, 10).map((product)=> (
                  <SplideSlide   key={product._id}
                  className={`cursor-pointer bg-white duration-75 rounded-s m hover:shadow-xl mx-2 my-0 h-fit flex flex-col shadow-gray-500/50 `} 
                   >
                   
       <div 
      className="w-[60%] mx-auto aspect-square object-contain flex bg-no-repeat"
      onClick={event=>selectProduct(event, product._id)}>
      <img src={product.img} alt={product.img} className='w-full aspect-square m-auto object-contain' />
   </div> 
                  <div className="p-4 font-semibold"
                  onClick={event=>selectProduct(event, product._id)}>
                  <p className='text-sm md:text-md'>{product.title}</p>
                  <span className='text-sm'>{currencyData}{Math.ceil(product.price*currencyValue)}</span>
                  
                  </div>
              
               </SplideSlide>
               ))}
               
            </Splide>
            </div>
            ))
            
            }
           
{products && 
<div>
   {/* <h3>Featured on other Platforms</h3> */}
 <div className="grid  gap-2.5 grid-cols-2  lg:grid-cols-4">
              
            {products && products.filter((product)=> product.url).map((product)=> (
            <div   key={product._id}>
                  <div className="cursor-pointer bg-white duration-75 rounded-sm hover:shadow-xl shadow-gray-500/50 px-4"
                   key={product._id} 
                   >
         <a href={product.url} rel="noreferrer" target="_blank">
                  <div className="product-image">
                   <img src={product.img} alt={product.img} />  
                  </div> 
                  <div className="p-4">
                  <p className='Product-title'>{product.title}</p>  
                  <span>{currencyData}  {product.price*currency}</span>
                  </div>
                  </a>
               </div>
            </div>
               ))}   
               
            </div>
 </div>           
            }


        </div>
        </div>
     );
}
 
export default Products;