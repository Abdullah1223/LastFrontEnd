import  { useEffect, useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Feed } from './components/Feed/Feed';
import { ProfilePage } from './pages/ProfilePage';
import { CompetitionPage } from './pages/CompetitionPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { WalletPage } from './pages/WalletPage';
import { MessagesPage } from './pages/MessagesPage';
import { MyEntriesPage } from './pages/MyEntriesPage';
import { SavedPage } from './pages/SavedPage';
import { FollowingPage } from './pages/FollowingPage';
import { AboutPage } from './pages/more/AboutPage';
import { ContactPage } from './pages/more/ContactPage';
import { FAQPage } from './pages/more/FAQPage';
import { LegalPage } from './pages/more/LegalPage';
import { SupportPage } from './pages/more/SupportPage';
import { JudgingPage } from './pages/JudgingPage';
import { SocialFeedPage } from './pages/SocialFeedPage';
import { LivePage } from './pages/LivePage';
import { AuthPage } from './components/auth/AuthPage';
import { UserProvider, useUser } from './context/UserContext';
import MenuToggle from './pages/MobileHeader';
import { Bell, Bookmark } from 'lucide-react';
import AllCompetitionPage from './pages/AllCompetitionsPage';
import ViewAllDyanamicPage from './pages/ViewAllDynamicPage';
import { HomePage } from './pages/HomePage';

// function AppContent() {

//   const { user,Check } = useUser();
  
//   const [currentPage, setCurrentPage] = useState('home');
//   const [morePage, setMorePage] = useState('');
  
//   if( !user && Check==true) {
//     return <h1>Loading</h1>
    
//   }
//   if(!user && Check==false){
//     return <AuthPage />;
//   }

//   const handleMoreNavigation = (page: string) => {
//     setMorePage(page);
//     setCurrentPage('more');
//   };

//   const renderPage = () => {
    


//     if (currentPage === 'more') {
//       switch (morePage) {
//         case 'about':
//           return <AboutPage />;
//         case 'contact':
//           return <ContactPage />;
//         case 'faq':
//           return <FAQPage />;
//         case 'legal':
//           return <LegalPage />;
//         case 'support':
//           return <SupportPage />;
//         default:
//           return <AboutPage />;
//       }
//     }

//     switch (currentPage) {
//       case 'competitions':
//         return <CompetitionPage />;
//       case 'live':
//         return <LivePage />;
//       case 'profile':
//         return <ProfilePage />;
//       case 'notifications':
//         return <NotificationsPage />;
//       case 'wallet':
//         return <WalletPage />;
//       case 'messages':
//         return <MessagesPage />;
//       case 'entries':
//         return <MyEntriesPage />;
//       case 'judging':
//         return <JudgingPage />;
//       case 'social':
//         return <SocialFeedPage />;
//       case 'saved':
//         return <SavedPage />;
//       case 'following':
//         return <FollowingPage />;
//       default:
//         return (
//           <div className="w-full lg:flex">
//             <div className="w-full  lg:flex-1 lg:w-auto">
//               <Feed />
//             </div>
//           </div>
//           //here 
       
//         );
//     }
//   };

//   return (
//     <div className=" min-h-screen bg-white dark:bg-gray-900 transition-colors relative overflow-hidden">
//       {/* White Claw Background Design */}
//       {/* <div className="fixed inset-0 pointer-events-none"> */}
//         {/* Large Claw Mark Top Right */}
//         {/* <div className="absolute -top-20 -right-20 w-96 h-96 transform rotate-45">
//           <div className="absolute w-full h-12 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 rounded-full transform -rotate-45"></div>
//           <div className="absolute w-full h-12 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 rounded-full transform -rotate-45 translate-y-16"></div>
//           <div className="absolute w-full h-12 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 rounded-full transform -rotate-45 translate-y-32"></div>
//         </div> */}

