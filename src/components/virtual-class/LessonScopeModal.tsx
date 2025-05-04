
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface LessonScopeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (settings: LessonScopeSettings) => void;
}

export interface LessonScopeSettings {
  selectedTopics: string[];
  rangeStart: number;
  rangeEnd: number;
  depth: string;
}

const LessonScopeModal: React.FC<LessonScopeModalProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  // Sample topics for the current module (Linear Algebra)
  const availableTopics = [
    "Introduction to Linear Algebra",
    "Vectors and Vector Spaces",
    "Linear Transformations",
    "Matrix Operations",
    "Eigenvalues and Eigenvectors",
    "Orthogonality and Least Squares",
    "Singular Value Decomposition",
    "Applications in Data Science"
  ];

  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [range, setRange] = useState<number[]>([1, 8]);
  const [depth, setDepth] = useState<string>("Mixed");

  const handleTopicToggle = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter(t => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const handleSave = () => {
    onSave({
      selectedTopics,
      rangeStart: range[0],
      rangeEnd: range[1],
      depth
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Set Your Lesson Scope</DialogTitle>
          <DialogDescription>
            Customize what content you want to focus on in this session.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Topics Selection */}
          <div>
            <h3 className="text-sm font-medium mb-3">Select Topics</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {availableTopics.map((topic, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`topic-${index}`} 
                    checked={selectedTopics.includes(topic)}
                    onCheckedChange={() => handleTopicToggle(topic)}
                  />
                  <Label htmlFor={`topic-${index}`} className="text-sm">{topic}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Section Range */}
          <div>
            <h3 className="text-sm font-medium mb-3">Section Range</h3>
            <div className="px-2">
              <Slider 
                defaultValue={[1, 8]} 
                min={1} 
                max={8} 
                step={1} 
                value={range}
                onValueChange={setRange}
              />
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>From Section {range[0]}</span>
                <span>To Section {range[1]}</span>
              </div>
            </div>
          </div>

          {/* Depth Selector */}
          <div>
            <h3 className="text-sm font-medium mb-3">Lesson Depth</h3>
            <Select value={depth} onValueChange={setDepth}>
              <SelectTrigger>
                <SelectValue placeholder="Select depth" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Overview">Overview - High level concepts</SelectItem>
                <SelectItem value="Detailed">Detailed - Deep explanations</SelectItem>
                <SelectItem value="Mixed">Mixed - Balance of both</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Apply Settings</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LessonScopeModal;
