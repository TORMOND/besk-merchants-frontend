import { useState } from 'react';
import {allCategories} from './data/categories';
 
const CategoriesBar = () => {
  
const [isHovered, setIsHovered] = useState(false);
const [name, setName] = useState()
const handleHover = (categoryName) => {
   setName(categoryName)
   console.log(name)
  setIsHovered(true);
};

const handleLeave = () => {
  setIsHovered(false);
};
console.log(allCategories)
  return (
    <div className='fixed w-1/4 lg:relative lg:z-10  flex gap-2.5 lg:w-full bg-gray-900 px-10 text-white'>
        {allCategories.map(category =>(
          <div key={category}>
            <p 
             className='cursor-pointer font-semibold'
             onMouseEnter={()=>handleHover(category.categoryName)}
             onMouseLeave={handleLeave}
            >{category.categoryName}
            {isHovered && category.catalog.map(catalog=>(
              <ul className="dropdown-list absolute z-20  flex flex-col bg-white text-black" key={catalog}>
                <li>{catalog}</li>
              </ul>
            ))}
            </p>
          </div>
        ))}
    </div>
  )
}

export default CategoriesBar