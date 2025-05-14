
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
  icon?: React.ReactNode;
}

const FormInput: React.FC<FormInputProps> = ({ 
  label, 
  id, 
  error, 
  className,
  icon,
  ...props 
}) => {
  return (
    <div className="form-group">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
      </Label>
      <div className="relative">
        {icon && (
          <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
            {icon}
          </div>
        )}
        <Input
          id={id}
          className={cn(
            icon && "pl-10",
            error && "border-red-500 focus-visible:ring-red-500",
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default FormInput;
