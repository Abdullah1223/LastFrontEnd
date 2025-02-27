import { useState } from "react";

interface FollowButtonProps {
    isFollowing: boolean;
    users: any;
    Following: (id: string) => void;
    RemovingFollowing: (id: string) => void;
  }
  
  const FollowButton: React.FC<FollowButtonProps> = ({ 
    isFollowing, 
    users, 
    Following, 
    RemovingFollowing 
  }) => {
    const [followingState, setFollowingState] = useState(isFollowing);
   console.log(isFollowing)
    const handleClick = () => {
      if (followingState) {
        RemovingFollowing(users._id);
      } else {
        Following(users._id);
      }
      setFollowingState(!followingState); // Toggle local state
    };
  
    return (
      <button
        onClick={handleClick}
        className={`mt-4 sm:px-3 sm:py-2 lg:px-6 lg:py-2 px-3 py-2 rounded-full text-white transition-all duration-300 ${
          followingState ? 'bg-gray-500 hover:bg-gray-600' : 'bg-red-500 hover:bg-red-600'
        }`}
      >
        {followingState ? 'Unfollow' : 'Follow'}
      </button>
    );
  };
  
  export default FollowButton;
  