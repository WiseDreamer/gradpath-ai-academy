
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileText } from 'lucide-react';
import { UploadResourceModal } from '@/components/ModuleResources/UploadResourceModal';

const MaterialsTab = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Module Materials</h3>
          <Button onClick={() => setIsUploadModalOpen(true)}>
            <Upload className="mr-2 h-4 w-4" />
            Upload New Material
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'Introduction to Calculus.pdf', type: 'Slide', date: '2023-10-15' },
            { name: 'Limits and Continuity.pdf', type: 'Note', date: '2023-10-18' },
            { name: 'Derivative Rules.pdf', type: 'Slide', date: '2023-10-22' },
            { name: 'Applications of Derivatives.pdf', type: 'Note', date: '2023-10-29' },
            { name: 'Integration Techniques.pdf', type: 'Slide', date: '2023-11-05' },
            { name: 'Applications of Integration.pdf', type: 'Note', date: '2023-11-12' },
          ].map((item) => (
            <div 
              key={item.name}
              className="bg-white border rounded-lg p-4 hover:shadow-md transition cursor-pointer"
            >
              <div className="flex gap-3 items-start">
                <FileText className="h-8 w-8 text-gradpath-purple shrink-0" />
                <div>
                  <p className="font-medium">{item.name}</p>
                  <div className="flex items-center mt-2 text-sm text-gray-500 gap-3">
                    <span className="px-2 py-0.5 bg-gray-100 rounded">
                      {item.type}
                    </span>
                    <span>
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <UploadResourceModal 
          open={isUploadModalOpen} 
          onClose={() => setIsUploadModalOpen(false)} 
        />
      </CardContent>
    </Card>
  );
};

export default MaterialsTab;
