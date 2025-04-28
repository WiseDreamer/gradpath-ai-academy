import React from 'react';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';
interface SocialButtonProps {
  icon: LucideIcon;
  provider: string;
  onClick?: () => void;
}
const SocialButton: React.FC<SocialButtonProps> = ({
  icon: Icon,
  provider,
  onClick
}) => {
  return <Button variant="outline" onClick={onClick} className="w-full flex items-center justify-center gap-2 text-indigo-600 text-base bg-purple-400 hover:bg-purple-300">
      <Icon className="h-4 w-4" />
      <span>Continue with {provider}</span>
    </Button>;
};
export default SocialButton;