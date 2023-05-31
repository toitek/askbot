import React, { useState, useEffect } from "react";

interface Prop {
  message: string;
  show: boolean;
  duration?: number;
  onClose: () => void;
}

const SnackBar = ({ message, show, duration = 4000, onClose }: Prop) => {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    setVisible(show);

    if (show) {
      const timeout = setTimeout(() => {
        setVisible(false);
        onClose();
      }, duration);

      return () => clearTimeout(timeout);
    }
  }, [show, duration, onClose]);

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-[#56127a] text-white text-sm font-semibold py-3 px-4 rounded-md shadow-md">
      {message}
    </div>
  );
};

export default SnackBar;
