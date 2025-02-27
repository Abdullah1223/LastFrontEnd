import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import  Cookies  from 'js-cookie';
import { io } from 'socket.io-client';
import { useSocket } from '../../context/SocketContext';
interface LoginFormProps {
  onSwitchToCreate: () => void;
  onForgotPassword: () => void;
}

export function LoginForm({ onSwitchToCreate, onForgotPassword }: LoginFormProps) {
  const { setUser,portnum8001 } = useUser();
  const [StatusCode,setStatusCode]=useState(0)
  const {connectSocket}=useSocket()
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would validate credentials with a backend
    //http://localhost:8001/login
    const response = await fetch(`${portnum8001}login`,{
      method:'POST',
      headers: {
        'Content-Type': 'application/json', // Inform the server you're sending JSON
      },
      credentials:'include',
      body: JSON.stringify(formData),

    })
    const result =await response.json()
    if(response.status==404){
      setStatusCode(404)
    }else if(response.status==200){
       connectSocket()
       setUser({
      id: result.id,
      name: result.name,
      role: result.role,
      avatar: result.avatar,
      handle: result.handle,
      bio: result.bio,
      followers: result.followers,
      following: result.following,
      permissions: {
        canJudge: false,
        canSubmit: true,
        canVote: true,
        canDonate: true,
        canModerate: false
      }
    });
    }
    if(response.status==401){
      setStatusCode(401)
    } 
    else{
      setStatusCode(400)
    }
    console.log(result)
   
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg max-w-md w-full">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 text-transparent bg-clip-text mb-2">
          Welcome Back
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Sign in to continue to THE RANKK
        </p>

      {StatusCode==404?  <h1 className=' mt-3 text-red-600 font-bold text-sm'>This User Does Not Exists Please Signup </h1>
      :null}
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
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="you@example.com"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
       {StatusCode==400? 
       <h1 className='text-red-600 font-bold text-xs'>Invalid Password</h1>
:StatusCode==401?       <h1 className='text-red-600 font-bold text-xs'>Please Verify Otp</h1>:null
}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
            />
            <label htmlFor="remember" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Remember me
            </label>
          </div>
          <button 
            type="button" 
            onClick={onForgotPassword}
            className="text-sm text-orange-500 hover:text-orange-600"
          >
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-green-500 to-yellow-500 text-white rounded-full font-bold hover:from-green-600 hover:to-yellow-600 transition shadow-lg"
        >
          Sign In
        </button>

        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToCreate}
              className="text-orange-500 hover:text-orange-600 font-medium"
            >
              Sign up
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}