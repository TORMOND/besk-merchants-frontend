import {useState, useEffect} from 'react';
import { backend } from "./data/url";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css/default';
import { useNavigate} from 'react-router-dom';
import Loading from './Loading';
const options = {
     type         : 'loop',
     autoplay     : false,
     pauseOnHover : true,
     resetProgress: false,
     perPage: 4,
   };

const SimilarProducts = ({category}) => {
    const navigate = useNavigate();
    // console.log(category)
    // const category = category;
    const id = localStorage.getItem('id');
    const [products, setProducts] = useState(null);
    const [isPending, setPending] = useState(true);
    const[error, setError] = useState(null);
    useEffect(()=>{
        fetch(`${backend}/products/catalog/${category}`)
        .then((res)=>{
         if(!res.ok){
            throw Error('Could not fetch the data ');
         }
          return res.json();
        }).then(data=> {    
          setProducts(data.products);
          // console.log(data);
          setPending(false)
        })
        .catch(error=> {
           console.log(error)
          setPending(false)
          setError(error.message)
        })
        window.scrollTo(0, 0);
      }, []);

      
     const selectProduct = (event, id)=>{
        localStorage.setItem('id', id)
        navigate(`/ProductPage/${id}`)
       }
       const currencies = JSON.parse(localStorage.getItem('USD_KSH')) || {currencyValue:147} ;
      const currencyData = localStorage.getItem('currencyData') || 'currencyValue';
      function findValueByKey(obj, key) {
        return obj[key];
      }
      // console.log(currencies)
      
      const currencyValue = findValueByKey(currencies, currencyData);
      // if (currencyValue !== undefined) {
      //   console.log(`The value for  is ${currencyValue}`);
      // } else {
      //   console.log(`${currencyData} not found in the object`);
      // }
  return (
    <div>
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
               <h3 className='px-10 '>Related Products</h3>
{products &&

<Splide  
options={options}     
hasTrack={true}
className='w-screen box-border md:max-w-6xl h-full flex relative mt-5 p-0 m-0 bg-white'>

   {products.filter(product=>product._id !==id).slice(0, 10).map((product)=> (
      <SplideSlide   key={product._id}
      className={`cursor-pointer bg-white duration-75 rounded-sm hover:shadow-xl mx-2 my-0 max-h-[350px] flex flex-col shadow-gray-500/50 aspect-square`} 
       onClick={event=>selectProduct(event, product._id)}>
       
<div 
className="w-[80%] mx-auto aspect-square object-contain flex bg-no-repeat">
<img src={product.img} alt={product.img} className='w-full aspect-square m-auto object-contain' />
</div> 
      <div className="p-4 font-semibold">
      <p className='text-sm md:text-md'>{product.title}</p>
      <span className=''>{currencyData}{Math.ceil(product.price*currencyValue)}</span>
      
      </div>
  
  
   </SplideSlide>
   ))}
   
</Splide>


}
    </div>
  )
}

export default SimilarProducts