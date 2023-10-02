import {useState, useEffect, useContext} from 'react';
import { CartContext } from "../Context/CartContext";

import { NavBar, Footer, Modal  }from '../components';

import { useNavigate, useParams} from 'react-router-dom';
import { backend } from "../components/data/url";
import Loading from '../components/Loading';
// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';


const Catalog = () => {
  const  {categ, searchTerm}  = useParams();
  const cart = useContext(CartContext);
  const [page, setPage]= useState(0);
  const [pageCount, setPageCount] = useState(0);
   console.log(categ, searchTerm)
    const category =searchTerm
    const [products, setProducts] = useState(null);
    const [isPending, setPending] = useState(true);
    const[error, setError] = useState(null);
    const [brandChoice, setBrandChoice] = useState() 
    const [categoryChoice] = useState(categ) 
    const [sortBy, setSortBy] = useState('lowToHigh');
        useEffect(()=>{
            fetch(`${backend}/products/getSearchProducts/${category}`)
            .then((res)=>{
             if(!res.ok){
                throw Error('Could not fetch the data ');
             }
              return res.json();
            }).then(data=> {    
             console.log(data);
              setProducts(data.products);     
              setPageCount(data.pageCount)
              setPending(false)
            })
            .catch(error=> {
               console.log(error)
              setPending(false)
              setError(true)
            })
            window.scrollTo(0, 0);
          }, [page]);
              
    const handlePrev=()=>{
      setPage((p)=>{
        if(p===0) return p;
        return page-1;
      })
     }
     const handleNext=()=>{
      setPage((p)=>{
        if(p===pageCount) return p;
        return page+1;
      })
     }
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
const findBrands =(products)=>{

for(let i =0; i< products.length; i++){
   brands.push(products[i].brands)
}
const y = Array.from(new Set(brands))
return y
}

// const items = products? findBrands(products): []

const companyBrands = products? findBrands(products): [] 
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
             <p className='w-full text-center font-semibold'>No Such Products</p>
               }
               
{products && <div className="selections">
               
            </div>}

 <div className="bg-white rounded-md p-5 max-w-7xl">
<div className="p-2 w-full flex justify-end">
<h4>Sort by Price:</h4>
      <select value={sortBy} onChange={handleSortChange} className="outline-0 cursor-pointer duration-75 hover:text-purple-500">
        <option value="lowToHigh">Lowest to Highest</option>
        <option value="highToLow">Highest to Lowest</option>
      </select>

</div>

   <div className="grid  gap-2.5 grid-cols-2  lg:grid-cols-4 ">


            {products && filteredProducts.filter(product=>product.device==categoryChoice).map((product)=> (
   <div   key={product._id} >
   <div 
   className={`cursor-pointer  bg-white duration-75 rounded-sm hover:shadow-xl shadow-gray-500/50 aspect-square`} 
   >
    
   <div className="w-[80%] mx-auto aspect-square object-contain flex bg-no-repeat"
    onClick={event=>selectProduct(event, product._id)}>
    <img src={product.img} alt={product.title} />  
   </div> 
   <div className="p-4 font-semibold text-sm"
    onClick={event=>selectProduct(event, product._id)}>
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
            {products &&
               <div className="flex gap-2.5 py-2.5 px-5 justify-end ">
                <p>{page+1} out of: {pageCount}</p>
                <button
                className="border border-purple-500 bg-white cursor-pointer font-semibold rounded-sm py-2.5 px-6 hover:bg-[#f6f8fa]"
                 onClick={handlePrev} disabled={page===0}>Prev</button>
                <button
                className="border border-purple-500 bg-white cursor-pointer font-semibold rounded-sm py-2.5 px-6 hover:bg-[#f6f8fa]"
                 onClick={handleNext} disabled={page===pageCount}>Next</button>
               </div> 
               }
   </div>
        
            
           
        </div>
        <Footer />
        </div>
        </div>
  )
}

export default Catalog