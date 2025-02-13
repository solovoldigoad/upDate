"use client"

import React, { useState } from 'react';
import { Calendar, Building2, MapPin, DollarSign, FileText, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function JobPostingForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    postedDate: "",
    description: "",
    requirements: [""],
    applicants: 24
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('/api/jobs', formData);

      if (response.status === 201) {
        alert('Job posted successfully!');
        router.push('/');
      }
    } catch (error: unknown) {
      console.error('Error creating job:', error);
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.error || 'Failed to post job. Please try again.');
      } else {
        alert('Failed to post job. Please try again.');
      }
    }
  };

  const handleAddRequirement = () => {
    setFormData(prev => ({
      ...prev,
      requirements: [...prev.requirements, ""]
    }));
  };

  const handleRequirementChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.map((req, i) => 
        i === index ? value : req
      )
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-red-600 p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">Post New Job</h2>
          <p className="text-red-100">Create an attractive job listing</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <FileText className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="pl-12 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Job Title"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <Building2 className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="pl-12 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Company"
                />
              </div>

              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="pl-12 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Location"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                  className="pl-12 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Salary Range"
                />
              </div>

              <div className="relative">
                <Users className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
                <input
                  type="number"
                  name="applicants"
                  value={formData.applicants}
                  onChange={handleInputChange}
                  className="pl-12 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Number of Applicants"
                />
              </div>
            </div>

            <div className="relative">
              <Calendar className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
              <input
                type="date"
                name="postedDate"
                value={formData.postedDate}
                onChange={handleInputChange}
                className="pl-12 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <div>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Job Description"
              />
            </div>

            <div className="space-y-2">
              {formData.requirements.map((req, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    name={`requirements.${index}`}
                    value={req}
                    onChange={(e) => handleRequirementChange(index, e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Requirement"
                  />
                  {index === formData.requirements.length - 1 && (
                    <button
                      type="button"
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      onClick={handleAddRequirement}
                    >
                      +
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition duration-200"
          >
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
}