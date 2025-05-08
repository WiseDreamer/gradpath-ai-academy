
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import { useIsMobile } from '@/hooks/use-mobile';
import BottomNav from '@/components/BottomNav';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, BookOpen, User, FileText, Star, Filter } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';

// Mock search results
const MOCK_MODULES = [
  { id: 1, title: 'Introduction to Computer Science', type: 'module', match: 95 },
  { id: 2, title: 'Computer Science Fundamentals', type: 'module', match: 85 },
  { id: 3, title: 'Advanced Computer Science Topics', type: 'module', match: 75 },
];

const MOCK_TUTORS = [
  { id: 1, name: 'Emma Watson', expertise: 'Computer Science, AI', rating: 4.9, type: 'tutor' },
  { id: 2, name: 'John Smith', expertise: 'Programming, Data Structures', rating: 4.8, type: 'tutor' },
];

const MOCK_RESOURCES = [
  { id: 1, title: 'Computer Science Handbook', format: 'PDF', type: 'resource' },
  { id: 2, title: 'Introduction to CS Video Series', format: 'Video', type: 'resource' },
];

const SearchPage: React.FC = () => {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [isSearching, setIsSearching] = useState(false);
  const [starred, setStarred] = useState<Record<string, boolean>>({});

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setIsSearching(true);
      // Simulate search delay
      setTimeout(() => {
        setIsSearching(false);
      }, 500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const toggleStar = (id: string) => {
    setStarred(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const allResults = [
    ...MOCK_MODULES,
    ...MOCK_TUTORS,
    ...MOCK_RESOURCES
  ];

  const filteredResults = {
    all: allResults,
    modules: MOCK_MODULES,
    tutors: MOCK_TUTORS,
    resources: MOCK_RESOURCES
  };

  const renderSearchResults = () => {
    if (!searchQuery.trim()) {
      return (
        <div className="text-center py-12">
          <Search size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500">Enter a search term to find modules, tutors, or resources</p>
        </div>
      );
    }

    if (isSearching) {
      return (
        <div className="text-center py-12">
          <div className="animate-pulse flex flex-col items-center">
            <div className="rounded-full bg-slate-200 h-12 w-12 mb-4"></div>
            <div className="h-4 bg-slate-200 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-slate-200 rounded w-1/4"></div>
          </div>
        </div>
      );
    }

    const results = filteredResults[activeTab as keyof typeof filteredResults];

    if (results.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500">No results found for "{searchQuery}"</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {results.map(result => {
          const resultId = `${result.type}-${result.id}`;
          
          if (result.type === 'module') {
            const module = result as typeof MOCK_MODULES[0];
            return (
              <Card key={resultId}>
                <CardContent className="p-4 flex items-start">
                  <div className="p-3 bg-blue-100 rounded-full mr-3">
                    <BookOpen size={20} className="text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{module.title}</h3>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => toggleStar(resultId)}
                      >
                        <Star 
                          size={16} 
                          className={starred[resultId] ? "text-yellow-500 fill-yellow-500" : "text-gray-400"}
                        />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500">Module • {module.match}% match</p>
                  </div>
                </CardContent>
              </Card>
            );
          }
          
          if (result.type === 'tutor') {
            const tutor = result as typeof MOCK_TUTORS[0];
            return (
              <Card key={resultId}>
                <CardContent className="p-4 flex items-start">
                  <div className="p-3 bg-purple-100 rounded-full mr-3">
                    <User size={20} className="text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{tutor.name}</h3>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => toggleStar(resultId)}
                      >
                        <Star 
                          size={16} 
                          className={starred[resultId] ? "text-yellow-500 fill-yellow-500" : "text-gray-400"}
                        />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500">Tutor • {tutor.rating} ★</p>
                    <p className="text-xs text-gray-500">{tutor.expertise}</p>
                  </div>
                </CardContent>
              </Card>
            );
          }
          
          if (result.type === 'resource') {
            const resource = result as typeof MOCK_RESOURCES[0];
            return (
              <Card key={resultId}>
                <CardContent className="p-4 flex items-start">
                  <div className="p-3 bg-green-100 rounded-full mr-3">
                    <FileText size={20} className="text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{resource.title}</h3>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => toggleStar(resultId)}
                      >
                        <Star 
                          size={16} 
                          className={starred[resultId] ? "text-yellow-500 fill-yellow-500" : "text-gray-400"}
                        />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500">Resource • {resource.format}</p>
                  </div>
                </CardContent>
              </Card>
            );
          }

          return null;
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <NavBar />
      <div className="container mx-auto px-4 pb-20">
        {isMobile ? (
          <>
            {/* Mobile View */}
            <div className="sticky top-[80px] bg-[#F5F5F7] z-10 pt-4 pb-2">
              <div className="relative mb-4">
                <Input
                  placeholder="Search modules, tutors, resources..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <Search 
                  className="absolute left-3 top-3 text-gray-400" 
                  size={16} 
                  onClick={handleSearch}
                />
              </div>
              
              <div className="flex justify-between items-center mb-2">
                <Tabs defaultValue="all" className="w-full" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="modules">Modules</TabsTrigger>
                    <TabsTrigger value="tutors">Tutors</TabsTrigger>
                    <TabsTrigger value="resources">Resources</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <Sheet>
                <SheetTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <Filter size={16} /> Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom">
                  <SheetHeader>
                    <SheetTitle>Search Filters</SheetTitle>
                  </SheetHeader>
                  <div className="py-4">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium mb-2">Date</h3>
                        <div className="flex flex-wrap gap-2">
                          <Button size="sm" variant="outline">Any time</Button>
                          <Button size="sm" variant="outline">Past week</Button>
                          <Button size="sm" variant="outline">Past month</Button>
                          <Button size="sm" variant="outline">Past year</Button>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium mb-2">Sort by</h3>
                        <div className="flex flex-wrap gap-2">
                          <Button size="sm" variant="outline">Relevance</Button>
                          <Button size="sm" variant="outline">Date</Button>
                          <Button size="sm" variant="outline">Rating</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            
            <div className="mt-4">
              {renderSearchResults()}
            </div>
          </>
        ) : (
          /* Desktop View */
          <div className="grid grid-cols-12 gap-6 mt-6">
            {/* Search bar section */}
            <div className="col-span-12">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    placeholder="Search modules, tutors, resources..."
                    className="pl-10 h-12"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <Search className="absolute left-3 top-4 text-gray-400" size={16} />
                </div>
                <Button className="h-12" onClick={handleSearch}>Search</Button>
              </div>
            </div>
            
            {/* Sidebar - Filters */}
            <div className="col-span-3">
              <Card>
                <CardContent className="p-4">
                  <h2 className="font-bold text-lg mb-4">Filters</h2>
                  
                  <div className="mb-6">
                    <h3 className="text-sm font-medium mb-2">Content Type</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input type="checkbox" id="modules-filter" className="mr-2" />
                        <label htmlFor="modules-filter">Modules</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="tutors-filter" className="mr-2" />
                        <label htmlFor="tutors-filter">Tutors</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="resources-filter" className="mr-2" />
                        <label htmlFor="resources-filter">Resources</label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-sm font-medium mb-2">Date</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input type="radio" name="date" id="any-time" className="mr-2" />
                        <label htmlFor="any-time">Any time</label>
                      </div>
                      <div className="flex items-center">
                        <input type="radio" name="date" id="past-week" className="mr-2" />
                        <label htmlFor="past-week">Past week</label>
                      </div>
                      <div className="flex items-center">
                        <input type="radio" name="date" id="past-month" className="mr-2" />
                        <label htmlFor="past-month">Past month</label>
                      </div>
                      <div className="flex items-center">
                        <input type="radio" name="date" id="past-year" className="mr-2" />
                        <label htmlFor="past-year">Past year</label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Sort by</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input type="radio" name="sort" id="relevance" className="mr-2" />
                        <label htmlFor="relevance">Relevance</label>
                      </div>
                      <div className="flex items-center">
                        <input type="radio" name="sort" id="date" className="mr-2" />
                        <label htmlFor="date">Date</label>
                      </div>
                      <div className="flex items-center">
                        <input type="radio" name="sort" id="rating" className="mr-2" />
                        <label htmlFor="rating">Rating</label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-sm font-medium mb-2">Saved Searches</h3>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full justify-start">Computer Science</Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">Machine Learning</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Main Content - Search Results */}
            <div className="col-span-9">
              <Card>
                <CardContent className="p-6">
                  <Tabs defaultValue="all" className="w-full mb-6" value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="all">All Results</TabsTrigger>
                      <TabsTrigger value="modules">Modules</TabsTrigger>
                      <TabsTrigger value="tutors">Tutors</TabsTrigger>
                      <TabsTrigger value="resources">Resources</TabsTrigger>
                    </TabsList>
                  </Tabs>
                  
                  <div>
                    {renderSearchResults()}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
      {isMobile && <BottomNav />}
    </div>
  );
};

export default SearchPage;
