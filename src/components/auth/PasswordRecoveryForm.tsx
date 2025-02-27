import React, { useState } from 'react';
import { Mail, ArrowLeft,Eye,Lock,EyeOff } from 'lucide-react';
import { Logo } from '../Logo';
import { useUser } from '../../context/UserContext';

interface PasswordRecoveryFormProps {
  onBack: () => void;
}

export function PasswordRecoveryForm({ onBack }: PasswordRecoveryFormProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [PasswordMatch,setPasswordMatched]=useState(true)
    const [Data, setData] = useState({
        password: '',
        confirmpassword: ''
      });
  const { setUser,portnum8001 } = useUser();
  const [CodeStatus,setCodeStatus]=useState(0)
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
   const [Validator,setValidator]=useState(null)
   const [Code,setCode]=useState('')
   const [CodeValidator,setCodeValidator]=useState(false)
   const handleNewPassword=async()=>{
    const data = {Passwords:Data,email:email}
    if(Data.password!==Data.confirmpassword){
      setPasswordMatched(false)
    }else{
      setPasswordMatched(true)
      {/*'http://localhost:8001/createnewpassword'*/}
      const response = await fetch(`${portnum8001}createnewpassword`,{
        method:'POST',
        headers: {
          'Content-Type': 'application/json', // Inform the server you're sending JSON
        },
        credentials:'include',
        body: JSON.stringify(data),
  
      })
      if(response.status==200){
        setCodeValidator(false)
        setSubmitted(false)
      }else{
        return <h1>Code was Not Edited</h1>
      }
    }
   
   }
   const handleCode=async()=>{
    const data = {email:email,Code:Code}
     {/*'http://localhost:8001/passwordcodevalidation'*/}
    const response = await fetch(`${portnum8001}passwordcodevalidation`,{
      method:'POST',
      headers: {
        'Content-Type': 'application/json', // Inform the server you're sending JSON
      },
      credentials:'include',
      body: JSON.stringify(data),

    })
    if(response.status==200){
      setCodeValidator(true)
    }else if(response.status==404){
      setCodeStatus(404)
    }else if(response.status==401){
      setCodeStatus(401)
    }
   }
  const handleLogoClick = () => {
    setUser({
      id: 'guest',
      name: 'Guest User',
      role: 'fan',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      handle: '@guest',
      bio: 'Music Enthusiast',
      followers: 0,
      following: false,
      permissions: {
        canJudge: false,
        canSubmit: false,
        canVote: true,
        canDonate: true,
        canModerate: false
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger password reset email
    const data = {email:email}
    {/*http://localhost:8001/passwordrecovery*/}

    const response = await fetch(`${portnum8001}/passwordrecovery`,{
      method:'POST',
      headers: {
        'Content-Type': 'application/json', // Inform the server you're sending JSON
      },
      credentials:'include',
      body: JSON.stringify(data),

    })
    const result =await response.json()
    if(response.status==200){
      setSubmitted(true);
    }
    if(response.status==400){
      console.log('Please Enter Email')
    }
    if(response.status==404){
      setValidator(result.message)
    }
  };
 

  if(CodeValidator){
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <button 
        onClick={handleLogoClick}
        className="mb-8 transform hover:scale-105 transition-transform"
      >
        <Logo />
      </button>
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg max-w-md w-full">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-orange-500 hover:text-orange-600 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Login
        </button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 text-transparent bg-clip-text mb-2">
            Reset Password
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create New Password
          </p>
        </div>

       
        <div>
          <label className="block mt-3 text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showPassword ? 'text' : 'password'}
             
              onChange={(e) => setData({ ...Data, password: e.target.value })}
              className="block w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
      
        </div>

        <div>
          <label className="block mt-3 text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
           Confirm Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={Data.confirmpassword}
              onChange={(e) => setData({ ...Data, confirmpassword: e.target.value })}
              className="block  w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        {PasswordMatch==false?<h1 className='text-start text-xs text-red-600 font-bold mt-2 mb-2'>Password Does Not Match</h1>
:null}
        </div>

          <button
            type="submit"
            onClick={()=>handleNewPassword()}
            className="w-full py-3 bg-gradient-to-r mt-4 from-green-500 to-yellow-500 text-white rounded-full font-bold hover:from-green-600 hover:to-yellow-600 transition shadow-lg"
          >
            Create New Password
          </button>
        
      </div>
    </div>
    )
  }
  if (submitted) {
    
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <button 
          onClick={handleLogoClick}
          className="mb-8 transform hover:scale-105 transition-transform"
        >
          <Logo />
        </button>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg max-w-md w-full">
          <div className="text-center mb-8">
            <Mail className="w-16 h-16 text-orange-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Check Your Email</h1>
            <p className="text-gray-600 dark:text-gray-400">
              We've sent password reset code to <span className='font-bold'>{email}</span> enter code to reset password
            </p>
            <div>
            <label className="block w-full text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">
              Code
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                onChange={(e)=>setCode(e.target.value)}
               
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="6623 e.g"
                required
              />
            </div>
         
          </div>
          {CodeStatus==404?<h1 className='text-start text-xs text-red-700 font-bold mt-2'>Invalid Code</h1>
          :CodeStatus==401?
          <h1 className='text-start text-xs text-red-700 font-bold mt-2'>Time Has Passed</h1>:null}
          </div>

          <button
             onClick={()=>handleCode()}
            className="w-full py-3 bg-gradient-to-r from-green-500 to-yellow-500 text-white rounded-full font-bold hover:from-green-600 hover:to-yellow-600 transition shadow-lg"
          >
            Reset Password
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <button 
        onClick={handleLogoClick}
        className="mb-8 transform hover:scale-105 transition-transform"
      >
        <Logo />
      </button>
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg max-w-md w-full">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-orange-500 hover:text-orange-600 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Login
        </button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 text-transparent bg-clip-text mb-2">
            Reset Password
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Enter your email to receive reset instructions
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="you@example.com"
                required
              />
            </div>
            {Validator==null?null:<h1 className='text-red-600 font-bold text-xs'>{Validator} Does Not Exists</h1>}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-green-500 to-yellow-500 text-white rounded-full font-bold hover:from-green-600 hover:to-yellow-600 transition shadow-lg"
          >
            Send Reset Instructions
          </button>
        </form>
      </div>
    </div>
  );
}
