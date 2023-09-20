import {useState, useEffect, useContext} from 'react';
// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping} from '@fortawesome/free-solid-svg-icons';

import { CartContext } from "../Context/CartContext";

import { NavBar, Footer, Modal  }from '../components';

import { useNavigate} from 'react-router-dom';
import { backend } from "../components/data/url";
import Loading from '../components/Loading';
const FilteredCategoryPage = () => { 
    const cart = useContext(CartContext);
    const category =localStorage.getItem('categorySelected')
    const [products, setProducts] = useState(null);
    const [isPending, setPending] = useState(true);
    const[error, setError] = useState(null);
    const [brandChoice, setBrandChoice] = useState() 
    const [sortBy, setSortBy] = useState('lowToHigh');
        useEffect(()=>{
            fetch(`${backend}/products/getFilteredProducts/${category}`)
            .then((res)=>{
             if(!res.ok){
                throw Error('Could not fetch the data ');
             }
              return res.json();
            }).then(data=> {    
        
              setProducts(data.products);
              setPending(false)
            })
            .catch(error=> {
               console.log(error)
              setPending(false)
              setError(error.message)
            })
            window.scrollTo(0, 0);
          }, []);
     const navigate = useNavigate();
     const selectProduct = (event, id)=>{
      localStorage.setItem('id', id)
      navigate(`/ProductPage/${id}`)
     }
     const [isModal, setIsModal ] = useState(false);
  const toggleSearch =()=>{
    setIsModal(!isModal)
  }

  let brands = [] 
const findCategories =(products)=>{

for(let i =0; i< products.length; i++){
   brands.push(products[i].brands)
}
const y = Array.from(new Set(brands))
return y
}

const companyBrands = products? findCategories(products): [] 
const handleSortChange = (event) => {
   setSortBy(event.target.value);
 };

const handlBrandChange = (event) => {
  setBrandChoice(event.target.value);
  };
  let filteredProducts = brandChoice
  ? products.filter((product) => product.brands === brandChoice )
  : products;
  if (sortBy === 'lowToHigh') {
   filteredProducts = products? filteredProducts.sort((a, b) => a.price - b.price): '';
 } else if (sortBy === 'highToLow') {
   filteredProducts = products? filteredProducts.sort((a, b) => b.price - a.price): '';
 }
return ( 
      <div className="relative bg-gray-300 box-border">
         
    {isModal &&
         <Modal 
         toggleSearch={toggleSearch}
         />
      }
 
        <div className="w-full box-border min-h-screen">
        <NavBar
         toggleSearch={toggleSearch}
        />

        <div className="p-5 mt-20  flex flex-col lg:flex-row gap-5">
         <div className="mt-5 bg-white py-2 px-5 rounded-md h-fit  w-1/4">
         <h4 className="text-xl py-3 mt-2">BRANDS</h4>
         {companyBrands && companyBrands.map(brand=>(
            <div key={brand} className='py-1 flex gap-2'>
      <input
      type="radio" 
      name="radio"
      value={brand}
      checked={brandChoice === brand}
      onChange={handlBrandChange}
      />
         {brand}
         </div>
         ))}
           
         </div>
        
               {isPending &&              
         <div>
            <Loading />
            <Loading />
             <Loading />
              <Loading />
         </div>
                  }
               {error &&       
             <p className='w-full text-center font-semibold'>No Products added in this category</p>
               }
               
{products && <div className="selections">
               
            </div>}

 <div className="bg-white rounded-md p-5 max-w-7xl">
<div className="p-2 w-full flex justify-end">
<h4 className='p-2'>Sort by Price:</h4>
      <select value={sortBy} onChange={handleSortChange} className="outline-0 cursor-pointer duration-75 hover:text-purple-500 p-2">
        <option value="lowToHigh">Lowest to Highest</option>
        <option value="highToLow">Highest to Lowest</option>
      </select>

</div>
   <div className="grid  gap-2.5 grid-cols-2  lg:grid-cols-4 ">


{products && filteredProducts.map((product)=> (
   <div   key={product._id}>
   <div 
   className={`cursor-pointer  bg-white duration-75 rounded-sm hover:shadow-xl shadow-gray-500/50 aspect-square`} 
    onClick={event=>selectProduct(event, product._id)}>
    
   <div className="w-[60%] mx-auto aspect-square object-contain flex bg-no-repeat">
    <img src={product.img} alt={product.title} className='w-full aspect-square m-auto object-contain' />  
   </div> 
   <div className="p-4 font-semibold">
   <p>{product.title}</p>
   <span>${product.price}</span>
   
   </div>
   <button onClick={()=>cart.addOneToCart(product)} 
   className='text-sm before:absolute before:-ml-12 before:transition-[width] before:top-0 before:w-0 before:h-full before:bg-purple-500 before:skew-x-45 before:z-[-1] before:duration-1000  overflow-hidden relative    cursor-pointer p-2 flex justify-center w-4/5 rounded-sm  duration-1000 border-0 transition-all  text-purple-500 outline outline-offset-2 outline-purple-500 box-border hover:text-white hover:scale-110 hover:shadow-lg hover:shadow-purple-400  hover:before:w-80 mx-auto'
   >
      <FontAwesomeIcon icon={faCartShopping}  className="shoppingCart" />Add to Cart</button>
</div>
</div>
))}

   </div>
   </div>
        
            
           
        </div>
        <Footer />
        </div>
        </div>
     );
}
 

 
export default FilteredCategoryPage;