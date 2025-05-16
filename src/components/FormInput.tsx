
import React, { ChangeEvent } from 'react';
import { cn } from '@/lib/utils';

interface FormInputProps {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  helper?: string;
  className?: string;
  icon?: React.ReactNode;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  helper,
  className,
  icon
}) => {
  return (
    <div className={cn("form-group", className)}>
      <label htmlFor={id} className="text-sm font-medium mb-1 text-gradpath-slate">
        {label}
      </label>
      
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
            {icon}
          </div>
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={cn(
            "w-full px-3 py-2.5 border rounded-md focus:outline-none transition-colors",
            error ? "border-red-500" : "border-gray-300 focus:border-gradpath-teal focus:ring-1 focus:ring-gradpath-teal/30",
            disabled && "bg-gray-50 text-gray-400 cursor-not-allowed",
            icon && "pl-10",
            "font-sans"
          )}
        />
      </div>
      
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
      
      {helper && !error && (
        <p className="text-gray-500 text-xs mt-1">{helper}</p>
      )}
    </div>
  );
};

export default FormInput;
