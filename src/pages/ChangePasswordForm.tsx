import { useEffect, useState } from "react";
import validator from 'validator'
import { useSocket } from "../context/SocketContext";
import { ClipLoader } from "react-spinners";

import Alert from "./AlertBox";
import LoginSignupAlert from "../components/auth/LoginAlert";
import { useUser } from "../context/UserContext";
export default function ChangePassword({ onClose }) {
  const {portnum8002}=useUser()
  const [isProcessing,setisProcessing]=useState(false)
  const [isAlert,setisAlert]=useState(false)
  const [IsLogin,setIsLogin]=useState(false)
  const [ChangePasswordData,setChangePasswordData]=useState({
    CurrentPassword:'',
    NewPassword:'',
    ConfirmPassword:'',
  })
 const [Errors,setErrors]=useState({
  CurrentPasswordError:'',
  NewPasswordError:'',
  ConfirmPasswordError:'',

 })
 const {socket}=useSocket()
 const ValidateForm = ()=>{
   let allErrors={}
    if(validator.isEmpty(ChangePasswordData.CurrentPassword.trim())){
      allErrors.ConfirmPasswordError = 'Current Password Cannot Be Empty'
    }else if(validator.isEmpty(ChangePasswordData.NewPassword.trim())){
      allErrors.NewPasswordError = "New Password Cannot Be Empty"
    }else if(validator.isEmpty(ChangePasswordData.ConfirmPassword.trim())){
      allErrors.ConfirmPasswordError = 'Confirm Password Cannot Be Empty'
    }else if(ChangePasswordData.ConfirmPassword!=ChangePasswordData.NewPassword){
      allErrors.ConfirmPasswordError = "Confirm Password Does Not Match"
    }
    setErrors(allErrors)
    return Object.keys(allErrors).length ===0
  }
 const submitPasswordData=async(e)=>{
  e.preventDefault();
  setisProcessing(false)
   if(!ValidateForm()){
    return ;
   }
   //http://localhost:8002
    const response = await fetch(`${portnum8002}profilePasswordChange`,{
      method:'PUT',
      headers: {
        'Content-Type': 'application/json', // Inform the server you're sending JSON
      }, 
      credentials:'include',
      body:JSON.stringify(ChangePasswordData)
    })
    if(response.status==200){
      onClose
    }
   if(response.status===403){
    setIsLogin(true)
   }
    if(response.status==401){
      setErrors((prev)=>({...prev,ConfirmPasswordError:'InValid Password'}))
    }
    if(response.status==500){
      setisAlert(true)
    }


 }
 
 useEffect(()=>{
  const handleEvent = (data:any)=>{
    console.log(data)
    if(data.Type=='PasswordUpdate'){
      setisProcessing(false)
    }
  }
  socket?.on('ProfileModification',handleEvent)
  return ()=>{
    socket?.off('ProfileModification',handleEvent)
  }
 },[])
  return (
    isProcessing?<ClipLoader
     size={250}
     color="orange"
     ></ClipLoader> :
     IsLogin?<LoginSignupAlert setShowLoginAlert={setIsLogin} ></LoginSignupAlert>: <div className=" bg-gradient-to-br from-black to-gray-900 p-8 rounded-2xl shadow-2xl shadow-orange-500/10 w-full max-w-md border border-gray-800">
        {isAlert?<Alert message={'Error Has Occurred'} onClose={setisAlert} ></Alert>:null}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
            Change Password
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-orange-500 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
     <form onSubmit={(e)=>{submitPasswordData(e)}}>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Current Password</label>
            <input
              onChange={(e)=>{setChangePasswordData({...ChangePasswordData,CurrentPassword:e.target.value})}}
              type="password"
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 text-gray-100 placeholder-gray-500 transition-all"
            />
           {Errors.CurrentPasswordError!=''? <h1 className="text-white">{Errors.CurrentPasswordError}</h1>:null}
          </div>
    
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">New Password</label>
            <input
            onChange={(e)=>{setChangePasswordData({...ChangePasswordData,NewPassword:e.target.value})}}
              type="password"
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 text-gray-100 placeholder-gray-500 transition-all"
            />
            {Errors.NewPasswordError!=''? <h1 className="text-white">{Errors.NewPasswordError}</h1>:null}
          </div>
    
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Confirm Password</label>
            <input
            onChange={(e)=>{setChangePasswordData({...ChangePasswordData,ConfirmPassword:e.target.value})}}
              type="password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 text-gray-100 placeholder-gray-500 transition-all"
            />
            {Errors.ConfirmPasswordError!=''? <h1 className="text-white">{Errors.ConfirmPasswordError}</h1>:null}
          </div>
        </div>
        <button 
          type="submit"
          className="w-full mt-5 py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 text-black font-bold rounded-lg hover:shadow-lg hover:scale-[1.02] transition-transform duration-200">
            Update Password
          </button>
        </form>
        <div className="mt-6 space-y-4">
         
          
          <p 
          onClick={()=>setisAlert(true)}
          className="text-center text-orange-400 hover:text-orange-300 text-sm cursor-pointer transition-colors">
            Forgot Password?
          </p>
        </div>
      
      </div>
    
    // <div className="flex items-center justify-center min-h-screen bg-black">
    //   <div className="bg-orange-500 p-6 rounded-2xl shadow-lg w-96 text-black">
    //     <h2 className="text-xl font-bold mb-4">Change Password</h2>
    //     <input type="password" placeholder="Current Password" className="mb-2 w-full p-2 rounded" />
    //     <input type="password" placeholder="New Password" className="mb-2 w-full p-2 rounded" />
    //     <input type="password" placeholder="Confirm Password" className="mb-4 w-full p-2 rounded" />
    //     <button className="w-full bg-black text-orange-500 hover:bg-gray-900 p-2 rounded">
    //       Update Password
    //     </button>
    //     <p className="text-center text-black mt-4 cursor-pointer hover:underline">
    //       Forgot Password?
    //     </p>
    //     <button className="w-full mt-4 bg-gray-900 text-orange-500 p-2 rounded" onClick={onClose}>
    //       Back
    //     </button>
    //   </div>
    // </div>
  );
}

