import { useState, useEffect} from 'react';
import { backend } from "../components/data/url";
// import { useAuthContext } from '../Hooks/useAuthContext';


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
          setData(data);
          setPending(false)
          
        })
        .catch(error=> {
          setPending(false)
          setError(error.message)
        })

      }, []);
console.log(data)
  return (
    <div className=''>
       <div className='max-w-7xl min-h-screen flex'>
      <h4 className='text-gray-500 m-auto'>No Orders made: Orders Appear when you make a purchase.</h4>
      </div>
    </div>
  )
}

export default OrdersPage;
