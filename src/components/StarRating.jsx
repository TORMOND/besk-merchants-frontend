import { useState } from "react";

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const StarRating = ({ rating, rateValue }) => {
  const [hoveredStar, setHoveredStar] = useState(0);
  const [rate, setRate] = useState(1)


 const stars = [...Array(5)].map((star, index) => {
    const isFilled = index <= rating;
    const isHovered = index === hoveredStar;
    const handleSetRate=()=>{
      setRate(index+1)
      localStorage.setItem('rate',index+1)
      rateValue=rate
    }
    return (
      <span
        key={index}
        className={` ${isFilled ? "text-gray-400" : "text-gray-500"} ${isHovered ? "text-yellow-500" : ""} ${index<rate?"text-yellow-500": "text-gray-400"}`}
        onClick={handleSetRate}
      >
         <FontAwesomeIcon icon={ faStar } 
         className=' hover:text-yellow-500 cursor-pointer'
          />
      </span>
    );
  });

  return (
    <div className="star-rating">
      {stars} {rate}
    </div>
  );
};

export default StarRating;
