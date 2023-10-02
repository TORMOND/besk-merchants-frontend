import  { useState } from "react";
import { Link } from "react-router-dom";
import { links } from "./data/Links";


// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';


const NavLinks = () => {
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");
  return (
    <>
      {links.map((link, index) => (
        <div key={index} className="lg:block w-full">
          <div className="px-3 text-left md:cursor-pointer group flex text-gray-600">
            <h3
              className="text-sm lg:text-lg w-full lg:w-fit lg:text-md py-1 flex justify-between items-center md:pr-0 pr-5 group "
              onClick={() => {
                heading !== link.name ? setHeading(link.name) : setHeading("");
                setSubHeading("");
              }}
            >
              {link.name}
              <span className="text-xl">
                <p className="hidden">
                  {
                    heading === link.name ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />
                  }
                </p>
              </span>
              <span className="text-xl md:mt-1 md:ml-2  block lg:hidden group-hover:rotate-180 group-hover:-mt-2">
                <p >
                </p>
              </span>
            </h3>
            {link.submenu && (
              <div>
                <div className="absolute top-20 -ml-20 hidden bg-red-300">
                  <div className="py-3">
                    <div
                      className="w-4 h-4 left-2 absolute 
                    mt-1 bg-white rotate-45"
                    ></div>
                  </div>
                  <div className="bg-white p-5 grid grid-cols-3 gap-10">
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
          {/* Mobile menus */}
          <div
            className={`
            ${heading === link.name ? "md:hidden" : "hidden"}
          `}
          >
            {/* sublinks */}
            {link.sublinks.map((slinks,index) => (
              <div key={index}>
                <div>
                  <h1
                    onClick={() =>
                      subHeading !== slinks.Head
                        ? setSubHeading(slinks.Head)
                        : setSubHeading("")
                    }
                    className="text-sm lg:text-md py-4 pl-7 font-semibold  flex justify-between items-center md:pr-0 pr-5"
                  >
                    {slinks.Head}

                    <span className="text-xl md:mt-1 ml-2 inline lg:hidden">
                      <p className="">
                      {
                    subHeading === slinks.Head? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />
                  }
                      </p>
                    </span>
                  </h1>
                  <div
                    className={`${
                      subHeading === slinks.Head ? "md:hidden" : "hidden"
                    }`}
                  >
                    {slinks.sublink.map((slink, index) => (
                      <li className="py-3 pl-14" key={index}>
                        <Link to={slink.link}>{slink.name}</Link>
                      </li>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default NavLinks;