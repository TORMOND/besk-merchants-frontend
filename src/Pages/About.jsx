import { useNavigate,  Link } from 'react-router-dom';
import {Footer} from '../components'
const About =()=>{
    const navigate = useNavigate()
    const homePage=()=>{
        navigate('/')
    }
return(
    <div className="w-full flex flex-col">

        <div className='w-full'>
            <nav className="w-full flex flex-col">
                <div className='w-full flex items-center  justify-between bg-gray-900 p-2 text-white'>
                <h3>BESK MERCHANTS</h3>
                <div className="flex gap-2.5">
                    <ul className="flex gap-2  items-center font-semibold ">
                        <li>About Us</li>
                        <li>Testimonials</li>
                        <li>Contact Us</li>
                    </ul>
                    <button className="font-semibold bg-purple-500 p-2 rounded-md" onClick={homePage}>
                    <Link to="/FrequentQuestions" className='hover:underline'> Shop</Link>
                        </button>
                </div>
                </div>
                
            </nav>
            <div className="max-w-6xl mx-auto">
                <h3 className='w-full text-center'>About Us</h3>
                <div className=''>
                    <p>At Besk Merchants, we pride ourselves on being more than just an e-commerce platform; we are your trusted partner in discovering a world of possibilities right at your fingertips. 
                    </p>
                        <p>Our mission is simple: to provide you with a seamless and secure online shopping experience while showcasing the best products from around the globe. We understand the diverse and dynamic needs of our customers.   
                            That's why we have carefully curated a wide range of products, from the latest fashion trends to cutting-edge electronics, home essentials, beauty products, and much more.
                            With our headquarters situated in Nairobi, Kenya, we have embarked on a global journey to bring an unparalleled shopping experience to your doorstep.</p>
<p>                   
 We are dedicated to fostering trust and reliability in every transaction and ensuring that your shopping journey is both enjoyable and rewarding.
</p>
                        <p>
                        As we continue to grow and expand our reach globally, we remain committed to delivering top-notch customer service, fast and reliable shipping, and an ever-evolving selection of products that cater to your unique tastes and preferences.
Shop with us today and experience the world of convenience, quality, and affordability right from the heart of Nairobi, Kenya.
                        </p>
                </div>
            </div>
            <div className="max-w-6xl  mx-auto">
                <h3 className='w-full text-center'>Our Vision</h3>
                <div>
                    <p>Our vision at Besk Merchants is to bridge the gap between Nairobi, Kenya, and the global marketplace, fostering a world where convenience, quality, and affordability meet. We aspire to empower customers in Kenya and beyond with easy access to a vast array of products, enhancing their lifestyles and enriching their online shopping experiences. Our commitment is to be at the forefront of e-commerce innovation, always striving to exceed expectations and make the world of online shopping more accessible, enjoyable, and inclusive for all.</p>
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