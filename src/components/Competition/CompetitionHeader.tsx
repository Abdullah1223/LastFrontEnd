import React, { useEffect, useRef, useState } from 'react';
import { Trophy } from 'lucide-react';
import { useSocket } from '../../context/SocketContext';
import {DateTime}from 'luxon'
import validator from 'validator'
import LoginSignupAlert from '../auth/LoginAlert';
import { useUser } from '../../context/UserContext';
export function CompetitionHeader({setCurrentPage}) {
  const [isSelected, setIsSelected] = useState<boolean>(false); // State to store the selected value
  const [HostCompetition,setHostCompetition]=useState<boolean>(false)
  const [Processing,setProcessing]=useState<boolean>(false)
  const [ErrorMessage,setErrorMessage]=useState(false)
  const [StartDateError,setStartDateError]=useState(false)
  const [EndDateError,setEndDateError]=useState(false)
  const [LoginAlert,setLoginAlert]=useState(false)
  const {portnum8003}=useUser()
  const {socket}=useSocket()
  const [errors, setErrors] = useState({
    name: null,
    description: null,
    prizemoney: null,
    entryfees: null,
    category: null,
    startdate: null,
    lastdate: null,
    general: null,
  });
  
   const handleSelect = (value:boolean)=>{
      setIsSelected(value)
   }
   const validateForm = () => {
    let newErrors = {
    };
  
    if (validator.isEmpty(CompetitionData.name.trim())) {
      newErrors.name = "Name Cannot Be Empty";
    }
  
    if (validator.isEmpty(CompetitionData.description.trim())) {
      newErrors.description = "Description Cannot Be Empty";
    }
  
    if (!validator.isNumeric(String(CompetitionData.prizemoney))) {
      newErrors.prizemoney = "Please Input Valid Prize";
    }
  
    if (isSelected && !validator.isNumeric(String(CompetitionData.entryfees))) {
      newErrors.entryfees = "Please Input Valid Entry Fee";
    }
  
    if (validator.isEmpty(CompetitionData.category.trim())) {
      newErrors.category = "Category Cannot Be Empty";
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };
   
   const [fileData,setfileData]=useState({
      file: null as File | null,
      fileName: '', 
      fileType:'',
      fileSize:0,
    })
    const imageInputRef = useRef<HTMLInputElement>(null);
  const [CompetitionData,setCompetitionData]=useState({
    name:''.trim(),
    description:'',
    fileName:'',
    fileSize:0,
    fileType:'',
    startdate:'',
    lastdate:'',
    prizemoney:0,
    entryfees:0,
    category:'',

  })


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setCompetitionData((prev) => ({
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



  const SubmitCompetition=async(e)=>{
    e.preventDefault()
    setStartDateError(false)
    setEndDateError(false)
    // console.log(CompetitionData)
    const ifentryfees=isSelected;
    const data = {...CompetitionData,ifentryfees}
    const now = DateTime.local();
  
    const startDate = DateTime.fromISO(CompetitionData.startdate);
    const endDate = DateTime.fromISO(CompetitionData.lastdate);
  
    if (startDate < now) {
      console.log('Start date cannot be in the past');
      setStartDateError(true);
    }
  
   else if (endDate < startDate) {
      console.log('End date cannot be before start date');
      setEndDateError(true);
   }
  else if(!validateForm()){
    return ;
   }

   else{
    
//'http://localhost:8003/competitioncreation'

   

//'http://localhost:8003/competitioncreation'
       const response = await fetch(`${portnum8003}competitioncreation`,{
         method:'POST',
       headers: {
           'Content-Type': 'application/json', // Inform the server you're sending JSON
         },
         credentials:'include',
         body: JSON.stringify(data),
  
       })
       const result = await response.json()
       if(response.status==200){
         console.log(result)
          setHostCompetition(false)
          setProcessing(true)
          const fileputresponse = await fetch(result.gettingSignedUrl,{
            method:'PUT',
            headers:{
              'Content-type':fileData.fileType,
            } ,
            body:fileData.file
          })
          if(fileputresponse.status==200){
            
            //http://localhost:8003/Imageurl
          const lastresponse=  await fetch(`${portnum8003}Imageurl`,{
              method:'POST',
            headers: {
                'Content-Type': 'application/json', // Inform the server you're sending JSON
              },
              credentials:'include',
              body: JSON.stringify(result),
            })
            if(lastresponse.status==200){

              // setHostCompetition(false)
              // setProcessing(true)
            }
          }
       }else if(response.status==400){
         setErrorMessage(true)
       }
       if(response.status==403){
        setLoginAlert(true)
       }
    }
 
   
  }

  useEffect(()=>{
     const handleCompetitionCreated = (data:any) => {
    console.log(data);
    setProcessing(false);
  };

  socket?.on("Competition_Created", handleCompetitionCreated);

  return () => {
    socket?.off("Competition_Created", handleCompetitionCreated);
  };
  },[])
  return (
    LoginAlert?<LoginSignupAlert setShowLoginAlert={setLoginAlert}></LoginSignupAlert>:
    <div className="relative h-64 bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500">
     {HostCompetition==true?
     <div className="absolute top-1/3 left-0 right-0 flex items-center justify-center z-20 px-4">
     <div className="flex flex-col h-auto w-full max-w-2xl bg-gradient-to-br from-black via-gray-900 to-black shadow-2xl rounded-lg border border-orange-500/30">
       <div className='flex justify-center p-4 bg-black/50 rounded-t-lg'>
         <h1 className='font-bold text-xl text-orange-500'>Host Competition</h1>
       </div>
    <form onSubmit={(e)=>SubmitCompetition(e)}>
       <div className='space-y-6 p-6'>
         {/* Competition Name */}
         <div className='flex flex-col md:flex-row gap-4 items-start'>
           <label className='w-full md:w-48 font-medium text-gray-300'>Competition Name</label>
          <div className='flex w-full flex-col'>
           <input
             onChange={(e) => { setCompetitionData({ ...CompetitionData, name: e.target.value }) }}
             placeholder='Classical Band E.g'
             required
             className='w-full p-2 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500'
           />
            {errors!=null?<h1 className='text-red-800 font-bold text-sm lg:text-base '>{errors.name}</h1>:null}
           </div>
         </div>
         {/* Error Message */}
         {ErrorMessage &&
           <div className='flex justify-center'>
             <h1 className='text-red-400 font-bold text-sm'>Competition Already Exists</h1>
           </div>
         }
   
         {/* Image Upload */}
         <div className='flex flex-col items-center gap-4'>
           <div className='relative w-full md:w-64 h-32 rounded-md bg-gray-800 border-2 border-dashed border-gray-600 hover:border-orange-500 transition-colors flex items-center justify-center'>
             {/* <input
               onChange={(e) => { setCompetitionData({ ...CompetitionData, image: e.target.value }) }}
               type='file'
               
               className='opacity-0 absolute w-full h-full cursor-pointer'
               required
             /> */}
               <input type='file' 
                  
                  className='opacity-0 absolute w-full h-full cursor-pointer'
                  required
               accept='images/*'
               ref={imageInputRef}
                  onChange={handleFileChange}
            ></input>
             <span className='text-gray-400 text-sm'>{CompetitionData?.fileName?.length==0?'Click Here To Upload Image':CompetitionData.image}</span>
           </div>
         </div>
   
         {/* Competition Description */}
         <div className='flex flex-col md:flex-row gap-4 items-start'>
           <label className='w-full md:w-48 font-medium text-gray-300'>Description</label>
           <div className='flex flex-col w-full'>
           <textarea
             onChange={(e) => { setCompetitionData({ ...CompetitionData, description: e.target.value }) }}
             placeholder='A Competition For Classical Singer E.g'
             required
             className='w-full p-2 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 h-32'
           />
           {errors!=null?<h1 className='text-red-800 font-bold text-sm lg:text-base '>{errors.description}</h1>:null}
           </div>
         </div>
   
         {/* Date Inputs */}
         <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
           <div className='flex flex-col gap-2'>
             <label className='font-medium text-gray-300'>Start Date</label>
             <input
               onChange={(e) => { setCompetitionData({ ...CompetitionData, startdate: e.target.value }) }}
               type="datetime-local"
               required
               className='w-full p-2 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500'
             />
                        {StartDateError&&<h1 className='text-orange-600'>Please Enter Valid Starting Date</h1>}
           </div>
           <div className='flex flex-col gap-2'>
             <label className='font-medium text-gray-300'>End Date</label>
             <input
               onChange={(e) => { setCompetitionData({ ...CompetitionData, lastdate: e.target.value }) }}
               type="datetime-local"
               required
               className='w-full p-2 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500'
             />
         {EndDateError&&<h1 className='text-orange-600'>Please Enter Valid End Date</h1>}   
           </div>
         </div>
       
         {/* Prize Money */}
         <div className='flex flex-col md:flex-row gap-4 items-start'>
           <label className='w-full md:w-48 font-medium text-gray-300'>Prize Money</label>
           <div className='flex flex-col w-full'>
           <input
             onChange={(e) => { setCompetitionData({ ...CompetitionData, prizemoney: e.target.value }) }}
             placeholder='400$ E.g'
             className='w-full p-2 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500'
           />
           {errors!=null?<h1 className='text-red-800 font-bold text-sm lg:text-base '>{errors.prizemoney}</h1>:null}
           </div>
         </div>
   
         {/* Entry Fees Toggle */}
         <div className='flex flex-col md:flex-row gap-4 items-start'>
           <label className='w-full md:w-48 font-medium text-gray-300'>Entry Fees</label>
           <div className="flex gap-6">
             {[true, false].map((option) => (
               <button
               type='button'
                 key={String(option)}
                 onClick={() => handleSelect(option)}
                 className={`px-4 py-2 rounded transition-colors ${isSelected === option
                   ? 'bg-orange-500 text-black font-bold'
                   : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                   }`}
               >
                 {option ? 'Yes' : 'No'}
               </button>
             ))}
           </div>
         </div>
   
         {isSelected && (
           <div className='flex flex-col md:flex-row gap-4 items-start'>
             <label className='w-full md:w-48 font-medium text-gray-300'>Fee Amount</label>
             <div className='flex flex-col w-full'>
             <input
               onChange={(e) => { setCompetitionData({ ...CompetitionData, entryfees: e.target.value }) }}
               placeholder='2$ E.g'
               className='w-full p-2 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500'
             />
             {errors!=null?<h1 className='text-red-800 font-bold text-sm lg:text-base '>{errors.entryfees}</h1>:null}
           </div>
           </div>
         )}
   
         {/* Category */}
         <div className='flex flex-col md:flex-row gap-4 items-start'>
           <label className='w-full md:w-48 font-medium text-gray-300'>Category</label>
          <div className='flex flex-col w-full'>
           <input
             onChange={(e) => { setCompetitionData({ ...CompetitionData, category: e.target.value }) }}
             required
             placeholder='Electroband'
             className='w-full p-2 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500'
           />
           {errors!=null?<h1 className='text-red-800 font-bold text-sm lg:text-base '>{errors.category}</h1>:null}
           </div>
         </div>
       </div>
   
       {/* Submit Button */}
       <div className='flex justify-center p-6'>
         <button
           type='submit'
           className='w-full md:w-64 py-2 px-6 bg-orange-600 hover:bg-orange-700 text-black font-bold rounded transition-colors duration-300 transform hover:scale-105'
         >
           Host Competition
         </button>
       </div>
       </form>
     </div>
   </div>
  //      <div className="absolute  top-1/3 left-0 right-0  flex items-center justify-center z-20">
  //      <div className=" flex p-2 flex-col h-auto w-2/3 bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 shadow-lg rounded-lg shadow-gray-200">
  //         <div className='flex justify-center'>
  //          <h1 className='font-semibold text-lg'>Host Competition</h1>
  //         </div>
  //         <div className='flex items-center p-5 justify-start'>
  //          <label className=' w-52 font-semibold'>Competition Name</label>
  //          <input
  //         onChange={(e)=>{setCompetitionData({...CompetitionData,name:e.target.value})}} 
  //          placeholder='Classical Band E.g' className=' w-full p-1 rounded-lg outline-orange-400'>
  //          </input>
           
  //         </div>
  //         <div className='flex  pb-2 justify-center items-center '>
  //           {ErrorMessage?
  //           <h1 className='text-red-700 font-bold'>Competition Already Exists</h1>
  //           :null}
  //         </div>
  //         <div className='flex  pb-2 justify-center items-center '>
  //           <div className='border-solid w-52 h-24 rounded-md bg-gray-200 border-black border'>
  //           <div className='flex h-full justify-center items-center'>
  //             <input
  //             onChange={(e)=>{setCompetitionData({...CompetitionData,image:e.target.value})}}
  //             type='file'></input>
  //           </div>
  //           </div>
  //         </div>

  //         <div className='flex items-start p-5 justify-start'>
  //          <label className=' w-52 font-semibold'>Competition Description</label>
  //          <textarea 
  //          onChange={(e)=>{setCompetitionData({...CompetitionData,description:e.target.value})}}
  //          placeholder='A Competition For Classical Singer E.g' className=' w-full p-1 rounded-lg outline-orange-400'>
  //          </textarea>
  //         </div>
  //         <div className='flex items-center p-5 justify-start'>
  //          <label className=' w-52 font-semibold'>Start Date</label>
  //          <input
  //          onChange={(e)=>{setCompetitionData({...CompetitionData,startdate:e.target.value})}}
  //          type="date" placeholder='Classical Band E.g' className=' w-full p-1 rounded-lg outline-orange-400'>
  //          </input>
  //         </div>
  //         <div className='flex items-center p-5 justify-start'>
  //          <label className=' w-52 font-semibold'>LastDate</label>
  //          <input
  //          onChange={(e)=>{setCompetitionData({...CompetitionData,lastdate:e.target.value})}}
  //          type="date" placeholder='Classical Band E.g' className=' w-full p-1 rounded-lg outline-orange-400'>
  //          </input>
  //         </div>
  //         <div className='flex items-center p-5 justify-start'>
  //          <label className=' w-52 font-semibold'>Prize Money</label>
  //          <input
  //          onChange={(e)=>{setCompetitionData({...CompetitionData,prizemoney:e.target.value})}}
  //          placeholder='400$ E.g' className=' w-full p-1 rounded-lg outline-orange-400'>
  //          </input>
  //         </div>
  //         <div className='flex items-center p-5 justify-start'>
  //          <label className=' w-52 font-semibold'>Entry Fees</label>
  //          <ul className="flex space-x-4">
  //     <li
  //       className={`cursor-pointer ${isSelected === true ? "font-bold" : ""}`}
  //       onClick={() => handleSelect(true)}
  //     >
  //       <h1>Yes</h1>
  //     </li>
  //     <li
  //       className={`cursor-pointer ${isSelected === false ? "font-bold" : ""}`}
  //       onClick={() => handleSelect(false)}
  //     >
  //       <h1>No</h1>
  //     </li>
  //   </ul>
  //         </div>
  //         {isSelected==true?
  //        <div className='flex items-center p-5 justify-start'>
  //        <label className=' w-52 font-semibold'>Entry Fees</label>
  //        <input 
  //        onChange={(e)=>{setCompetitionData({...CompetitionData,entryfees:e.target.value})}}
  //        placeholder='2$ E.g' className=' w-full p-1 rounded-lg outline-orange-400'>
  //        </input>
  //       </div>
  //        :null}
  //         <div className='flex items-center p-5 justify-start'>
  //          <label className=' w-52 font-semibold'>Category</label>
  //          <input 
  //          onChange={(e)=>{setCompetitionData({...CompetitionData,category:e.target.value})}}
  //          placeholder='Electroband' className=' w-full p-1 rounded-lg outline-orange-400'>
  //          </input>
  //         </div>
  //         <div className='flex justify-center w-full items-center pb-3 mt-2'>
  //         <button onClick={(()=>SubmitCompetition())} className='border-solid border border-black w-52 rounded-lg h-8'>Host Competition</button>
  //      </div>
  //      </div>
      
  //  </div>

    //  :Processing?<h1>Processing</h1>:Processing ==false && HostCompetition==false?null:null} old 

// :Processing && (
//   <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50">
//     <div className="flex flex-col items-center space-y-8">
//       {/* Soundwave Animation */}
//       <div className="flex items-end justify-center h-32 space-x-1.5">
//         {[1, 2, 3, 4, 5, 4, 3, 2, 1].map((height, i) => (
//           <div 
//             key={i}
//             className="w-3 bg-gradient-to-t from-orange-400 to-orange-600 rounded-t-full animate-wave"
//             style={{ 
//               height: `${height * 1.5}rem`,
//               animationDelay: `${i * 0.1}s`
//             }}
//           ></div>
//         ))}
//       </div>
      
//       {/* Text */}
//       <div className="text-center space-y-2">
//         <p className="text-orange-500 font-bold text-2xl animate-pulse">
//           Curating Your Competition
//         </p>
//         <p className="text-orange-400/80 text-sm">
//           This may take a few moments...
//         </p>
//       </div>
//     </div>
//   </div>
// )}
  :Processing && (
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 overflow-hidden">
      {/* Orbital Progress Ring */}
      <div className="absolute w-64 h-64 border-2 border-orange-500/30 rounded-full animate-spin-slow" 
           style={{ animationDirection: 'reverse' }}></div>
  
      {/* Main Container */}
      <div className="relative flex flex-col items-center space-y-8 z-10">
        {/* Dynamic Soundwave with Particle Effects */}
        <div className="relative flex items-end justify-center h-48 space-x-1.5">
          {[3, 4, 5, 6, 7, 6, 5, 4, 3].map((height, i) => (
            <div 
              key={i}
              className="relative w-4 bg-gradient-to-t from-orange-400 via-amber-500 to-orange-600 rounded-t-full animate-wave-synced group"
              style={{ 
                height: `${height * 1.8}rem`,
                animationDelay: `${i * 0.08}s`
              }}
            >
              {/* Peak Spark Effect */}
              <div className="absolute -top-2 inset-x-0 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300">
                <div className="h-2 w-2 bg-[#ffdd95] blur-sm mx-auto animate-ping"></div>
              </div>
            </div>
          ))}
  
          {/* Floating Music Notes */}
          <div className="absolute -top-20 inset-x-0 flex justify-between pointer-events-none">
            {['♪', '♫', '♬'].map((note, i) => (
              <span 
                key={i}
                className="text-orange-400/60 text-3xl animate-float"
                style={{ 
                  animationDelay: `${i * 0.8}s`,
                  filter: 'drop-shadow(0 0 4px #ff8c0055)'
                }}
              >
                {note}
              </span>
            ))}
          </div>
        </div>
  
        {/* Animated Text Section */}
        <div className="text-center space-y-3">
          <div className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text">
            <p className="text-transparent font-bold text-3xl animate-gradient-shift">
              Crafting Your Musical Arena
            </p>
          </div>
          <p className="text-orange-300/90 text-sm font-mono animate-progress-dots">
            Initializing stages<span className="dotting"></span>
          </p>
        </div>
  
        {/* Background Pulse Effect */}
        <div className="absolute -z-10 inset-0 bg-orange-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>
  
      {/* Particle Field */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i}
            className="absolute w-1 h-1 bg-orange-400/40 rounded-full animate-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`
            }}
          ></div>
        ))}
      </div>
    </div>
  )}
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative h-full flex items-center justify-center text-white text-center p-8">
        <div>
          <div className="flex items-center justify-center mb-4">
            <Trophy className="w-8 md:w-12 h-12 mr-3" />
            <h1 className="text-xl md:text-4xl font-bold">Music Competitions</h1>
          </div>
          <p className="text-lg  md:text-xl mb-6">Showcase your talent and win amazing prizes</p>
          <div className="flex justify-center space-x-4">
            <button
            onClick={()=>setHostCompetition(true)}
            className="bg-white text-orange-500 px-6 py-2 rounded-full font-bold hover:bg-orange-50 transition">
              Host Competition
            </button>
            <button
            onClick={()=>setCurrentPage('browse-all')}
            className="bg-green-500 text-white px-6 py-2 rounded-full font-bold hover:bg-green-600 transition">
              Browse All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}