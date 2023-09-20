import { useState, useEffect } from 'react';
import { useAuthContext } from '../Hooks/useAuthContext';

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronRight, faStar, faComments  } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { backend } from './data/url';
import { useNavigate } from 'react-router-dom';
import StarRating from './StarRating'
const CommentsSection = () => {
  const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [comment, setComments ] = useState('');
    const {user} = useAuthContext();
    const userName = user? user.user.firstName: null;
    const prod_id = localStorage.getItem('id');
    const [isPending, setisPending] =useState(true);
    const [error, setError] = useState(null);
    const [userComments, setUserComments] =useState(null)
    const [success, setSuccess] = useState(false);
    const [averageReviews, setAverageReviews] = useState(0)
  
    // const [ratingCount, setRatingCount] = useState(0);
    useEffect(()=>{
      const abortCont = new AbortController();
      // setController(abortCont);
      fetch(`${backend}/comments/${prod_id}`, {signal:abortCont.signal})
      .then(res=>{
          if(!res.ok){
              throw Error('Could not fetch that resource')
          }
          return res.json()
      })
      .then(data=>{
        console.log(data.comments)
       setUserComments(data.comments)
       setisPending(false)
       setError(null)

      })
      .catch(err=>{
          if(err.name ==='AbortError'){
              console.log('Fetch Aborted')
          }else{
              console.log(err)
              setError(err.message)
              setisPending(false) 
          }
          
      })
      return ()=> abortCont.abort();
  }, [success]);

    const sendComment= async()=>{
      const [rating, setRating] = localStorage.getItem('rate') || 1;
        setLoading(true)
        if(userName === null)return navigate('/LoginPage')
      const response = await fetch(`${backend}/comments/`, {
        method: 'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({comment, userName, productId:prod_id, productRating:rating})
    })
    
    const json = await response.json()
    console.log(json)
    if(!response.ok){
        setLoading(false)
        setIsError(true)
    }
      setSuccess(true)
      setLoading(false)
      setIsError(false)  
    }

    const StarCount = ({ reviewValue }) => {
      const [rating, setRating] = useState(1);
    
      useEffect(() => {
        // Get the review value from the props.
        const value = reviewValue || 1;
    
        // Set the initial rating to the review value.
        setRating(value);
      }, [reviewValue]);
    
      const stars = [...Array(5)].map((star, index) => {
        const isFilled = index+1 <= reviewValue;
        
        return (
          <span
            key={index}
            className={` ${isFilled? "text-yellow-500" : "text-gray-500"} `}
          >
             <FontAwesomeIcon icon={ faStar } 
             
          />
          </span>
        );
      });
    
      return (
        <div className="star-rating">
          {stars}  {reviewValue}
        </div>
      );
    };
    
    
  return (
    <div className="max-w-6xl p-4 mt-5 bg-white">
        <div className=''>
            <h4 className='mt-2'>Share your thoughts with other customers</h4>
        </div>
        <div className="flex flex-col gap-2.5 mt-2">
          <p>Rate product</p>
          <StarRating rating={5}  />


       <textarea
         type="text"
         placeholder="Comment"
         value={comment}
         onChange={(e) => setComments(e.target.value)}
         className='p-1 border border-gray-400 outline-1 outline-gray-400 text-sm w-[90%] md:w-96' 
         required
          />
          <button
           onClick={()=>sendComment()}
            className='bg-tertiary py-3 px-8 rounded-xl outline-none w-fit font-bold shadow-md shadow-primary '
          >
            {!loading? ' Send':
            <div>
 <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"></path>
 <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"></path>
 </svg>
 Sending ...
 </div>
}        
          </button>
      </div>
      <div className="border p-2 border-gray-400 rounded-sm mt-5">
        <div className='border-b border-b-gray-300 w-full flex justify-between py-1 px-2'>
          <h3>Customer Feedback</h3>
          <button 
                 className={`flex gap-1 duration-75 font-semibold hover:underline items-center hover:text-blue-400 ${userComments?.length===0?'text-gray-300 hover:text-gray-300':'text-purple-500'}`} disabled={userComments?.length===0}>View More <FontAwesomeIcon icon={faChevronRight} /></button>  
        </div>
        
      <div className="flex flex-col gap-2.5 mt-4">
        {userComments?.length===0 &&
        <div  className='text-gray-500 w-full text-center'>
          <FontAwesomeIcon icon={faComments} size="xl" />
            <p>No comments: be the first to comment.</p>
        </div>
      
        }
        {userComments &&
        userComments.map((comment) => (

        <div className="flex flex-col gap-2.5 p-3 " key={comment._id}>
          
          <div className='flex gap-2.5'>
            <StarCount reviewValue={comment.productRating} />
          </div>
    <div className='flex gap-2.5'>
    <div className="p-1 w-12 h-12 rounded-full flex justify-center items-center bg-gray-400 text-white">   
           <FontAwesomeIcon icon={faUser} className='' />
          </div>
          <div className="p-1 w-3/4 text-sm">
            <p>{comment.comment}</p>
          </div>
    </div>
          
       </div>
        ))
        }
       
     
      </div>
      </div>

    </div>
  )
}

export default CommentsSection
