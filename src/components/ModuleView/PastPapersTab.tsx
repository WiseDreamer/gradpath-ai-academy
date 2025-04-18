
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const PastPapersTab = () => {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-lg font-semibold mb-6">Past Papers</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { year: '2023', term: 'Spring', solved: true },
            { year: '2022', term: 'Fall', solved: true },
            { year: '2022', term: 'Spring', solved: false },
            { year: '2021', term: 'Fall', solved: false },
          ].map((item) => (
            <div 
              key={`${item.year}-${item.term}`}
              className="bg-white border rounded-lg p-5 hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-lg">Calculus I - {item.term} {item.year}</h4>
                  <p className="text-gray-500 mt-1">University of Oxford</p>
                  {item.solved && (
                    <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded text-xs mt-2">
                      Solutions Available
                    </span>
                  )}
                </div>
                <Button variant="outline">
                  View
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PastPapersTab;
