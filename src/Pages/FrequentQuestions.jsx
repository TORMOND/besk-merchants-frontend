import {Footer, NavBar} from '../components';
import{ useEffect, useState } from "react";
import  {
    deliveryQuestions,
    retunsQuestions,
    orderingPaymentQuestions
} from '../components/data/FAQ'
const FrequentQuestions = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
      
      const [orders, setOrders] =useState(true);
      const [delivery, setDelivery] = useState(false);
      const [returns, setReturns] = useState(false);
      const [popupValue, setPopupValue] = useState(null);
     const [miniPopup, setMiniPopUp] = useState(false);

      const selectProduct = (id)=>{
        setPopupValue(id)
        setMiniPopUp(!miniPopup)
  
       }
      
       const setOrderModal=()=>{
        setOrders(true)
        setDelivery(false)
        setReturns(false)
       }
       const setDeliveryModal=()=>{
        setOrders(false)
        setDelivery(true)
        setReturns(false)
       }
       const setReturnsModal=()=>{
        setOrders(false)
        setDelivery(false)
        setReturns(true)
       }
     
  return (
    <div className="">
<NavBar />
        <div className="mt-40 flex  flex-col justify center  shadow-sm border border-gray-300 ">
            <h2>FREQUENT ASKED QUESTIONS</h2>
            <div className="flex flex-row gap-2.5 max-w-6xl">
                <h3 className="" onClick={setOrderModal}>Orders & Payments</h3>
                <h3 className=""onClick={setDeliveryModal}>Delivery</h3>
                <h3 className=""onClick={setReturnsModal}>Returns</h3>
            </div>
            {orders && 
             <div className="max-w-6xl lg:w-6xl h-fit py-5">
                {orderingPaymentQuestions.map((orderQuestion, index)=>(
                    <div key={index} className='border-y border-y-purple-500 p-2' onClick={()=>selectProduct(index)}>
                        <p className={`${popupValue===index? "relative bg-gray-300 " : "bg-white"}`}>{orderQuestion.question}</p>
                        <span className={`${popupValue===index? "block": "hidden"}`}>{orderQuestion.answer}</span>
                    </div>
                ))}
            </div>
            }
           {delivery &&
           <div className="max-w-6xl lg:w-6xl h-fit py-5">
                {deliveryQuestions.map((deliveryQuestion, index)=>(
                    <div key={index} className='border-y border-y-purple-500 p-2' onClick={()=>selectProduct(index)}>
                        <p className={`${popupValue===index? "relative bg-gray-300 " : "bg-white"}`}>{deliveryQuestion.question}</p>
                        <span className={`${popupValue===index? "block": "hidden"}`}>{deliveryQuestion.answer}</span>
                    </div>
                ))}
            </div>
           }
            {returns &&
            <div className="max-w-6xl lg:w-6xl h-fit py-5">
                {retunsQuestions.map((retunsQuestion, index)=>(
                    <div key={index} className='border-y border-y-purple-500 p-2' onClick={()=>selectProduct(index)}>
                        <p className={`${popupValue===index? "relative bg-gray-300 " : "bg-white"}`}>{retunsQuestion.question}</p>
                        <span className={`${popupValue===index? "block": "hidden"}`}>{retunsQuestion.answer}</span>
                    </div>
                ))}
            </div>
            }
            
        </div>
        <Footer />
    </div>
  )
}

export default FrequentQuestions