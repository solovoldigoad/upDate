"use client"

import React, { useState, useEffect } from 'react';
import { Search, MapPin, Building2, DollarSign, Clock, Users } from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

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
  status: string;
  description: string;
  requirements: string[];
  applicants: number;
}

const JobListings = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    location: '',
    salary: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('/api/jobs');
        // Update this part to handle the new response structure
        const jobsData = response.data.jobs || [];
        // Only show approved jobs
        const approvedJobs = jobsData.filter((job: Job) => job.status === 'approved');
        setJobs(approvedJobs);
        setLoading(false);
      } catch (error: Error | unknown) {
        console.error('Error fetching jobs:', error);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = !filters.location || job.location.includes(filters.location);
    const matchesSalary = !filters.salary || job.salary.includes(filters.salary);
    
    return matchesSearch && matchesLocation && matchesSalary;
  });

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-xl">Loading...</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-red-600 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Job title or keyword"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200"
              />
            </div>
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Location"
                value={filters.location}
                onChange={(e) => setFilters({...filters, location: e.target.value})}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Job Listings */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Available Jobs ({filteredJobs.length})</h1>
            </div>

            <div className="space-y-4">
              {filteredJobs.map(job => (
                <div key={job._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-1">{job.title}</h2>
                      <div className="flex items-center text-gray-600 mb-2">
                        <Building2 className="w-4 h-4 mr-1" />
                        {job.company}
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-gray-500 text-sm flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        Posted on {job.postedDate}
                      </span>
                      <div className='flex flex-col items-center'>
                      <span className="text-red-600 text-lg font-semibold mt-1 flex items-center">
                        <Users className="w-5 h-5 mr-1" />Applicants Required
                      </span>
                      <samp className='text-red-500 text-3xl font-extrabold'>
                      {job.applicants}
                      </samp>
                      </div>
                    </div>
                  </div>

                  
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      {job.location}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <DollarSign className="w-4 h-4 mr-1" />
                      {job.salary}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h3 className="font-medium mb-2">Requirements:</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {job.requirements.map((req, index) => (
                        <li key={index} className="text-gray-600">{req}</li>
                      ))}
                    </ul>
                  </div>

                  <button 
                    onClick={() => router.push(`/job/${job._id}`)}
                    className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobListings;