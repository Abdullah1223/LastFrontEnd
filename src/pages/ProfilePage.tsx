import { Trophy, Music, Users, Star, Calendar, User, FileType } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import ChangePasswordForm from './ChangePasswordForm';
import ChangePassword from './ChangePasswordForm';
import validator from 'validator'
import { ClipLoader } from 'react-spinners';
import { useSocket } from '../context/SocketContext';
import LoginSignupAlert from '../components/auth/LoginAlert';
import Alert from './AlertBox';
import { useUser } from '../context/UserContext';
export function ProfilePage() {
  const [UserData,setUserData]=useState<any>([])
  const {portnum8002}=useUser()
  const [EditProfile,setEditProfile]=useState(false)
  const [IsLogin,setIsLogin]=useState(false)
  const [isAlert,setIsAlert]=useState(false)
  const [isProcessing,setisProcessing] = useState(false)
  const {socket}=useSocket()
  const [previewUrl,setPreview]=useState()
  const [ErrorMessage,setErrorMessage]=useState({
    nameError:'',
    usernameError:'',
    passwordError:'',
    bioError:'',
    SameValsError:'',
  })
  const [updateData,setupdateData]=useState({
    name:'',
    bio:'',
    username:'',
    password:'',
    email:'',
  })

    const imageInputRef = useRef<HTMLInputElement>(null);
    const [fileData,setfileData]=useState({
       file: null as File | null,
       fileName: '', 
       fileType:'',
       fileSize:0,
     })
  
    const handleFileChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        
        setfileData((prev)=>({
          ...prev,
          file:file,
          fileName:file.name,
          fileType:file.type,
          fileSize:file.size
        }))
        const data = {
          fileName:file.name,
          fileType:file.type,
          fileSize:file.size,
        }
        console.log(data)
        const preview = URL.createObjectURL(file);
        setPreview(`${preview}`)
        const response = await fetch(`${portnum8002}updateprofileimage`,{
          method:'POST',
          headers:{
               'Content-Type':'application/json'
          },
          credentials:'include',
          body:JSON.stringify(data)
        })
        const result  = await response.json()
        if(response.status==200){
          const fileputresponse = await fetch(result.SignedUrl,{
            method:'PUT',
            headers:{
              'Content-type':file.type,
            } ,
            body:file
          })
          if(fileputresponse.status==200){
            const finaldata = {
              filename:result.finalfilename
            }
            const lastResponse = await fetch(`${portnum8002}profilepicupdated`,{
             method:'POST',
              headers:{
                'Content-Type':'application/json'
              },
              credentials:'include',
              body:JSON.stringify(finaldata)
            })
          }
        }
      }
    };
   const [showPasswordDialog,setShowPasswordDialog]=useState(false)
   const ValidateForm=()=>{
    let allErrors={}
     if(updateData.name==UserData.name && updateData.bio==UserData.bio && updateData.username==UserData.username){
        allErrors.SameValsError = 'Same Values Cannot Be Updated'  
        console.log('aLL sAME eRROS wORKED')
     }else if(validator.isEmpty(updateData.name.trim())){
      allErrors.nameError='Name Cannot Be Empty'
      console.log('nMAE bOX run')
     }else if(validator.isEmpty(updateData.bio.trim())){
      allErrors.bioError="Bio Cannot Be Empty"
      console.log('Bio Box Ran')
     }else if(validator.isEmpty(updateData.username.trim())){
      allErrors.usernameError = 'Username Cannot Be Empty'
      console.log('username')
     }else if(validator.isEmpty(updateData.password.trim())){
      console.log(updateData.password)
      allErrors.passwordError = 'Password Cannot Be Empty'
      console.log('password box') 
    }

     setErrorMessage(allErrors)
     return Object.keys(allErrors).length === 0; // Return true if no errors
   }
   const updateProfile=async(e)=>{
    setisProcessing(false)
    e.preventDefault()
    console.log(UserData)
    console.log(updateData)
    //  console.log(ErrorMessage.bioError.length)
   if(!ValidateForm()){
    console.log('Validate Box Ran')
   }else{
    
    //http://localhost:8002/
    const response = await fetch(`${portnum8002}profileUpdate`,{
      method:'PUT',
      headers: {
        'Content-Type': 'application/json', // Inform the server you're sending JSON
      }, 
      credentials:'include',
      body:JSON.stringify(updateData)
    })
    if(response.status==403){
      setIsLogin(true)
    }
    if(response.status==200){
    const result =await response.json()
    setisProcessing(true)
    setEditProfile(false)
 //   console.log(result)
    }else if(response.status==204){
    // setPasswordError(null)
    // setUserNameError('Username Already Taken')
    setErrorMessage((prev) => ({
      ...prev,
      usernameError: 'Username Already Taken'
    }));
      }else{
    const result =await response.json()
    // setUserNameError(null)
    // setPasswordError('Password Invalid')
    setErrorMessage((prev)=>({...prev,passwordError:'Invalid Password'}))
    }
   }
   
  
    
   }


  const FetchData = async()=>{
    
  //http://localhost:8002/
    const response = await fetch(`${portnum8002}profilefetch`,{
      method:'GET',
      headers: {
        'Content-Type': 'application/json', // Inform the server you're sending JSON
      }, 
      credentials:'include',
    })
    const result =await response.json()
    if(response.status==200){
      console.log(result)
      setUserData(result)
     // console.log(UserData)
       //setupdateData({...updateData,name:UserData.name,bio:UserData.bio,username:UserData.bio})
      
    }else{
      console.log(result)
    } 
    if(response.status==403){
      setIsLogin(true)
    }
  }

  
  useEffect(()=>{
       
    const handleEvent = (data)=>{
      console.log(data)
      if(data.Type=='ProfileUpdate'){
        setisProcessing(false)
      }
    }
    const handleErrorEvent = (data)=>{
      if(data){
        setIsAlert(true)
      }
    }
    socket?.on('ProfileModification',handleEvent)
    socket?.on('ProfileUpdateError',handleErrorEvent)
    return ()=>{
      socket?.off('ProfileModification',handleEvent)
      socket?.off('ProfileUpdateError',handleErrorEvent)
    }
  },[])
  useEffect(() => {
    if (UserData) {
      console.log('User Data Ran')
      setupdateData({
        name: UserData.name,
        bio: UserData.bio,
        username: UserData.username,
        password: '', // Reset password if necessary
        email:UserData.email
      });
    }
  }, [UserData]);
  useEffect(()=>{
   FetchData()
  },[])
 
  return (
   IsLogin? <LoginSignupAlert setShowLoginAlert={setIsLogin}></LoginSignupAlert> : <div className="border-l relative border-r border-gray-200 dark:border-gray-800 min-h-screen">
   {/* <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 absolute z-10 overflow-hidden"> */}
   <div className={`  ${EditProfile?'backdrop-blur-sm bg-black/50   absolute inset-0  flex z-10 items-center justify-center p-4':null}`}>
   
  {EditProfile==true ?
  
   isProcessing?
   <ClipLoader size={250} color='orange'>

   </ClipLoader>: (
    <div className="bg-gradient-to-br from-black to-gray-900 p-8 rounded-2xl shadow-2xl shadow-orange-500/10 w-full max-w-md border border-gray-800">
      {isAlert?<Alert message={"Server Error Has Occurred Please Try Again"} onClose={setIsAlert}  ></Alert>:null}
      <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent mb-6">
        Profile Settings
      </h2>
      <form onSubmit={(e)=>updateProfile(e)}>
      <div className="space-y-4">
   {ErrorMessage.SameValsError!=''?<h1 className= 'text-center font-bold text-base text-red-700'>Same Values Cannot Be Edited</h1> :null}    
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">Name</label>
          <input
            type="text"
            defaultValue={UserData?.name}
            minLength={3}
            maxLength={15}
           onChange={(e)=>{setupdateData({...updateData,name:e.target.value.trim()})}}
            className="w-full px-4 py-3 placeholder:text-gray-400 rounded-lg bg-gray-800 border border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 text-gray-100 placeholder-gray-500 transition-all"
           
          />
          {ErrorMessage.nameError!=''?<h1 className='text-red-600'>{ErrorMessage.nameError}</h1>:null}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">Email</label>
          <input
            type="email"
            readOnly
            
            placeholder={UserData?.email}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 text-gray-100 placeholder-gray-500 transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">handle</label>
          <input
            type="text"
            placeholder={UserData?.username}
            minLength={3}
            maxLength={25}
           onChange={(e)=>{setupdateData({...updateData,username:e.target.value.trim()})}}
            className="w-full px-4 py-3 placeholder:text-gray-400 rounded-lg bg-gray-800 border border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 text-gray-100 placeholder-gray-500 transition-all"
           
          />
         {ErrorMessage.usernameError!=''?<h1 className='text-red-600'>{ErrorMessage.usernameError}</h1>:null}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">Bio</label>
          <textarea
          minLength={20}
          maxLength={250}
                      onChange={(e)=>{setupdateData({...updateData,bio:e.target.value.trim()})}}
           placeholder={UserData.bio}
            rows="3"
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 text-gray-100 placeholder-gray-500 resize-none transition-all"
          />
          {ErrorMessage.bioError!=''?<h1 className='text-red-600'>{ErrorMessage.bioError}</h1>:null}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">Confirm Password</label>
          <input
            type="password"
            placeholder="••••••••"
            onChange={(e)=>{setupdateData({...updateData,password:e.target.value})}}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 text-gray-100 placeholder-gray-500 transition-all"
          />
          {ErrorMessage.passwordError!=''?<h1 className='text-red-600'>{ErrorMessage.passwordError}</h1>:null}
          </div>
      </div>

      <button 
      type='submit'
      className="w-full mt-6 py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 text-black font-bold rounded-lg hover:shadow-lg hover:scale-[1.02] transition-transform duration-200">
        Save Changes
      </button>
      </form>

      <p 
        className="text-center text-orange-400 hover:text-orange-300 text-sm mt-4 cursor-pointer transition-colors"
        onClick={() => {
          setEditProfile(false)
          setShowPasswordDialog(true)}}
      >
        Change Password →
      </p>
    </div>
  ) : showPasswordDialog?  <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
  <ChangePassword onClose={() => setShowPasswordDialog(false)} />
</div> :null}
</div>
   {/* <div className="flex absolute inset-0 z-10 items-center justify-center min-h-screen">
  {!showPasswordDialog ? (
    <div className="bg-orange-500 p-6 rounded-2xl shadow-lg w-96 text-black">
      <h2 className="text-xl font-bold mb-4">Profile Settings</h2>
      <input type="text" placeholder="Name" className="mb-2 w-full p-2 rounded" />
      <input type="email" placeholder="Email" className="mb-2 w-full p-2 rounded" />
      <input type="text" placeholder="Username" className="mb-2 w-full p-2 rounded" />
      <input type="text" placeholder="Bio" className="mb-2 w-full p-2 rounded" />
      <input type="password" placeholder="Confirm Password" className="mb-4 w-full p-2 rounded" />
      <button className="w-full bg-black text-orange-500 hover:bg-gray-900 p-2 rounded">
        Save Changes
      </button>
      <p
        className="text-center text-black mt-4 cursor-pointer hover:underline"
        onClick={() => setShowPasswordDialog(true)}
      >
        Change Your Password
      </p>
    </div>
  ) : (
    <ChangePassword onClose={() => setShowPasswordDialog(false)} />
  )}
</div> */}
      {/* Profile Header */}
      <div className="relative">
        <div className="h-48 bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500" />
        <div className="absolute bottom-0 left-8 transform translate-y-1/2">
          {/* <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden">
            <img
              src={`${UserData.avatar}`}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div> */}
          <div className="relative group w-32 h-32 cursor-pointer">
  {/* Hidden file input */}
  <input
    type="file"
    accept="image/*"
    className="hidden"
    id="avatar-input"
    ref={imageInputRef}
    onChange={handleFileChange}
  />
  
  {/* Existing profile image container */}
  <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden">
    <img
      src={previewUrl || ` ${UserData.avatar}`}
      alt="Profile"
      className="w-full h-full object-cover"
    />
  </div>

  {/* Hover overlay */}
  <label 
    htmlFor="avatar-input"
    className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-200"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  </label>
</div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="mt-20 px-8">
        {/* <div className="flex  justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{UserData.name}</h1>
            <p className="text-gray-600 dark:text-gray-400">@ {UserData.username}</p>
            <p className="mt-2 text-orange-500 break-words w-72">{UserData.bio}</p>
          </div>
          <button
          onClick={()=>{setEditProfile(true)}}
          className=" px-4 py-2  sm:text-sm   md:px-6 md:py-2 bg-gradient-to-r from-green-500 to-yellow-500 text-white rounded-full font-bold hover:from-green-600 hover:to-yellow-600 transition shadow-md">
            Edit Profile
          </button>
        </div> */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
  <div className="flex-1">
    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{UserData.name}</h1>
    <p className="text-gray-600 dark:text-gray-400">@ {UserData.username}</p>
    <p className="mt-2 text-orange-500 break-words  w-56 sm:w-60 md:w-80 lg:w-96 ">
      {UserData.bio}
    </p>
  </div>
  <button
    onClick={() => { setEditProfile(true); }}
    className="px-4 py-2 sm:text-sm md:px-6 md:py-2 bg-gradient-to-r from-green-500 to-yellow-500 text-white rounded-full font-bold hover:from-green-600 hover:to-yellow-600 transition shadow-md whitespace-nowrap"
  >
    Edit Profile
  </button>
</div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow text-center">
            <Trophy className="w-6 h-6 text-orange-500 mx-auto mb-2" />
            <p className="font-bold text-gray-900 dark:text-white">{UserData?.competitions?.length}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{UserData?.competitions?.length}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow text-center">
            <Music className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
            <p className="font-bold text-gray-900 dark:text-white">{UserData?.tracks?.length}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Tracks</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow text-center">
            <Users className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <p className="font-bold text-gray-900 dark:text-white">{UserData?.followers?.length}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Followers</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow text-center">
            <Star className="w-6 h-6 text-orange-500 mx-auto mb-2" />
            <p className="font-bold text-gray-900 dark:text-white">{UserData?.rating?.length}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Rating</p>
          </div>
        </div>

        {/* Recent Activity */}
        {UserData?.recentactivity?.length==0?<h1>No Activity For Now</h1>:
        <div className="mt-8">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Recent Activity</h2>
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex items-center space-x-4">
            <Trophy className="w-5 h-5 text-orange-500" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Won 1st Place</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Beat Battle Championship</p>
            </div>
            <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">2 days ago</span>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex items-center space-x-4">
            <Music className="w-5 h-5 text-yellow-500" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">New Track Released</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Summer Vibes 2024</p>
            </div>
            <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">5 days ago</span>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex items-center space-x-4">
            <Calendar className="w-5 h-5 text-green-500" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Joined Competition</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Electronic Music Challenge</p>
            </div>
            <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">1 week ago</span>
          </div>
        </div>
      </div>}
      </div>
    </div>
  );
}