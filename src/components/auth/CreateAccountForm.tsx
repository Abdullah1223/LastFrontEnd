import React, { useRef, useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User, Music, AtSign } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import ValidationCode from './ValidationCode';

interface CreateAccountFormProps {
  onSwitchToLogin: () => void;
 
  setView: React.Dispatch<React.SetStateAction<any>>;

}

export function CreateAccountForm({ onSwitchToLogin,setView }: CreateAccountFormProps) {
  const { setUser,portnum8001 } = useUser();
  const [DupilcateLogger,setDuplicateLogger]=useState('')
  const [showPassword, setShowPassword] = useState(false);
  const [isSignedClicked,setisSignedClicked]=useState(false)
  const [fileData,setfileData]=useState({
    file: null as File | null,
    fileName: '', 
    fileType:'',
    fileSize:0,
  })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    handle: '',
    fileName: '', 
    fileType:'',
    fileSize:0,
    role: 'artist',
    bio: ''
  });

  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFormData((prev) => ({
        ...prev,
        
        fileName: file.name,
        fileType:file.type,
        fileSize:file.size // Store the file name
      }));
      setfileData((prev)=>({
        ...prev,
        file:file,
        fileName:file.name,
        fileType:file.type,
        fileSize:file.size
      }))
    }
  };


  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would validate and create an account via API
    //http://localhost:8001/Signup
    
    const response = await fetch(`${portnum8001}Signup`,{
          method:'POST',
          headers: {
            'Content-Type': 'application/json', // Inform the server you're sending JSON
          },
          credentials:'include',
          body: JSON.stringify(formData),
    
        })
        
        const result = await response.json()
    if(response.status==200){
      const fileputresponse = await fetch(result.SignedUrl,{
        method:'PUT',
        headers:{
          'Content-type':fileData.fileType,
        } ,
        body:fileData.file
      })
      if(fileputresponse.status==200){
        setisSignedClicked(true)
      }
    
    }
    if(response.status==400){
      setDuplicateLogger(result)
    }
    
    // iMPORTANT fOR lATER use
  //   const filename = {
  //     finalfilename:formData.fileName,
  //     fileSize:formData.fileSize,
  //     fileType:formData.fileType 
  //   }
  //   const response = await fetch('http://localhost:8001/PreSignedUrl',{
  //     method:'POST',
  //     headers: {
  //       'Content-Type': 'application/json', // Inform the server you're sending JSON
  //     },
  //     credentials:'include',
  //     body: JSON.stringify(filename),

  //   })
  //   if(response.status==200){


  //   }else if(response.status==413){
  // console.log('Image too big')
  //   }else if(response.status==415){
  //     console.log('Format Not Supported')
  //   }else if(response.status==400){
  //       console.log('Bad Request')         
  //   }else if(response.status==404){
  //     console.log('Please Upload File')
  //   }else{
  //     console.log('Server Error')
  //   }
    
  };

  return (
   isSignedClicked?<ValidationCode setView={setView} Email={formData.email}></ValidationCode>: <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 text-transparent bg-clip-text mb-2">
            Create Your Account
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Join THE RANKK community
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Your name"
                required
              />
            </div>
          </div>

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
           
            {DupilcateLogger=='email'? <h1 className='text-red-700 mt-1'>Email Already is in use</h1>:null}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Username
            </label>
            <div className="relative">
              <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={formData.handle}
                onChange={(e) => setFormData({ ...formData, handle: e.target.value })}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="@username"
                required
              />
            </div>
            {DupilcateLogger=='username'?<h1 className='text-red-700 mt-1'>Username Already Exists</h1>:null}

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
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Account Type
            </label>
            <div className="relative">
              <Music className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="artist">Artist</option>
                <option value="fan">Fan</option>
                <option value="judge">Judge</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Upload Image
            </label>
            <div className="relative">
              
              <input type='file' 
               accept='images/*'
               ref={imageInputRef}
                  onChange={handleFileChange}
            ></input>
            </div>
          </div> 
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Bio
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="Tell us about yourself..."
              rows={3}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-green-500 to-yellow-500 text-white rounded-full font-bold hover:from-green-600 hover:to-yellow-600 transition shadow-lg"
          >
            Create Account
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="text-orange-500 hover:text-orange-600 font-medium"
              >
                Sign in
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}