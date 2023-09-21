import useFetch from '../UseFetch';

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { CartContext } from "../Context/CartContext";
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

 
const Products = () => {
   // const backend = process.env.BACKEND_URL;

   const KES = localStorage.getItem('USD_KSH');
   const { data:products, isPending, error } = useFetch(`${backend}/Products/`);
   const cart = useContext(CartContext);
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
                  className={`cursor-pointer bg-white duration-75 rounded-sm hover:shadow-xl mx-2 my-0 h-fit flex flex-col shadow-gray-500/50 `} 
                   >
                   
       <div 
      className="w-[60%] mx-auto aspect-square object-contain flex bg-no-repeat"
      onClick={event=>selectProduct(event, product._id)}>
      <img src={product.img} alt={product.img} className='w-full aspect-square m-auto object-contain' />
   </div> 
                  <div className="p-4 font-semibold"
                  onClick={event=>selectProduct(event, product._id)}>
                  <p className='text-sm md:text-md'>{product.title}</p>
                  <span className='text-sm'>${product.price}</span>
                  
                  </div>
                  {/* <button onClick={()=>cart.addOneToCart(product)} 
   className='text-sm before:absolute before:-ml-12 before:transition-[width] before:top-0 before:w-0 before:h-full before:bg-purple-500 before:skew-x-45 before:z-[-1] before:duration-1000  overflow-hidden relative    cursor-pointer p-2 flex justify-center w-4/5 rounded-sm  duration-1000 border-0 transition-all  text-purple-500 outline outline-offset-2 outline-purple-500 box-border hover:text-white hover:scale-110 hover:shadow-lg hover:shadow-purple-400  hover:before:w-80 mx-auto'
   >
      <FontAwesomeIcon icon={faCartShopping}  className="shoppingCart" />Add to Cart</button> */}
              
               </SplideSlide>
               ))}
               
            </Splide>
            </div>
            ))
            
            }
           
{products && 
<div>
    {/* products && products.filter((product)=> product.url).map((product)=> (
            <h3 className={`${products? 'inline-block': 'hidden'}`}>Featured on Amazon</h3>
            )}  */}
 <div className="grid  gap-2.5 grid-cols-2  lg:grid-cols-4">
              
            {products && products.filter((product)=> product.url).map((product)=> (
            <div   key={product._id}>
                  <div className="cursor-pointer bg-white duration-75 rounded-sm hover:shadow-xl shadow-gray-500/50 px-4"
                   key={product._id} 
                  //  onClick={event=>selectProduct(event, product._id)}
                   >
         <a href={product.url} rel="noreferrer" target="_blank">
                  <div className="product-image">
                   <img src={product.img} alt={product.img} />  
                  </div> 
                  <div className="p-4">
                  <p className='Product-title'>{product.title}</p>  
                  <span>${product.price}</span>
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