// FontAwesome
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useEffect, useState } from 'react';
import {backend} from './data/url';
const options = {
     type         : 'loop',
     autoplay     : true,
     pauseOnHover : true,
     resetProgress: false,
   };

const HeroSection = () => {
 const  [data, setData] = useState([]);
  useEffect(() => {
     fetch(`${backend}/heroSection`)
     .then(response => response.json())
     .then(data =>{
          setData(data)
          console.log(data)
     })
     .catch(error => console.log(error))
  }, []);
 
  return (
    <div className='mt-16 pb-5 hidden lg:flex'> 
    {data.length > 0?
     <Splide  
     options={options}
     hasTrack={true}
     className="w-full box-border h-96 p-3 flex  bg-white relative"
     >

     {data.map((item, index) => (

     <SplideSlide key={index} className='w-full '>

     <div
           className={`flex flex-col justify-center items-center  h-full rounded-md object-cover bg-no-repeat  lg:text-lg`}
           style={{backgroundImage: `url(${item.img})`}}
          >
               <h2 className='text-lg md:text-xl lg:text-2xl'>{item.name}</h2>
                 </div>
     </SplideSlide>
     ))}
</Splide>:

  <Splide  
     options={options}
     hasTrack={true}
     className="w-full box-border h-96 p-3 flex  bg-white relative"
     >
     
  <SplideSlide className='w-full bg-red-300'>
  <div 
       className="flex flex-col justify-center items-center  h-full rounded-md bg-gradient-to-r from-gray-300 to-slate-500  lg:text-lg">
        <h2 className='text-lg md:text-xl lg:text-2xl'>We Provide The Best Products</h2>
       </div>
  </SplideSlide>
  <SplideSlide>
  
  <div 
       className="flex flex-col justify-center items-center w-full h-full rounded-md bg-gradient-to-r from-gray-300 to-slate-500 ">
        <h2 className='text-lg md:text-xl lg:text-2xl'>Dedicated to our customers</h2>
       </div>
  </SplideSlide>
  <SplideSlide className='w-full bg-red-300'>
   
  <div 
       className="flex flex-col justify-center items-center w-full h-full rounded-md bg-gradient-to-r from-gray-300 to-slate-500 ">
        <h2 className='text-lg md:text-xl lg:text-2xl'>Fast & WorldWide Shipment</h2>
       </div>
  </SplideSlide>
  <SplideSlide>
   
  <div 
       className="flex flex-col justify-center items-center w-full h-full rounded-md bg-gradient-to-r from-gray-300 to-slate-500 ">
        <h2 className='text-lg md:text-xl lg:text-2xl'>We offer both wholesale & Retail sales</h2>
       </div>
 </SplideSlide>
  <SplideSlide>
   
  <div 
       className="flex flex-col justify-center items-center w-full h-full rounded-md bg-gradient-to-r from-gray-300 to-slate-500 ">
        <h2 className='text-lg md:text-xl lg:text-2xl'>Contact Us for a personalized requests</h2>
       </div>
 </SplideSlide>

</Splide>



}
   
    </div>
  );
};

export default HeroSection;