//         {/* Medium Claw Mark Bottom Left */}
//         {/* <div className="absolute -bottom-10 -left-10 w-72 h-72 transform -rotate-45">
//           <div className="absolute w-full h-8 bg-gradient-to-r from-green-500/10 to-yellow-500/10 rounded-full transform rotate-45"></div>
//           <div className="absolute w-full h-8 bg-gradient-to-r from-green-500/10 to-yellow-500/10 rounded-full transform rotate-45 translate-y-12"></div>
//           <div className="absolute w-full h-8 bg-gradient-to-r from-green-500/10 to-yellow-500/10 rounded-full transform rotate-45 translate-y-24"></div>
//         </div> */}

//         {/* Small Claw Mark Center */}
//         {/* <div className=" absolute top-1/2 left-1/2 w-48 h-48 transform -translate-x-1/2 -translate-y-1/2 rotate-90">
//           <div className="absolute w-full h-6 bg-gradient-to-r from-orange-500/5 to-green-500/5 rounded-full"></div>
//           <div className="absolute w-full h-6 bg-gradient-to-r from-orange-500/5 to-green-500/5 rounded-full translate-y-8"></div>
//           <div className="absolute w-full h-6 bg-gradient-to-r from-orange-500/5 to-green-500/5 rounded-full translate-y-16"></div>
//         </div> */}
//       {/* </div> */}
//       <div className='lg:hidden   z-40'>
//         <div className='  bg-orange-600 text-white flex justify-between h-10 items-center p-2'>
//         <h1>App</h1>
//         <button><img src='/src/menus.png' width={15} height={15}></img></button>
//         </div>
//         {/* <Sidebar 
//           onNavigate={setCurrentPage} 
//           currentPage={currentPage}
//           onMoreNavigate={handleMoreNavigation}
//           currentMorePage={morePage}
//         /> */}
//         <main className="flex w-auto">
//           {renderPage()}
//         </main>      
//         </div> 
//       <div className="sm:hidden mx-auto lg:flex relative z-10">
//           <div className='hidden md:block '>
//         <Sidebar 
//           onNavigate={setCurrentPage}  
//           currentPage={currentPage}
//           onMoreNavigate={handleMoreNavigation}
//           currentMorePage={morePage}
//         />
//         <main className="flex-1 ml-72">
//           {renderPage()}
//         </main>
//         </div>
//       </div>
//     </div>
//   );
// }

// const Authorization=async()=>{
//   const response = await fetch('http://localhost:8001/home',{
//     method:'GET',
//     headers: {
//       'Content-Type': 'application/json', // Inform the server you're sending JSON
//     },
//     credentials:'include',
    
//   })
// }
// export default function App() {
//   useEffect(()=>{
//     Authorization()
//     console.log('RenderPage')
    
//   },[])
//   return (
//     <UserProvider>
//       <AppContent />
//     </UserProvider>
//   );
// }





