// import React from 'react';

import { useState, useEffect } from 'react';
import { backend } from './data/url';
const Advertisements = () => {
  const [page, setPage]= useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [isPending, setisPending] =useState(true);
  const [error, setError] = useState(null);
  const [adverts, setAdverts] =useState(null)
  const [success, setSuccess] = useState(false);

  useEffect(()=>{
    const abortCont = new AbortController();
    // setController(abortCont);
    fetch(`${backend}/advertisements/`)
    .then(res=>{
        if(!res.ok){
            throw Error('Could not fetch that resource')
        }
        return res.json()
    })
    .then(data=>{
      console.log(data)
     setAdverts(data)
     setPageCount(data.pageCount)
     setisPending(false)
     setError(null)
     setSuccess(true)
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

  return (
    <div className='w-full '>
    { adverts &&
    adverts.map(advert=>(
      <a href={advert.link} target="_blank" rel="noopener noreferrer" className='' key={advert._id}>
      <div className='cursor-pointer h-28 bg-gray-300 flex items-center gap-10 object-fit' >
      <img src={advert.image} alt={advert.title} className='w-28 h-full' />
     <p className='font-semibold'>{advert.category}</p>
      </div>
      </a>
    )
    )
}      
    </div>

  )
}

export default Advertisements
