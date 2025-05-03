
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { FileInput } from './FileInput';
import { useToast } from '@/hooks/use-toast';

interface UploadResourceModalProps {
  open: boolean;
  onClose: () => void;
}

export const UploadResourceModal: React.FC<UploadResourceModalProps> = ({ open, onClose }) => {
  const [title, setTitle] = useState('');
  const [module, setModule] = useState('');
  const [notes, setNotes] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const { toast } = useToast();
  
  const handleFileChange = (selectedFile: File | null) => {
    setFile(selectedFile);
  };
  
  const handleSubmit = async () => {
    if (!file || !title || !module) {
      toast({
        title: "Missing information",
        description: "Please fill all required fields and select a file",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsUploading(true);
      
      // Simulate upload
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Resource uploaded",
        description: `${title} has been uploaded successfully`
      });
      
      onClose();
      setTitle('');
      setModule('');
      setNotes('');
      setFile(null);
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your resource",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  const validateFile = async () => {
    if (!file) return;
    
    try {
      setIsValidating(true);
      
      // Simulate AI validation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "File validated",
        description: "This file is valid and readable"
      });
    } catch (error) {
      toast({
        title: "Validation failed",
        description: "The file could not be validated",
        variant: "destructive"
      });
    } finally {
      setIsValidating(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Upload Module Resource</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <FileInput onFileChange={handleFileChange} />
          
          {file && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {file.name} ({Math.round(file.size / 1024)} KB)
              </span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={validateFile}
                disabled={isValidating}
              >
                {isValidating ? 'Validating...' : 'Validate file'}
              </Button>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input 
                id="title" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter resource title"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="module">Module</Label>
              <Select value={module} onValueChange={setModule}>
                <SelectTrigger id="module">
                  <SelectValue placeholder="Select module" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="calculus">Calculus</SelectItem>
                  <SelectItem value="linear-algebra">Linear Algebra</SelectItem>
                  <SelectItem value="statistics">Statistics</SelectItem>
                  <SelectItem value="physics">Physics</SelectItem>
                  <SelectItem value="chemistry">Chemistry</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea 
              id="notes" 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any notes about this resource"
              rows={3}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={isUploading}>
            {isUploading ? 'Uploading...' : 'Upload Resource'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
