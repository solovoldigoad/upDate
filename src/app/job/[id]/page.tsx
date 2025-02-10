"use client"

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { 
  ArrowLeft, 
  Building2, 
  MapPin, 
  DollarSign, 
  Users,
  Calendar,
  Loader2
} from 'lucide-react';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';


interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  postedBy: {
    _id: string;
    email: string;
  };
  postedDate: string;
  description: string;
  requirements: string[];
  applicants: number;
}

export default function JobDetails() {
  const { data: session } = useSession();
  const params = useParams();
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    resume: null as File | null
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`/api/jobs/${params.id}`);
        setJob(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching job:', error);
        setLoading(false);
      }
    };

    fetchJob();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      router.push('/auth/signin');
      return;
    }

    try {
      const formDataToSend = new FormData();
      if (formData.resume) {
        formDataToSend.append('resume', formData.resume);
      }

      const response = await axios.post(`/api/jobs/apply`, formDataToSend);
      
      if (response.data.redirect) {
        router.push(response.data.redirect);
      }
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-red-500" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Job not found</h2>
          <button
            onClick={() => router.back()}
            className="mt-4 text-red-600 hover:text-red-700"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50">
      {/* Job Details Section */}
      <Card className="mb-8 border-red-100 shadow-lg">
        <CardHeader className="bg-white border-b border-red-100 p-6">
          <div className="flex flex-col space-y-4">
            {/* Go Back Button */}
            <button
              onClick={() => router.back()}
              className="flex items-start bg-black text-white hover:text-red-200 transition-colors w-fit px-4 py-2 rounded-md shadow-lg hover:shadow-xl"
            >
              <ArrowLeft className="h-6 w-6 mr-2" />
            </button>


            {/* Existing Header Content */}
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-3xl font-bold mb-4 text-gray-900">{job.title}</CardTitle>
                <div className="flex flex-wrap items-center gap-6 text-gray-600">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-6 h-6 text-red-500" />
                    <span className="text-lg">{job.company}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-6 h-6 text-red-500" />
                    <span className="text-lg">{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-6 h-6 text-red-500" />
                    <span className="text-lg">{job.salary}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-6 h-6 text-red-500" />
                    <span className="text-lg">{job.applicants} applicants</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-red-500" />
                    <span className="text-lg">Posted {job.postedDate}</span>
                  </div>
                </div>
              </div>
              <Badge className="bg-red-500 hover:bg-red-600 text-base px-4 py-2">Active</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="bg-white space-y-8 p-6">
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">Job Description</h3>
            <p className="text-gray-600 text-lg leading-relaxed">{job.description}</p>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">Requirements</h3>
            <ul className="list-disc pl-6 space-y-3 text-gray-600">
              {job.requirements.map((requirement, index) => (
                <li key={index} className="text-lg">{requirement}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">Posted By</h3>
            <p className="text-gray-600 text-lg">{job.postedBy.email}</p>
          </div>
        </CardContent>
      </Card>

      {/* Application Form Section */}
      <Card className="border-red-100 shadow-lg">
        <CardHeader className="bg-white border-b border-red-100 p-6">
          <CardTitle className="text-2xl text-gray-900">Apply for this position</CardTitle>
        </CardHeader>
        <CardContent className="bg-white mt-2 p-2">
          <form onSubmit={handleSubmit}>
            {/* Display user info from session */}
            <div className="bg-gray-50 p-6 rounded-lg ">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Your Information</h3>
              <div className="space-y-3">
                <p className="text-gray-600 text-lg">
                  <span className="font-medium">Name:</span> {session?.user?.name}
                </p>
                <p className="text-gray-600 text-lg">
                  <span className="font-medium">Email:</span> {session?.user?.email}
                </p>
              </div>
            </div>

            {/* Resume Upload */}
            <div>
              <label className="block text-xl font-medium mb-2 text-black">Resume</label>
              <Input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setFormData(prev => ({
                      ...prev,
                      resume: e.target.files![0]
                    }));
                  }
                }}
                required
                className="text-lg border-gray-300 focus:border-red-500 focus:ring-red-500 p-3"
              />
              <p className="text-base text-gray-500 mt-2">Accepted formats: PDF, DOC, DOCX</p>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-red-500 hover:bg-red-600 text-white text-lg py-6"
              disabled={!session}
            >
              {session ? 'Submit Application' : 'Sign in to Apply'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 