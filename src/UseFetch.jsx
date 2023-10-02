import { useState, useEffect } from 'react';
import { useContext } from "react";


const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setPending] = useState(true);
    const[error, setError] = useState(null)
  

    useEffect(()=>{
        fetch(url)
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
        
      }, [url]);

  return {data, error, isPending, setData}
}
 
export default useFetch;