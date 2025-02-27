// const ActiveNotificationsComponent = async({ActiveNotifications=[]})=>{
 
//     return    <section>
//               <div className="flex items-center gap-2 mb-4">
//                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
//                 <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
//                   Active Notifications
//                 </h2>
//               </div>
//              {ActiveNotifications?.map((data)=>{
//               return  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
//               <div className="flex items-center gap-3 text-orange-500">
//                 <AlertCircle className="w-5 h-5" />
//                 <p className="text-sm">{data}</p>
//                 <div>
                 
//                 </div>
//               </div>
//             </div>
//              })}
//             </section>


// }

// export default ActiveNotificationsComponent;
import { AlertCircle } from "lucide-react";
import { forwardRef } from "react";

interface ActiveNotificationsComponentProps {
  ActiveNotifications?: { Notification: string }[];
}

const ActiveNotificationsComponent = forwardRef<
  HTMLDivElement,
  ActiveNotificationsComponentProps
>(({ ActiveNotifications = [] }, ref) => {
  
  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Active Notifications
        </h2>
      </div>
      {ActiveNotifications.map((data, idx) => (
        <div
          key={idx}
          className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center gap-3 text-orange-500">
            <AlertCircle className="w-5 h-5" />
            <p className="text-sm">{data.Notification}</p>
          </div>
        </div>
      ))}
      <div ref={ref}></div>
    </section>
  );
});

export default ActiveNotificationsComponent;
