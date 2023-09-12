import { useState, useRef } from 'react';

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';

import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useAuthContext } from '../Hooks/useAuthContext';

const EditProfile = ({closeUpdate}) => {
    const {user} = useAuthContext();
    const userId = user.user._id;

 const cancel =()=>{
        closeUpdate
 }
const newuserDetails = []
user? newuserDetails.push({
  firstName:user.user.firstName,
  img:user.user.img,
  secondName:user.user.secondName,
  Country:user.user.Country,
  city:user.user.city,
  Address:user.user.Address,
}): []
     const [firstName, setfirstName]  = useState(newuserDetails.firstName);
     const [secondName, setsecondName] =useState(newuserDetails.secondName);
     const [Country, setCountry]= useState(newuserDetails.Country);
     const [PhoneNumber, setPhoneNumber] =useState(newuserDetails.PhoneNumber);
     const [city, setcity] =useState(newuserDetails.city);
     const [Address, setAddress] =useState(newuserDetails.Address);
     const [photo, setPhoto] = useState(newuserDetails.img)


     const [pending, setPending] = useState(false);
     const [uploadError, setUploadError]= useState(false);  


    //  const img = localStorage.getItem('selectedImage');
     const user_details = { img:photo, firstName, secondName, Country, PhoneNumber, city, Address,};
     
   // Adding new users
    const senduser = async()=>{
      setPending(true)
        fetch('http://localhost:4000/api/users/editUser/'+ userId,{
        method: 'PATCH',
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(user_details)
      }).then(()=>{
        alert("New user Added");
        setPending(false);
        setUploadError(false);
        closeUpdate()
        localStorage.removeItem('selectedImage');
        localStorage.removeItem('id');
      })
      .catch((error)=>{
        console.log(error.message)
        setPending(false)
        setUploadError(true)
      })
    
    } 
    const fileInput = useRef()
    const selectFile=()=>{
      fileInput.current.click()
    }


    const onFileSelected =(event)=>{
     const files = event.target.files;
     let filename = files[0].name;
     const fileReader = new FileReader();
     
     console.log(files);
     fileReader.addEventListener('load', () =>{     
       const imageUrl = fileReader.result;
      console.log(imageUrl);
       console.log(filename); 
       setPhoto(imageUrl);

     })
     
     fileReader.readAsDataURL(files[0]);
     const image = files[0];
     console.log(image);

           } 

    return ( 
       
     <div className='fixed z-20 w-full mt-20 bg-[#00000071]'>

{user && 
 <div className="flex gap-2 items-start w-full bg-white "><div className="flex flex-col p-5 m-auto w-full bg-gray-200 overflow-y-scroll">
            <div className="flex justify-end border-b border-b-gray-400">
 <button 
 onClick={closeUpdate} 
 className="border-0 rounded-full p1.5 flex w-10 h-10 justify-center items-center font-semibold cursor-pointer"
 >
  <FontAwesomeIcon icon={faXmark} size="lg" />
 </button>
            </div>
<div className='flex flex-col lg:grid lg:grid-cols-2 gap-2.5'>
<div className='flex flex-col gap-5'>
{user.user.profile==null?
 <div  className="w-20 h-20 mt-5 mx-auto lg:w-72 lg:h-72 rounded-full flex bg-gray-500 " ><FontAwesomeIcon icon={faUser}  className='m-auto text-white text-7xl' /></div>:
 <img src={photo} alt={photo} className="w-full  mt-5 mx-auto lg:w-72 lg:h-72 rounded-full outline outline-gray-300" /> 
}
 
<input type="file" className='hidden' onChange={onFileSelected} ref={fileInput} />
<button
 onClick={selectFile}
 className='border border-purple-500 font-bold rounded-md py-2 px-4 duration-75 hover:bg-purple-500 hover:text-white'
>Choose New Photo</button>
</div>
<div className="mt-4">

<form className='flex flex-col gap-2.5'>
    <input
     type="text"
      placeholder={`first Name: ${user.user.firstName}`}
      value={firstName}
       onChange={e=>setfirstName(e.target.value)}
       className="py-2.5 px-5 w-[90%]  my-0 mx-auto outline outline-gray-300 focus:outline-purple-500"
       required
        />
    <input
     type="text" 
     placeholder={`Second Name: ${user.user.secondName}`}
      value={secondName}
      onChange={e=>setsecondName(e.target.value)}
      className="py-2.5 px-5 w-[90%] my-0 mx-auto outline outline-gray-300 focus:outline-purple-500"
      required
       />
    <input
     type="text"
      placeholder={`Country: ${user.user.Country}`}
      value={Country} 
      onChange={e=>setCountry(e.target.value)}
      className="py-2.5 px-5 w-[90%] my-0 mx-auto outline outline-gray-300 focus:outline-purple-500"
      required
      />
          <input
     type="text" 
     placeholder={`city: ${user.user.city}`}
      value={city}
      onChange={e=>setcity(e.target.value)}
      className="py-2.5 px-5 w-[90%]  my-0 mx-auto outline outline-gray-300 border-[#ceced1] focus:outline-purple-500"
      required
       />
        <input
     type="text"
      placeholder={`Address: ${user.user.Address}` }
      value={Address }
       onChange={e=>setAddress(e.target.value)}
       className="py-2.5 px-5 w-[90%]  my-0 mx-auto outline outline-gray-300 focus:outline-purple-500"
       required
        />
    <input
     type="number" 
     placeholder={`Phone Number: ${user.user.PhoneNumber}`}
     value={PhoneNumber}
      onChange={e=>setPhoneNumber(e.target.value)}
      className="py-2.5 px-5 w-[90%]  my-0 mx-auto outline outline-gray-300 focus:outline-purple-500"
      required

       />

</form>

</div>
</div>
<div className="flex gap-2.5 py-2.5 px-5 justify-end border-t border-t-[#e5e6e7]">
<button onClick={cancel} className="border-0 bg-white cursor-pointer font-semibold rounded-sm py-2.5 px-6 hover:bg-[#f6f8fa]">Cancel</button>
{!pending ? <button onClick={senduser} className="border-0 text-white cursor-pointer font-semibold bg-purple-500 rounded-sm py-2.5 px-6">Submit</button> : <button disabled>Pending...</button>}
</div>
{uploadError && 
<div>Unable to upload user an Error occured</div>
}

</div>      

  </div>

}   
        </div>
     );
}

export default EditProfile;