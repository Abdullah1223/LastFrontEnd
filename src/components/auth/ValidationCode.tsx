import { Code, User } from "lucide-react"
import { useState } from "react"
import { useUser } from "../../context/UserContext"
import { AuthPage } from "./AuthPage"

const ValidationCode = ({Email,setView}:any)=>{
    const [ValidationCode,setValidationCode]=useState<null|any>() 
    const [IncorrectError,setIncorrectError]=useState<string|boolean>(false)
    const [codeExpired,setcodeExpired]=useState<string|boolean>(false)
    const [codeResend,setcodeResend]=useState<string|boolean>(false)
    const {portnum8001}=useUser()
    const [isValidated,setisValidated]=useState(false)
    const {setUser,setCheck}=useUser()
    const handleSubmit  = async(e:any)=>{
        e.preventDefault()
        const Code = {
            Code:ValidationCode,
            Email
        } 
        const response = await fetch(`${portnum8001}SignupValidation`,{
            method:'POST',
            headers: {
              'Content-Type': 'application/json', // Inform the server you're sending JSON
            },
            credentials:'include',
            body: JSON.stringify(Code),
      
          })
          if(response.status==200){
             setView('login')
          }
          if(response.status==410){
            setcodeExpired(false)
            setcodeResend(false)
            setIncorrectError('Please Enter Correct Otp')
          }
          if(response.status==401){
            setcodeResend(false)
            setIncorrectError(false)
            setcodeExpired("Code Has Been Expired ")
          }
      
  }
  const resendCode = async()=>{
    const ResendCode = {
        Email,
    }
    const response = await fetch(`${portnum8001}ResendValidationCode`,{
        method:'POST',
        headers: {
          'Content-Type': 'application/json', // Inform the server you're sending JSON
        },
        credentials:'include',
        body: JSON.stringify(ResendCode),
                  
      })
      if(response.status==200){
        setcodeExpired(false)
        setIncorrectError(false)
        setcodeResend('OTP Has been sent to your email address')
      }
  }

  return(
   <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 text-transparent bg-clip-text mb-2">
           Validate 
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Join THE RANKK community
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Code
            </label>
            <div className="relative">
              <Code className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                
                onChange={(e) => {setValidationCode(e.target.value)}}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Please Enter Code"
                required
              />
            </div>
            <div className="text-red-500 font-bold text-sm mt-3">{
              IncorrectError!=false?<h1>{IncorrectError}</h1>:codeExpired!=false?<h1>{codeExpired}</h1>:codeResend!=false?<h1> {codeResend} </h1>:null
            }</div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-green-500 to-yellow-500 text-white rounded-full font-bold hover:from-green-600 hover:to-yellow-600 transition shadow-lg"
          >
            Verify
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
               {' '}
              <button
                type="button"
                onClick={resendCode}
                className="text-orange-500 hover:text-orange-600 font-medium"
              >
                Resend Code
              </button>
            </p>
          </div>
        </form>
      </div>
    
  )


}


export default ValidationCode