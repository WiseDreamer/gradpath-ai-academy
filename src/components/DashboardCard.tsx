
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { UploadResourceModal } from '@/components/ModuleResources/UploadResourceModal';

interface DashboardCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  to: string;
  color?: string;
  onClick?: () => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  icon: Icon,
  to,
  color = 'bg-gradpath-purple',
  onClick,
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isUploadModalOpen, setIsUploadModalOpen] = React.useState(false);
  
  const handleCardClick = () => {
    if (onClick) {
      onClick();
      return;
    }
    
    // Handle special cases
    if (to === '#' || !to) {
      // For cards without implemented routes
      if (title === "Ask AI Tutor") {
        navigate('/ai-tutor');
        return;
      } else if (title === "Upload Module Resources") {
        // Open upload modal instead of showing a toast
        setIsUploadModalOpen(true);
        return;
      } else if (title === "Track My Performance") {
        // Navigate to performance page
        navigate('/performance');
        return;
      }
      
      // Default toast for not yet implemented features
      toast({
        title: "Coming soon",
        description: `The ${title} functionality will be implemented soon.`
      });
      return;
    }
    
    // For cards with valid routes
    navigate(to);
  };

  const content = (
    <>
      <div className={cn("p-3 rounded-full transition-transform group-hover:scale-110", color)}>
        <Icon className="h-10 w-10 text-white" strokeWidth={2.5} />
      </div>
      <h3 className="font-semibold text-lg mt-4 text-gray-800 dark:text-gray-200">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">{description}</p>
    </>
  );

  const cardClassName = "group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center border border-gray-100 dark:border-gray-700 hover:scale-[1.02]";

  return (
    <>
      <button
        onClick={handleCardClick}
        className={cardClassName}
      >
        {content}
      </button>
      
      {title === "Upload Module Resources" && (
        <UploadResourceModal 
          open={isUploadModalOpen} 
          onClose={() => setIsUploadModalOpen(false)} 
        />
      )}
    </>
  );
};

export default DashboardCard;
