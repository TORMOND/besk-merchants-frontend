import {Footer} from '../components'
import NavLinks from '../components/NavLinks';
const About =()=>{
return(
    <div className="w-full flex flex-col">

        <div className='w-full'>
            <nav className="w-full p-2 flex flex-col">
                <div className='w-full flex  justify-between bg-black text-white'>
                <div>BESK MERCHANTS</div>
                <div className="flex gap-2.5">
                    <ul className="flex gap-2 font-semibold ">
                        <li>About Us</li>
                        <li></li>
                        <li>Testimonials</li>
                        <li>Contact Us</li>
                    </ul>
                    <button className="">Shop</button>
                </div>
                </div>
                <div className='flex w-full'>
                  <NavLinks />  
                </div>
                
            </nav>
            <div className="max-w-6xl mx-auto">
                <h3 className='w-full text-center'>About Us</h3>
                <div className=''>
                </div>
            </div>
            <div className="max-w-6xl  mx-auto">
                <h3 className='w-full text-center'>Our Vision</h3>
                <div>
                    
                    </div>
            </div>
            <div className="max-w-6xl ">
                <h3 className='w-full text-center'></h3>
                <div>
                    
                </div>
            </div>
            <div className="max-w-6xl ">
                <h3 className='w-full text-center'></h3>
                <div>
                    
                </div>
            </div>

        </div>
        <Footer />
    </div>
)
}

export default About;