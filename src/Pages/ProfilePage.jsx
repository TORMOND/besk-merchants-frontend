import { useAuthContext } from '../Hooks/useAuthContext';
import { useLogout } from '../Hooks/useLogout';
import { useEffect, useState } from 'react';
// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { NavBar, Footer, EditProfile }from '../components';
const ProfilePage = () => {
  const {user} = useAuthContext();
  const logout = useLogout();
  const [profileEdit, setProfileEdit] = useState(false)
  useEffect(()=>{
    window.scrollTo(0,0);
  }, [])
  const editUserProfile=()=>{
    setProfileEdit(true);
  }
  const closeUpdate=()=>{
    setProfileEdit(false);
  }
  return (
    <div className='flex w-full flex-col'>

<NavBar />

{profileEdit &&
<EditProfile closeUpdate={closeUpdate} />
}
      {user &&
      <div className='mt-32 mb-5 max-w-7xl mx-auto'>
          <div className='flex gap-4 items-center'>

{user.user.profile==null?
 <div  className="w-20 h-20 rounded-full flex bg-gray-500 " ><FontAwesomeIcon icon={faUser}  className='m-auto text-white text-3xl' /></div>:
 <img src={user.user.profile} alt={user.user.profile} className='w-20 h-20 rounded-full' />
}
<h2 className='font-semibold'>{user.user.firstName.toUpperCase()} {user.user.secondName.toUpperCase()}</h2>
  
</div>
<div className='mt-5 max-w-7xl mx-auto grid grid-cols-3'>
        <div className=''>
          <h3>General</h3>
          <ul className='text-gray-500 '>
            <li className='cursor-pointer duration-75 hover:text-purple-500 hover:font-semibold' onClick={editUserProfile}>Edit Profile</li>
            <li className='cursor-pointer'></li>
            <li className='cursor-pointer'></li>
            <li className='cursor-pointer'></li>
          </ul>
          <p>Logout</p>
          {/* <h4 className='text-red-500 cursor-pointer'>Delete Account</h4> */}
        </div>
        
      <div className=''>
       <div className=''>
           
      <div className='flex flex-col gap-2.5 text-start'>
        <h3>Email</h3>
        <p className='border border-gray-400 rounded-md p-2'>{user.user.email?user.user.email: 'None Listed'}</p>
        <h3>Country</h3>
        <p className='border border-gray-400 rounded-md p-2'>
          {user.user.country?user.user.country: 'None Listed'}
          </p>
          <h3>City</h3>
        <p className='border border-gray-400 rounded-md p-2 lg:w-72'>{user.user.city?user.user.city:'None Listed' }</p>
        <h3>Address</h3>
        <p className='border border-gray-400 rounded-md p-2'>{user.user.address? user.user.address: 'None Listed'}</p>
        <h3>PhoneNumber</h3>
        <p className='border border-gray-400 rounded-md p-2'>{user.user.phoneNumber?user.user.phoneNumber:'None Listed'}</p>
        <h3>Postal Code</h3>
        <p className='mt-2 border border-gray-400 rounded-md p-2'>{user.user.postalCode?user.user.postalCode:'None Listed'}</p> 

      </div>
      
      
      </div>
      </div>
     </div>
    </div>
      }
    <Footer />
    </div>
  )
}

export default ProfilePage
