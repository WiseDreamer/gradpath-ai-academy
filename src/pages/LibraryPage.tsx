import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Book, BookOpen } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import BottomNav from '@/components/BottomNav';

// Mock data for courses
const courses = [
  {
    id: 1,
    title: 'Introduction to React',
    description: 'Learn the basics of React and build your first application.',
    lessons: 10,
    duration: '4 hours',
    category: 'Web Development',
    level: 'Beginner',
  },
  {
    id: 2,
    title: 'Advanced JavaScript Concepts',
    description: 'Dive deep into advanced JavaScript concepts like closures, prototypes, and asynchronous programming.',
    lessons: 15,
    duration: '6 hours',
    category: 'Web Development',
    level: 'Intermediate',
  },
  {
    id: 3,
    title: 'Python for Data Science',
    description: 'Explore data science with Python, covering topics like data manipulation, analysis, and visualization.',
    lessons: 12,
    duration: '5 hours',
    category: 'Data Science',
    level: 'Intermediate',
  },
  {
    id: 4,
    title: 'Machine Learning Fundamentals',
    description: 'Get started with machine learning by understanding fundamental algorithms and techniques.',
    lessons: 18,
    duration: '7 hours',
    category: 'Data Science',
    level: 'Beginner',
  },
  {
    id: 5,
    title: 'Mobile App Development with React Native',
    description: 'Build cross-platform mobile applications using React Native.',
    lessons: 20,
    duration: '8 hours',
    category: 'Mobile Development',
    level: 'Intermediate',
  },
];

const LibraryPage: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleCourseClick = (courseId: number) => {
    navigate(`/course/${courseId}`);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <NavBar />
      <div className="container mx-auto px-4 pb-20">
        <h1 className="text-2xl font-bold mt-6">Your Library</h1>
        <p className="text-gray-500 mb-6">Access your courses and learning resources</p>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Courses</TabsTrigger>
            <TabsTrigger value="web-dev">Web Development</TabsTrigger>
            <TabsTrigger value="data-science">Data Science</TabsTrigger>
            <TabsTrigger value="mobile-dev">Mobile Development</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {courses.map(course => (
                <Card key={course.id} onClick={() => handleCourseClick(course.id)} className="cursor-pointer hover:shadow-md transition-shadow duration-200">
                  <CardHeader>
                    <CardTitle>{course.title}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      <span>{course.lessons} Lessons</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <div>
                      <Badge variant="secondary">{course.level}</Badge>
                    </div>
                    <Button size="sm">View Course</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="web-dev" className="space-y-4">
            <CourseCategoryContent category="Web Development" courses={courses} handleCourseClick={handleCourseClick} />
          </TabsContent>
          <TabsContent value="data-science" className="space-y-4">
            <CourseCategoryContent category="Data Science" courses={courses} handleCourseClick={handleCourseClick} />
          </TabsContent>
          <TabsContent value="mobile-dev" className="space-y-4">
            <CourseCategoryContent category="Mobile Development" courses={courses} handleCourseClick={handleCourseClick} />
          </TabsContent>
        </Tabs>
      </div>
      {isMobile && <BottomNav />}
    </div>
  );
};

interface CourseCategoryContentProps {
  category: string;
  courses: any[];
  handleCourseClick: (courseId: number) => void;
}

const CourseCategoryContent: React.FC<CourseCategoryContentProps> = ({ category, courses, handleCourseClick }) => {
  const filteredCourses = courses.filter(course => course.category === category);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredCourses.map(course => (
        <Card key={course.id} onClick={() => handleCourseClick(course.id)} className="cursor-pointer hover:shadow-md transition-shadow duration-200">
          <CardHeader>
            <CardTitle>{course.title}</CardTitle>
            <CardDescription>{course.description}</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>{course.lessons} Lessons</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{course.duration}</span>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <div>
              <Badge variant="secondary">{course.level}</Badge>
            </div>
            <Button size="sm">View Course</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

interface ClockProps {
  className?: string;
}

function Clock(props: ClockProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}


export default LibraryPage;
