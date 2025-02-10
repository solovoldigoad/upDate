import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { 
  BookOpen, 
  Clock, 
  Award, 
  CheckCircle2, 
  Play, 
  Users,
  Star,
  Download,
  Calendar
} from 'lucide-react';

const HRCoursePage = () => {
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-8 mb-8 text-white">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Professional HR Management Certification
            </h1>
            <p className="text-lg mb-6">
              Master the essential skills needed to become a successful HR professional. Learn from industry experts and get certified.
            </p>
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>12 Weeks</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>500+ Enrolled</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                <span>4.8/5 Rating</span>
              </div>
            </div>
            <Button className="bg-white text-red-500 hover:bg-gray-100">
              Enroll Now - $499
            </Button>
          </div>
          <div className="hidden md:block">
            <img 
              src="/api/placeholder/500/300"
              alt="HR Course"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Course Features */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Card className="border-red-100">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <Award className="w-8 h-8 text-red-500" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Certification</h3>
                <p className="text-gray-600">Industry-recognized certification upon completion</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-100">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <BookOpen className="w-8 h-8 text-red-500" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Practical Learning</h3>
                <p className="text-gray-600">Real-world case studies and projects</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-100">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <Users className="w-8 h-8 text-red-500" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Expert Mentorship</h3>
                <p className="text-gray-600">1-on-1 guidance from HR professionals</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Course Modules */}
    

      {/* Course Benefits */}
      <Card className="mb-12 border-red-100">
        <CardHeader>
          <CardTitle>What You'll Learn</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Complete HR Management Skills",
              "Recruitment & Selection Processes",
              "Employee Relations Management",
              "Performance Management",
              "Compensation & Benefits Planning",
              "HR Analytics & Reporting",
              "Legal Compliance & Regulations",
              "Leadership & Team Management"
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
        <CardContent className="p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Start Your HR Career?</h2>
            <p className="mb-6">Join our comprehensive HR management course and become a certified professional</p>
            <Button className="bg-white text-red-500 hover:bg-gray-100">
              Enroll Now - $499
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HRCoursePage;