function AppContent() {
  const { user, Check,IsNav,portnum8001 } = useUser();
 
  const [currentPage, setCurrentPage] = useState('home');
  const [morePage, setMorePage] = useState('');
  const [DataAsProps,setDataAsProps]=useState()
  const [IsMenuOpen,setIsMenuOpen]=useState(false)
  if (!user && Check) return <h1 className="p-4">Loading...</h1>;
  if (!user && !Check) return <AuthPage />;

  const handleMoreNavigation = (page: string) => {
    setMorePage(page);
    setCurrentPage('more');
  };

  const renderPage = () => {
    if (currentPage === 'more') {
      switch (morePage) {
        case 'about': return <AboutPage />;
        case 'contact': return <ContactPage />;
        case 'faq': return <FAQPage />;
        case 'legal': return <LegalPage />;
        case 'support': return <SupportPage />;
        default: return <AboutPage />;
      }
    }

    switch (currentPage) {
      case 'competitions': return <CompetitionPage setCurrentPage={setCurrentPage} />;
      case 'live': return <LivePage />;
      case 'profile': return <ProfilePage />;
      case 'notifications': return <NotificationsPage />;
      case 'wallet': return <WalletPage />;
      case 'messages': return <MessagesPage />;
      case 'entries': return <MyEntriesPage />;
      case 'judging': return <JudgingPage />;
      case 'social': return <SocialFeedPage />;
      case 'saved': return <SavedPage />;
      case 'following': return <FollowingPage />;
      case 'browse-all': return <AllCompetitionPage setCurrentPage={setCurrentPage} setDataAsProps={setDataAsProps}></AllCompetitionPage>;
      case 'ViewAllCompetitions': return <ViewAllDyanamicPage CategoryData={DataAsProps}></ViewAllDyanamicPage>
      case 'Homepage':return <HomePage></HomePage>
      default: return <Feed setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* Mobile View */}
{/*       
      <div className="lg:hidden">
       {IsNav? <div className="bg-orange-600 text-white flex justify-between h-10 items-center p-2">
          <h1>App</h1>
          <button onClick={()=>{setIsMenuOpen(true)}}>
            <img src='/src/menus.png' width={15} height={15} alt="menu" />
          </button>
        </div>:null}
        <main className="flex-1 overflow-y-auto">
          {renderPage()}
        </main>
      </div> */}
      <div className="lg:hidden">
  {IsNav ? (
    <div className="bg-orange-600 text-white flex justify-between h-10 items-center p-2">
      <h1>App</h1>
      <div className="flex items-center space-x-4">
        {/* Notification Icon */}
        <button onClick={() => { /* Add notification logic here */ }}>
          {/* <img src='/src/notification.png' width={15} height={15} alt="notification" /> */}
          <Bookmark onClick={()=>setCurrentPage('saved')} color='black' size={18}></Bookmark>
        </button>
        
        {/* Saved Icon */}
        <button onClick={() => { /* Add saved items logic here */ }}>
          {/* <img src='/src/saved.png' width={15} height={15} alt="saved" /> */}
          <Bell  onClick={()=>setCurrentPage('notifications')} color='black' size={18}></Bell>
        </button>
        
        {/* Menu Icon */}
        <button onClick={() => { setIsMenuOpen(true) }}>
          <img src='/src/menus.png' width={15} height={15} alt="menu" />
        </button>
      </div>
    </div>
  ) : null}
  
  <main className="flex-1 overflow-y-auto">
    {renderPage()}
  </main>
</div>
      <div className='lg:hidden'>
      {IsMenuOpen?

<MenuToggle isOpen={IsMenuOpen} onClose={()=>setIsMenuOpen(false)} onNavigate={setCurrentPage} ></MenuToggle>:null}
      </div>
      {/* Desktop View */}
      <div className="hidden lg:flex h-screen">
        {/* Fixed Sidebar */}
        <div className="fixed left-0 top-0 bottom-0 z-50">
          <Sidebar 
            onNavigate={setCurrentPage}
            currentPage={currentPage}
            onMoreNavigate={handleMoreNavigation}
            currentMorePage={morePage}
          />
        </div>

        {/* Scrollable Main Content */}
        <div className="flex-1 ml-[280px] h-screen overflow-y-auto">
        <div className="max-w-7xl mx-auto p-4 2xl:max-w-[90%] w-full">
                      {renderPage()}
          </div>
        </div>
      </div>
      
    </div>
  );
}
const Authorization=async()=>{
  const { user, Check,IsNav,portnum8001 } = useUser();
             {/* 'http://localhost:8001/home' */}
  const response = await fetch(`${portnum8001}home`,{
    method:'GET',
    headers: {
      'Content-Type': 'application/json', // Inform the server you're sending JSON
    },
    credentials:'include',
    
  })
}
export default function App() {
  useEffect(()=>{
    Authorization()
    console.log('RenderPage')
    
  },[])
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}
