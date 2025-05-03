
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface FileInputProps {
  onFileChange: (file: File | null) => void;
}

export const FileInput: React.FC<FileInputProps> = ({ onFileChange }) => {
  const [dragActive, setDragActive] = useState(false);
  const isMobile = useIsMobile();
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      onFileChange(acceptedFiles[0]);
    }
  }, [onFileChange]);
  
  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.ms-powerpoint': ['.ppt'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx']
    },
    noClick: isMobile,
    multiple: false
  });

  if (isMobile) {
    return (
      <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg border-gray-300 bg-gray-50">
        <Upload className="h-12 w-12 text-gray-400 mb-2" />
        <p className="text-sm text-gray-500 text-center mb-4">
          Select PDF, Doc, or PowerPoint files
        </p>
        <button
          type="button"
          onClick={open}
          className="px-4 py-2 bg-gradpath-purple text-white rounded-md hover:bg-gradpath-dark-purple"
        >
          Select File
        </button>
        <input {...getInputProps()} />
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={`flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-lg ${
        dragActive ? 'border-gradpath-purple bg-gradpath-purple/10' : 'border-gray-300 bg-gray-50'
      } transition-colors duration-150 cursor-pointer`}
      onDragEnter={() => setDragActive(true)}
      onDragLeave={() => setDragActive(false)}
      onDrop={() => setDragActive(false)}
    >
      <Upload className="h-12 w-12 text-gray-400 mb-2" />
      <p className="text-base font-medium text-center mb-1">
        Drag & drop files here
      </p>
      <p className="text-sm text-gray-500 text-center mb-2">
        or click to select files
      </p>
      <p className="text-xs text-gray-400">
        Supports PDF, Doc, and PowerPoint files
      </p>
      <input {...getInputProps()} />
    </div>
  );
};
