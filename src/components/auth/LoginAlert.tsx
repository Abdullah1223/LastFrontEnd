import { useState } from "react";
import { useSocket } from "../../context/SocketContext";
import { useUser } from "../../context/UserContext";

const LoginSignupAlert = ({setShowLoginAlert}) => {
    const [isLoginView, setIsLoginView] = useState(true);
    const [StatusCode,setStatusCode]=useState(0)
    const {connectSocket}=useSocket()
      const { setUser,portnum8001 } = useUser();
    
    const [formData, setFormData] = useState({
      email: '',
      password: '',
    
    });
    
    const [isSubmitting, setIsSubmitting] = useState(false);
  
 const handleSubmit = async(e: React.FormEvent) => {
     e.preventDefault();
     // In a real app, this would validate credentials with a backend
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
     setShowLoginAlert(false)
     }else{
       setStatusCode(400)
     }
     console.log(result)
    
   };
    return (
      <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
        <div className="bg-black border-4 border-orange-500 rounded-xl p-6 md:p-8 max-w-md w-full mx-4 relative shadow-[0_0_30px_rgba(249,115,22,0.3)]">
          <button 
            onClick={() => setShowLoginAlert(false)}
            className="absolute top-4 right-4 md:top-6 md:right-6 text-orange-500 hover:text-orange-400 transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
  
          <div className="flex flex-col items-center gap-4 md:gap-6">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                {isLoginView ? 'Welcome Back!' : 'Create Account'}
              </h2>
              <p className="mt-1 md:mt-2 text-orange-200 text-sm md:text-base">
                {isLoginView ? 'Please login to continue' : 'Join our community'}
              </p>
            </div>
  
            <form onSubmit={handleSubmit} className="w-full space-y-4 md:space-y-6">
              <div>
                <label className="block text-orange-400 text-sm font-semibold mb-2">
                  Email*
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={(e)=>setFormData((prev)=>({...prev,email:e.target.value}))}
                  className="w-full px-4 py-2 md:py-3 bg-black border-2 border-orange-500 rounded-lg focus:outline-none focus:border-orange-400 text-orange-200 placeholder-orange-600"
                  placeholder="Enter your email"
                  required
                />
              </div>
  
              <div>
                <label className="block text-orange-400 text-sm font-semibold mb-2">
                  Password*
                </label>
                <input
                  type="password"
                  name="password"
                  onChange={(e)=>setFormData((prev)=>({...prev,password:e.target.value}))}
                  className="w-full px-4 py-2 md:py-3 bg-black border-2 border-orange-500 rounded-lg focus:outline-none focus:border-orange-400 text-orange-200 placeholder-orange-600"
                  placeholder="••••••••"
                  required
                />
              </div>
  
  
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 md:py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-black font-bold rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50"
              >
                {isSubmitting ? 'Processing...' : (isLoginView ? 'Login':null)}
              </button>
            </form>
  
            <div className="text-center w-full">
            
              
              {/* {isLoginView && (
                <button className="mt-2 text-orange-400 text-xs md:text-sm hover:text-orange-300 transition-colors">
                  Forgot Password?
                </button>
              )} */}
            </div>
          </div>
        </div>
      </div>
    );
  };
export default LoginSignupAlert;