import {useState, useEffect} from 'react';

import { NavBar, Footer, Modal  }from '../components';

import { useNavigate, useParams} from 'react-router-dom';
import { backend } from "../components/data/url";
import Loading from '../components/Loading';

const SearchCatalog = () => {
  const   searchTerm  = useParams();
   console.log(searchTerm)
    const category =searchTerm.searchTerm
    const [products, setProducts] = useState(null);
    const [isPending, setPending] = useState(true);
    const[error, setError] = useState(null);
    const [brandChoice, setBrandChoice] = useState() 
    const [categoryChoice, setCategoryChoice] = useState() 
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
              setProducts(data);
              setPending(false)
            })
            .catch(error=> {
               console.log(error)
              setPending(false)
              setError(true)
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
const findBrands =(products)=>{

for(let i =0; i< products.length; i++){
   brands.push(products[i].brands)
}
const y = Array.from(new Set(brands))
return y
}
let categories = [] 
const findCategories =(products)=>{

for(let i =0; i< products.length; i++){
   categories.push(products[i].device)
}
const y = Array.from(new Set(categories))
return y
}

           const items = products? findBrands(products): []
           const itemCategories = products? findCategories(products): []  
    

const companyBrands = products? findBrands(products): [] 
const handleSortChange = (event) => {
   setSortBy(event.target.value);
 };

const handlBrandChange = (event) => {
  setBrandChoice(event.target.value);
  };
  const handleCategoryChange = (event) => {
    setCategoryChoice(event.target.value);
    };
  let filteredProducts = brandChoice
  ? products.filter((product) => product.brands === brandChoice )
  : products;
  filteredProducts = categoryChoice?
  products.filter((product) => product.device === categoryChoice )
  :products;
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

        <div className="p-5 mt-20  flex gap-5">
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

           <h4 className="text-xl py-3 mt-2">CATEGORIES</h4>
         {itemCategories && itemCategories.map(category=>(
            <div key={category} className='py-1 flex gap-2'>
      <input
      type="radio" 
      name="radio"
      value={category}
      checked={categoryChoice === category}
      onChange={handleCategoryChange}
      />
         {category}
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
{filteredProducts && itemCategories.map((item)=>(
                <div key={item} className="w-full my-4 rounded-sm overflow-hidden shadow-md shadow-gray-400/50">
             <div className="flex gap-3 py-2 px-4 items-center bg-purple-400 justify-between">
                 <h3>{item}</h3>   
            </div>
   <div className="grid  gap-2.5 grid-cols-2  lg:grid-cols-4 ">


            {products && filteredProducts.filter(product=>product.device==item).map((product)=> (
   <div   key={product._id} >
   <div 
   className={`cursor-pointer  bg-white duration-75 rounded-sm hover:shadow-xl shadow-gray-500/50 aspect-square`} 
    onClick={event=>selectProduct(event, product._id)}>
    
   <div className="w-[80%] mx-auto aspect-square object-contain flex bg-no-repeat">
    <img src={product.img} alt={product.title} />  
   </div> 
   <div className="p-4 font-semibold text-sm">
   <p>{product.title}</p>
   <span>${product.price}</span>
   
   </div>

</div>
</div>
))}
            </div>
      


   </div>   
     ) )}
   </div>
        
            
           
        </div>
        <Footer />
        </div>
        </div>
  )
}

export default SearchCatalog