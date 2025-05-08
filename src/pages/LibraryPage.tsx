
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import { useIsMobile } from '@/hooks/use-mobile';
import BottomNav from '@/components/BottomNav';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Grid, List, Filter, Plus } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

// Mock data for library resources
const MOCK_RESOURCES = [
  { id: 1, title: 'Introduction to React', type: 'PDF', level: 'Beginner', category: 'Programming' },
  { id: 2, title: 'Advanced JavaScript Patterns', type: 'Video', level: 'Advanced', category: 'Programming' },
  { id: 3, title: 'Data Structures Explained', type: 'PDF', level: 'Intermediate', category: 'Computer Science' },
  { id: 4, title: 'Machine Learning Fundamentals', type: 'PDF', level: 'Intermediate', category: 'AI' },
  { id: 5, title: 'UI/UX Design Principles', type: 'Video', level: 'Beginner', category: 'Design' },
  { id: 6, title: 'Database Optimization Techniques', type: 'PDF', level: 'Advanced', category: 'Database' },
];

const LibraryPage: React.FC = () => {
  const isMobile = useIsMobile();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('modules');

  const filteredResources = MOCK_RESOURCES.filter(resource =>
    resource.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const ResourceCard = ({ resource }: { resource: typeof MOCK_RESOURCES[0] }) => (
    <Card className="h-full">
      <CardContent className="p-4 flex flex-col">
        <div className="text-sm font-semibold text-gradpath-purple">{resource.type}</div>
        <h3 className="text-lg font-bold mb-2">{resource.title}</h3>
        <div className="mt-auto flex justify-between items-center">
          <span className="text-sm text-gray-500">{resource.level}</span>
          <Button variant="ghost" size="sm">View</Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <NavBar />
      <div className="container mx-auto px-4 pb-20">
        {isMobile ? (
          <>
            {/* Mobile View */}
            <Tabs defaultValue="modules" className="w-full mt-4" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="modules">Modules</TabsTrigger>
                <TabsTrigger value="saved">Saved</TabsTrigger>
                <TabsTrigger value="uploads">My Uploads</TabsTrigger>
              </TabsList>
              
              <div className="flex items-center mb-4 relative">
                <Input 
                  placeholder="Search resources..." 
                  className="pr-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute right-3 text-gray-400" size={18} />
              </div>
              
              <TabsContent value="modules" className="space-y-4">
                {filteredResources.map(resource => (
                  <div key={resource.id} className="mb-3">
                    <ResourceCard resource={resource} />
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="saved" className="space-y-4">
                <p className="text-center text-gray-500 my-8">Your saved resources will appear here</p>
              </TabsContent>
              
              <TabsContent value="uploads" className="space-y-4">
                <p className="text-center text-gray-500 my-8">Your uploaded resources will appear here</p>
              </TabsContent>
            </Tabs>

            {/* Mobile Filter Sheet */}
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="fixed bottom-20 right-4 rounded-full bg-white shadow-lg h-12 w-12"
                >
                  <Filter size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[60vh]">
                <SheetHeader>
                  <SheetTitle>Filter Resources</SheetTitle>
                </SheetHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Resource Type</h3>
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" variant="outline">PDF</Button>
                      <Button size="sm" variant="outline">Video</Button>
                      <Button size="sm" variant="outline">Audio</Button>
                      <Button size="sm" variant="outline">Interactive</Button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Level</h3>
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" variant="outline">Beginner</Button>
                      <Button size="sm" variant="outline">Intermediate</Button>
                      <Button size="sm" variant="outline">Advanced</Button>
                    </div>
                  </div>
                  
                  <div className="pt-4 flex justify-end gap-2">
                    <Button variant="outline">Clear Filters</Button>
                    <Button>Apply Filters</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            
            {/* Mobile Upload FAB */}
            <Button 
              className="fixed bottom-20 left-4 rounded-full bg-gradpath-purple shadow-lg h-12 w-12"
              size="icon"
            >
              <Plus size={20} />
            </Button>
          </>
        ) : (
          /* Desktop View */
          <div className="grid grid-cols-12 gap-6 mt-6">
            {/* Sidebar */}
            <div className="col-span-3 bg-white rounded-lg shadow p-4">
              <h2 className="text-xl font-bold mb-4">Categories</h2>
              <ul className="space-y-2">
                <li className="p-2 rounded-md bg-gradpath-purple text-white cursor-pointer">All Resources</li>
                <li className="p-2 rounded-md hover:bg-gray-100 cursor-pointer">Programming</li>
                <li className="p-2 rounded-md hover:bg-gray-100 cursor-pointer">Computer Science</li>
                <li className="p-2 rounded-md hover:bg-gray-100 cursor-pointer">AI & Machine Learning</li>
                <li className="p-2 rounded-md hover:bg-gray-100 cursor-pointer">Design</li>
                <li className="p-2 rounded-md hover:bg-gray-100 cursor-pointer">Database Systems</li>
              </ul>
              
              <h3 className="text-lg font-bold mt-8 mb-4">Filters</h3>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">Resource Type</h4>
                <div className="space-y-1">
                  <div className="flex items-center">
                    <input type="checkbox" id="pdf" className="mr-2" />
                    <label htmlFor="pdf">PDF</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="video" className="mr-2" />
                    <label htmlFor="video">Video</label>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Level</h4>
                <div className="space-y-1">
                  <div className="flex items-center">
                    <input type="checkbox" id="beginner" className="mr-2" />
                    <label htmlFor="beginner">Beginner</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="intermediate" className="mr-2" />
                    <label htmlFor="intermediate">Intermediate</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="advanced" className="mr-2" />
                    <label htmlFor="advanced">Advanced</label>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="col-span-9">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="relative w-2/3">
                    <Input 
                      placeholder="Search library resources..." 
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute left-3 top-3 text-gray-400" size={16} />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant={viewMode === 'grid' ? 'default' : 'outline'} 
                      size="icon"
                      onClick={() => setViewMode('grid')}
                    >
                      <Grid size={16} />
                    </Button>
                    <Button 
                      variant={viewMode === 'list' ? 'default' : 'outline'} 
                      size="icon"
                      onClick={() => setViewMode('list')}
                    >
                      <List size={16} />
                    </Button>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-bold">Library Resources</h1>
                  <Button>Upload Resource</Button>
                </div>
              </div>
              
              {/* Resources Grid/List */}
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-3 gap-4">
                  {filteredResources.map(resource => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredResources.map(resource => (
                    <Card key={resource.id}>
                      <CardContent className="p-4 flex justify-between items-center">
                        <div>
                          <div className="text-sm font-semibold text-gradpath-purple">{resource.type} • {resource.category}</div>
                          <h3 className="text-lg font-bold">{resource.title}</h3>
                          <div className="text-sm text-gray-500">{resource.level}</div>
                        </div>
                        <Button>View</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {isMobile && <BottomNav />}
    </div>
  );
};

export default LibraryPage;
