import { useEffect, useState } from "react";

const Alert = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose(); // Callback to remove the alert from the parent component
    }, 2000); // Auto-dismiss after 2 seconds

    return () => clearTimeout(timer); // Cleanup timer
  }, [onClose]);

  return (
    <div
      className={`fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-md p-4 bg-red-500 text-white rounded-lg shadow-lg transition-transform duration-500 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button
          onClick={() => setIsVisible(false)}
          className="text-white hover:text-red-200 focus:outline-none"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Alert;