
import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

interface BackIconProps {
  className?: string;
}

const BackIcon: React.FC<BackIconProps> = ({ className }) => {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      aria-label="Back"
      onClick={() => navigate(-1)}
      className={`flex items-center justify-center bg-transparent border-none p-0 ${className || ""}`}
      style={{ height: 40, width: 40, minWidth: 40 }}
    >
      <ChevronLeft size={28} strokeWidth={2.5} className="text-current" />
    </button>
  );
};

export default BackIcon;
