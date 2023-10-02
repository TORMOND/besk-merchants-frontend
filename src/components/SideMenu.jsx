
import  { useState } from "react";
import { Link } from "react-router-dom";
import { links } from "./data/Links";
// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faChevronRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';



const SideMenu = () => {
  const [submenu, setSubmenu] = useState(false);
  const [menuTitle, setMenuTitle] = useState('');
const selectSubmenu = (name)=>{
setMenuTitle(name)
setSubmenu(true)
}

  return (
    <div>
      <div>

        {submenu==false && links.map((link, index) => (
        <div key={index}>
         
          <h3
              className="text-sm text-gray-500 lg:text-md w-full  lg:text-md py-1 flex justify-between items-center cursor-pointer md:pr-0 pr-5 "
            onClick={()=>selectSubmenu(link.name)}
            >
              {link.name}
      
              <span className="text-sm text-gray-500 md:mt-1 md:ml-2 px-5 block  group-hover:rotate-180 group-hover:-mt-2">
                <p className="">
                <FontAwesomeIcon icon={faChevronRight} /> 
                </p>
              </span>
            </h3>  
           
        </div>
      ))}
      </div>
     


{submenu && links.filter(link=>link.name ===menuTitle).map((link, index) => (
        <div key={index}>
          <h3
          onClick={()=>setSubmenu(false)}
           className="flex gap-1 items-center cursor-pointer border-b border-b-gray-300 pb-2" ><FontAwesomeIcon icon={faArrowLeft} className="text-gray-500" />  MAIN MENU</h3>
          <h3
              className="text-sm lg:text-lg w-full lg:w-fit lg:text-md py-1 flex justify-between items-center cursor-pointer md:pr-0 pr-5 "
            >
              {link.name}
            </h3>
            {submenu && 
             link.submenu && (
              <div>
                <div className="">
                  <div className="py-2">
                    <div
                      className="w-4 h-4 left-2 absolute 
                    mt-1 bg-white rotate-45"
                    ></div>
                  </div>
                  <div className="bg-white p-5 grid grid-cols-1 gap-5">
                    {link.sublinks.map((mysublinks, index) => (
                      <div key={index}>
                        <h1 className="text-lg font-semibold">
                          {mysublinks.Head}
                        </h1>
                        {mysublinks.sublink.map((slink,index) => (
                          <li className="text-sm text-gray-600 my-2.5 list-none" key={index}>
                            <Link
                              to={slink.link}
                              className="hover:text-primary"
                            >
                              {slink.name}
                            </Link>
                          </li>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
           
        </div>
      ))}
    </div>
  )
}

export default SideMenu
