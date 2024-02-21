// import React from 'react';

import  { useState, useEffect } from 'react';
import { backend } from './data/url';

const Advertisements = () => {
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [adverts, setAdverts] = useState(null);
  const [success, setSuccess] = useState(false);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  useEffect(() => {
    const abortCont = new AbortController();
    fetch(`${backend}/advertisements/`)
      .then((res) => {
        if (!res.ok) {
          throw Error('Could not fetch that resource');
        }
        return res.json();
      })
      .then((data) => {
        setAdverts(data);
        setPageCount(data.pageCount);
        setIsPending(false);
        setError(null);
        setSuccess(true);
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          console.log('Fetch Aborted');
        } else {
          console.log(err);
          setError(err.message);
          setIsPending(false);
        }
      });

    return () => abortCont.abort();
  }, [success]);

  useEffect(() => {
    // Set interval to change the displayed advert every 3 seconds
    const intervalId = setInterval(() => {
      adverts?setCurrentAdIndex((prevIndex) => (prevIndex + 1) % adverts.length): setCurrentAdIndex(0)
    }, 10000);

    // Clean up the interval when the component unmounts or adverts change
    return () => clearInterval(intervalId);
  }, [adverts]);

  return (
    <div className="w-full ">
      {adverts &&
        adverts.map((advert, index) => (
          <a
            href={advert.link}
            target="_blank"
            rel="noopener noreferrer"
            className={index === currentAdIndex ? '' : 'hidden'}
            key={advert._id}
          >
            <div className="cursor-pointer h-28 bg-gray-300 flex items-center gap-10 object-fit">
              <img src={advert.image} alt={advert.title} className="w-28 h-full" />
              <p className="font-semibold">{advert.category}</p>
            </div>
          </a>
        ))}
    </div>
  );
};

export default Advertisements;
