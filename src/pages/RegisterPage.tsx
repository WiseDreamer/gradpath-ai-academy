
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import FormInput from '@/components/FormInput';
import Logo from '@/components/Logo';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const universities = [
  "University of Oxford",
  "University of Cambridge",
  "Imperial College London",
  "University College London",
  "University of Edinburgh",
  "King's College London",
  "University of Manchester",
  "London School of Economics"
];

const studyYears = ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year", "Postgraduate"];

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    university: '',
    yearOfStudy: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validation
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.university) newErrors.university = 'Please select your university';
    if (!formData.yearOfStudy) newErrors.yearOfStudy = 'Please select your year of study';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            university: formData.university,
            year_of_study: formData.yearOfStudy
          }
        }
      });

      if (error) throw error;

      toast({
        title: "Registration successful",
        description: "Welcome to GradPath! Please check your email to verify your account.",
      });
      
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 login-background">
      <div className="w-full max-w-md animate-fade-in">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <div className="text-center mb-6">
            <Logo className="justify-center" />
            <h1 className="text-2xl font-bold mt-4 text-gray-800">Create an account</h1>
            <p className="text-gray-500 mt-1">Join GradPath and enhance your learning journey</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormInput
              label="Full Name"
              id="fullName"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={handleChange}
              error={errors.fullName}
            />
            
            <FormInput
              label="Email"
              id="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
            
            <FormInput
              label="Password"
              id="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />
            
            <FormInput
              label="Confirm Password"
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
            />
            
            <div className="form-group">
              <label htmlFor="university" className="text-sm font-medium">
                University
              </label>
              <Select 
                onValueChange={(value) => handleSelectChange('university', value)}
                value={formData.university}
              >
                <SelectTrigger id="university">
                  <SelectValue placeholder="Select your university" />
                </SelectTrigger>
                <SelectContent>
                  {universities.map((uni) => (
                    <SelectItem key={uni} value={uni}>
                      {uni}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.university && <p className="text-red-500 text-xs mt-1">{errors.university}</p>}
            </div>
            
            <div className="form-group">
              <label htmlFor="yearOfStudy" className="text-sm font-medium">
                Year of Study
              </label>
              <Select 
                onValueChange={(value) => handleSelectChange('yearOfStudy', value)}
                value={formData.yearOfStudy}
              >
                <SelectTrigger id="yearOfStudy">
                  <SelectValue placeholder="Select your year" />
                </SelectTrigger>
                <SelectContent>
                  {studyYears.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.yearOfStudy && <p className="text-red-500 text-xs mt-1">{errors.yearOfStudy}</p>}
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gradpath-purple hover:bg-gradpath-dark-purple transition-colors"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Register"}
            </Button>
          </form>
          
          <div className="text-center mt-6">
            <p className="text-gray-500">
              Already have an account?{' '}
              <Link to="/" className="text-gradpath-purple hover:underline font-medium">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
