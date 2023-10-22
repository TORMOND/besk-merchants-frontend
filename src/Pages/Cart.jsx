import { useNavigate } from 'react-router-dom';
import { CartContext } from "../Context/CartContext";
import { useContext, useState, useEffect } from "react";
import { useAuthContext } from '../Hooks/useAuthContext';

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

// components
import {Footer, NavBar, MpesaModal, Modal, Cancel, Success } from "../components";
import { backend } from "../components/data/url";

const Cart = () => {

    const navigate = useNavigate()
    const signInUser =()=>{
        navigate('/LoginPage')
      }
      const {user} = useAuthContext();
      

      const cart = useContext(CartContext);
      const productsCount = cart.items.reduce((sum, product) => sum + product.quantity, 0);
      console.log(cart.items)
      const [mpesaModal, setMpesaModal] = useState(false)
      const [isSuccess,setIsSuccess] = useState(false);
      const [isModal, setIsModal ] = useState(false);
      const [canceled, setIsCanceled] = useState(false);
      const [paymentLoading, setIsPaymentLoading] = useState(false);
      const [paymentError, setIsPaymentError] = useState(false);
      const currencies = JSON.parse(localStorage.getItem('USD_KSH')) || {KES:147} ;
      const currencyData = localStorage.getItem('currencyData') || 'KES';
      function findValueByKey(obj, key) {
        return obj[key];
      }
      console.log(currencies)
      
      const currencyValue = findValueByKey(currencies, currencyData);
      if (currencyValue !== undefined) {
        console.log(`The value for  is ${currencyValue}`);
      } else {
        console.log(`${currencyData} not found in the object`);
      }
      const [signInPrompt, setSignInPrompt] = useState(false);
      
      useEffect(() => {

        if (typeof window === 'undefined') {
          return;
        }
        if (window?.location.href.includes('success')) {
          setIsSuccess(true);
          // clearCart();
        }
        if (window?.location.href.includes('canceled')) {
          setIsCanceled(true);
        }
        window.scrollTo(0, 0);
      }, []);
      let color;
      let size;
      cart.items? color = cart.items.color : color = []
      cart.items? size = cart.items.size : size = []
    
      const [sizeChoice, setsizeChoice] = useState() 
        const handlsizeChange = (event) => {
          setsizeChoice(event.target.value);
          };
          const [colorChoice, setColorChoice] = useState() 
          const handlcolorChange = (event) => {
            setColorChoice(event.target.value);
            };
    
const checkout=()=>{

  if(!user) {
    setSignInPrompt(true)
  }
  setIsPaymentLoading(true)

  localStorage.setItem('session_id', []);
          const body ={
            items: cart.items,
            user:user.user._id,
            color,
            size
          }
          const headers ={
            "Content-Type": "application/json"
          }
          return fetch(`${backend}/payment/create-payment-intent`, {
            method:"POST",
            headers,
            body:JSON.stringify(body)
          }).then(response=>{
            return response.json();
          }).then((response) => {
                       if(response.url) {
                           window.location.assign(response.url); // Forwarding user to Stripe
                           console.log(response.session_id); //
                          //  orders.setorders(response.session_id)
                          localStorage.setItem('session_id', response.session_id);
                          setIsPaymentLoading(false)
                  }}).catch(error=>{
            console.log(error)
            setIsPaymentLoading(false)
            setIsPaymentError(true)
          })
        }
        const validateUser=()=>{
          if(user==null) return signInUser()
           checkout()
        }
const mpesaPay=()=>{
setMpesaModal(true)
}
const closeMpesa=()=>{
  setMpesaModal(false)
}
const toggleSearch =()=>{
  setIsModal(!isModal)
}
const toggleSuccess=()=>{
  setIsSuccess(false);

}
const toggleCancel=()=>{
  setIsCanceled(false);
}
const proceedToPay=()=>{
  checkout()
}
    return ( 
    <div>
      {mpesaModal &&
      <MpesaModal
      toggleMpesa={closeMpesa}
      amount={Math.ceil((cart.getTotalCost().toFixed(2))*currencyValue)}
      items={cart.items}
      KES={currencyValue}
      color={color}
      size={size}
      />
      }
       {isModal &&
         <Modal 
         toggleSearch={toggleSearch}
         />
      }
      {isSuccess &&
          <Success
     toggleSuccess={toggleSuccess}
           />
      }
   
      {canceled &&
      <Cancel
      toggleCancel={toggleCancel}
       />
      }
        <div className="cart-page">
 <NavBar 
 signInUser={signInUser} 
 toggleSearch={toggleSearch}
 />
<div className="w-full box-border flex bg-gray-100">
<div className="grid grid-cols-1 lg:grid-cols-3 gap-2.5 mt-10 max-w-8xl mx-auto">

  <div className="bg-white rounded-md p-2.5 col-start-1 col-end-3  ">
    <div className="p-2.5 border border-b-gray-300 text-start font-bold">
      <h2> Cart</h2>
    </div>
      {cart.items && cart.items.map((item, index)=>(
          <div className="grid grid-cols-3 gap-2.5 p-2.5 border border-b-gray-300" key={index}>
            <div className="h-36 w-36 rounded-md overflow-hidden object-cover">
                 <img src={item.img} alt={item.img} className='object-cover w-full' />
            </div>
         
            <div className="text-start py-2.5 px-1.5 col-end-3 ">
            <h3>{item.title}</h3>

            <p className='mt-3 font-semibold'>{item.brands}</p>          
            {item.color.length>0 &&<ul className='my-2'>
  <li className='flex gap-2'>
    <p className=''>Color: </p>
   
   
   {item.color.map((color) => (
     <label key={color} className='flex gap-1'>
     <input
      type="radio" 
      name="radio"
      value={color}
      checked={colorChoice === color}
      onChange={handlcolorChange}
      />
     <span>{color}</span>
   </label>
    ))
   }
    
    </li>
</ul>
}

{item.size.length>0 && <ul className='my-2'>
  <li className='flex gap-2'>
    <p className=''>Sizes: </p>
   
   {item.size.map((size) => (
    <label key={size} className='flex gap-1'>
			<input
       type="radio" 
       name="size"
       value={size}
       checked={sizeChoice === size}
       onChange={handlsizeChange}
       />
			<span>{size}</span>
		</label>
    ))
   }
    
    </li>
</ul>
}
 <div className="flex flex-col justify-between  ">
           <h3 > {currencyData} {Math.ceil(item.price*currencyValue*item.quantity)} 
            </h3>
           <div className="flex gap-2 items-center my-2 border border-gray-400 rounded-sm max-w-fit">
         
          <button onClick={() => cart.removeOneFromCart(item._id)} disabled={item.quantity===1} className="p-2  border-0 w-10 hover:text-purple-500 cursor-pointer">-</button>
          <div className="text-lg">{item.quantity}</div>
          <button disabled={item.quantity===1000} onClick={() => cart.increaseQuantity(item._id)} className="p-2 border-0 w-10 hover:text-purple-500 cursor-pointer">+</button>
          </div>
          <button onClick={() => cart.deleteFromCart(item._id)} 
          className="duration-75 cursor-pointer hover:text-red-500">Remove <FontAwesomeIcon icon={faTrash} size="lg" /></button>
           </div>
            </div>
          
          </div>
        ))}
        
        
  </div>
   <div className="bg-white p-2.5 mt-5 rounded-md top-20 sticky h-80 lg:min-w-[350px]">
   {cart.items && cart.items.map((item, index)=>(
          <div className="flex justify-between gap-2.5 p-2.5 border border-b-gray-300" key={index}>

            <h6>{item.title}</h6>

           <h6 className='text-end'>{currencyData} {Math.ceil(item.price*item.quantity*currencyValue)}</h6>

            </div>
        ))}

   <div className="flex justify-between items-end my-2 gap-4">
        <div>Items({productsCount})</div>
        <h3>Total: {currencyData} {Math.ceil((cart.getTotalCost().toFixed(2))*currencyValue)}
         </h3>
    </div>

 <div className='flex gap-4 flex-row'>
   <button
     className='before:absolute before:-ml-12 before:transition-[width] before:top-0 before:w-0 before:h-full before:bg-purple-500 before:skew-x-45 before:z-[-1] before:duration-1000 
      overflow-hidden relative mt-5 mx-auto cursor-pointer p-2 flex justify-center w-[80%] rounded-sm 
       duration-1000 border-0 transition-all  text-purple-500 outline outline-offset-2 outline-purple-500
        box-border hover:text-white hover:scale-110 hover:shadow-lg hover:shadow-purple-400  hover:before:w-80 '
     onClick={()=>validateUser()}
     >
      {!paymentLoading? 'Checkout with Card':
 <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"></path>
 <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"></path>
 </svg>
 
}
     
      </button>
      
      <button onClick={mpesaPay} 
   className='before:absolute before:-ml-12 before:transition-[width] before:top-0 before:w-0 before:h-full
    before:bg-green-500 before:skew-x-45 before:z-[-1] before:duration-1000  overflow-hidden relative 
    mt-5 mx-auto cursor-pointer p-2 flex justify-center w-[80%] rounded-sm  duration-1000 border-0 transition-all  text-green-500 outline outline-offset-2 outline-green-500 box-border hover:text-white hover:scale-110 hover:shadow-lg hover:shadow-green-400  hover:before:w-80 max-h-24 '
   >
    Pay with Mpesa
   </button>

   {signInPrompt &&
        <div className='fixed z-20 ml-[1%] mt-[10%] bg-white shadow-lg shadow-purple-500 rounded-md max-w-2xl p-4'>
          <div className='flex flex-col gap-2.5'>
            <h3 className=''>Sign In to Proceed</h3>
          <p className=''>We recommend for you to sign in in order for us to save your orders for you to review them later.
          You can choose to skip and we will still complete your order.
          </p>

          </div>
          <div className='mt-4 flex justify-start gap-5'>
            <button  className='before:absolute before:-ml-12 before:transition-[width] before:top-0 before:w-0 before:h-full before:bg-purple-500 before:skew-x-45 before:z-[-1] before:duration-1000 
      overflow-hidden relative mt-5  cursor-pointer p-2 flex justify-center w-[45%] lg:w-[40%] rounded-sm 
       duration-1000 border-0 transition-all  text-purple-500 outline outline-offset-2 outline-purple-500
        box-border hover:text-white hover:scale-110 hover:shadow-lg hover:shadow-purple-400  hover:before:w-80 '>Sign In</button>
            <button
            onClick={proceedToPay}
              className='before:absolute before:-ml-12  before:transition-[width] before:top-0 before:w-0 before:h-full before:bg-purple-500 before:skew-x-45 before:z-[-1] before:duration-1000 
      overflow-hidden relative mt-5  cursor-pointer p-2 flex justify-center w-[45%] lg:w-[40%] rounded-sm 
       duration-1000 border-0 transition-all  text-purple-500 outline outline-offset-2 outline-purple-500
        box-border hover:text-white hover:scale-110 hover:shadow-lg hover:shadow-purple-400  hover:before:w-80 '>Skip & Proceed</button>
          </div>
        </div>
      }
 </div>
   

   </div>
       </div>
      
</div>
   
        <Footer />
        </div>
        </div>
     );
}
 
export default Cart;