
import React from "react";
import { useNavigate } from "react-router-dom";

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
      <img
        src="/lovable-uploads/c28c0426-a493-4c2e-a85d-8f81a9c74b89.png"
        alt="Back"
        className="h-8 w-8"
        style={{ objectFit: "contain", display: "block" }}
      />
    </button>
  );
};

export default BackIcon;
