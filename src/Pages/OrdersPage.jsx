import { useState, useEffect} from 'react';
import { backend } from "../components/data/url";
// import { useAuthContext } from '../Hooks/useAuthContext';

import { NavBar, Footer}from '../components';


const OrdersPage = () => {
// const {user} = useAuthContext();
// console.log(user.user._id)
let id = '64ecbf2b6a657955a6e86500' ;

const [data, setData] = useState(null);
const [isPending, setPending] = useState(true);
const[error, setError] = useState(null);

    useEffect(()=>{
        fetch(`${backend}/payInfo/getUserPayments/${id}`)
        .then((res)=>{
         if(!res.ok){
            throw Error('Could not fetch the data ');
         }
          return res.json();
        }).then(data=> {    
          setData(data.response);
          setPending(false)
          
        })
        .catch(error=> {
          setPending(false)
          setError(error.message)
        })
        window.scrollTo(0, 0);
      }, []);

      const formatDate=(dateString)=>{
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // Add 1 to get the month from 1 to 12
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        
        const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
        return formattedDate;
      }
console.log(data)
  return (
    <div className='bg-gray-300 flex flex-col w-full'>
      <NavBar />

       <div className='max-w-7xl mx-auto w-full min-h-screen flex flex-col mt-32'>
            <h3>Orders History</h3>  
      {error &&
      <h4 className='text-gray-500 m-auto'>No Orders made: Orders Appear when you make a purchase.</h4>
      }
<div className='bg-white p-5 rounded-md h-fit w-full mx-auto mt-5 max-w-7xl flex justify-between font-bold underlined'>
  <p className=''>Contact</p>
  <p>TransactionID</p>
  <p>Location</p>
  <p>Price</p>
  <p>Date of Purchase</p>
  <p></p>
</div>
      {data && data.map(data=>(
        <div key={data._id} className='bg-white p-5 rounded-md h-fit w-full mx-auto mt-5 max-w-7xl flex justify-between'>
          <p>{data.receipt_contact}</p>
          <p>{data.transaction_id}</p>
          <p>{data.location[0]}</p>
          <p>{data.price}</p>
          <p>{formatDate(data.createdAt)}</p>
          <p></p>
        </div>
      ))}
      
      </div>
      <Footer />
    </div>
  )
}

export default OrdersPage;
