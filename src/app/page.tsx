"use client"
import React, { useState, useEffect } from 'react';
import { Search, Star, BookOpen, Clock, Award, Users, ArrowRight, Instagram, Linkedin, Twitter, Building2, Facebook, MapPin, Phone, Mail, Send } from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Image from 'next/image';
import { h3, span } from 'framer-motion/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  requirements: string[];
  status: string;
  postedDate: string;
}

const UpDate = () => {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDomain, setSelectedDomain] = useState('All Programs');

  const programs = [
    {
      id: 1,
      title: "Build a strong foundation in management principles and leadership skills",
      duration: "4 months",
      rating: 4.8,
      price: "₹19,500",
      image: "/course1.png"
    },
    {
      id: 2,
      title: "Train to become an industry-ready professional in HR roles",
      duration: "4 months",
      rating: 4.7,
      price: "₹19,500",
      image: "/course2.png"
    },
    {
      id: 3,
      title: "Master advanced BFSI strategies, risk management, Insurance Sector",
      duration: "4 months",
      rating: 4.9,
      price: "₹19,500",
      image: "/course3.png"
    }
  ];



  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('/api/jobs');
        // Filter only approved jobs
        const approvedJobs = response.data.jobs.filter((job: Job) => job.status === 'approved');
        setJobs(approvedJobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-500 to-red-800 text-white py-16 ">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Job pana aur bhi hua asane upDate ka sath
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Job pana aur bhi hua asane upDate ka sath
            </p>
            <div className="bg-white rounded-lg p-2 flex items-center">
              <Search className="text-black w-6 h-6 ml-2" />
              <input
                type="text"
                placeholder="What do you want to learn?"
                className="flex-1 px-4 py-2 outline-none text-gray-800"
              />
              <button className="bg-red-700 text-white px-6 py-2 rounded-lg hover:bg-red-800">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Projects Section */}
      <div className="w-full px-8 py-12">
        <h2 className="text-2xl font-bold mb-6">Latest Job Postings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            // Loading skeleton
            Array(6).fill(0).map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="flex gap-2 mb-4">
                  <div className="h-8 bg-gray-200 rounded-full w-20"></div>
                  <div className="h-8 bg-gray-200 rounded-full w-20"></div>
                </div>
                <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
              </div>
            ))
          ) : jobs.length > 0 ? (
            jobs.map((job) => (
              <div key={job._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">{job.title}</h3>
                  <span className="text-red-600 font-medium">{job.salary}</span>
                </div>
                <p className="text-gray-600 mb-4">{job.company} • {job.location}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.requirements?.slice(0, 3).map((req, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                      {req}
                    </span>
                  ))}
                </div>
                <button 
                  onClick={() => router.push(`/job/${job._id}`)}
                  className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
                >
                  Apply Now
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center text-gray-500">
              No jobs available at the moment
            </div>
          )}
        </div>
      </div>

{/* Job Posting Section */}
<div className="py-16 bg-gradient-to-r from-red-500 to-red-700">
  <div className="container mx-auto px-4 text-center">
    <h2 className="text-3xl font-bold mb-6 text-white">Looking to Hire Top Talent?</h2>
    <p className="text-xl mb-8 text-white opacity-90">
      Post your job openings and connect with qualified candidates
    </p>
    <div className="flex flex-col md:flex-row justify-center items-center gap-6">
      <div className="bg-white p-6 rounded-lg shadow-lg text-left max-w-sm w-full">
        <div className="flex items-center mb-4">
          <div className="bg-red-100 p-3 rounded-full">
            <Users className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="text-xl font-semibold ml-4">Post a Job</h3>
        </div>
        <p className="text-gray-600 mb-4">
          Reach thousands of potential candidates and find the perfect match for your company.
        </p>
        <button 
          onClick={() => router.push('/post-job')}
          className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
        >
          Post a Job Now <ArrowRight className="ml-2 w-5 h-5" />
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg text-left max-w-sm w-full">
        <div className="flex items-center mb-4">
          <div className="bg-red-100 p-3 rounded-full">
            <Search className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="text-xl font-semibold ml-4">Browse Jobs</h3>
        </div>
        <p className="text-gray-600 mb-4">
          Find your next career opportunity from thousands of listed positions.
        </p>
        <button 
          onClick={() => router.push('/job')}
          className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
        >
          View All Jobs <ArrowRight className="ml-2 w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
</div>



      {/* Stats Section */}
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-red-600">1M+</div>
              <div className="text-gray-600">Learners</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600">500+</div>
              <div className="text-gray-600">Hiring Partners</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600">40%</div>
              <div className="text-gray-600">Average Salary Hike</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600">50+</div>
              <div className="text-gray-600">Countries</div>
            </div>
          </div>
        </div>
      </div>

      {/* Programs Section */}
      <div >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Most Popular Programs</h2>
          
          {/* Domain Filter */}
          <div className="flex overflow-x-auto">
            {['All Programs', 'Data Science', 'MBA', 'Software Development', 'Machine Learning'].map((domain) => (
              <button
                key={domain}
                className={`px-6 py-2 rounded-full mr-4 whitespace-nowrap ${
                  selectedDomain === domain
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedDomain(domain)}
              >
                {domain}
              </button>
            ))}
          </div>
        </div>
      </div>

          {/* Program Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {programs.map((program) => (
          <CardContainer key={program.id} className="inter-var w-full">
            <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-auto rounded-xl p-2 border">
              <CardItem translateZ="100" className="w-full mt-4">
                <Image
                  src={program.image}
                  height="1000"
                  width="1000"
                  className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                  alt={program.title} 
                />
              </CardItem>
              <div>
                <CardItem
                translateZ={20}
                as={h3}
                className='text-xl font-semibold mb-2'>
                  {program.title}
                </CardItem>
              </div>
              <div className='flex items-center mb-4'>
              <CardItem
                translateZ={20}
                as={span}
                className='text-gray-700 flex flex-row items-center justify-center'>
              <Star className="w-5 h-5 text-yellow-400 mr-1 z-20" />
                  {program.rating}
                </CardItem>
              </div>
              <div className="flex items-center text-gray-600 mb-4">
              <CardItem
                translateZ={20}
                as={span}
                className='text-gray-500 ml-2 flex flex-row items-center justify-center'>
                  <Clock className="w-4 h-4 mr-2" />
                      {program.duration}
                </CardItem>
              </div>
              <div className="flex justify-between items-center">
                <CardItem
                  translateZ={20}
                  as={span}
                  className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                >{program.price}
                </CardItem>
                <CardItem
                  translateZ={20}
                  as="button"
                  onClick={() => router.push('/OnlineCourse')}
                  className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                >
                  View Program
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        ))}
      </div>
      {/* Features Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose UpDate?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">University Credentials</h3>
              <p className="text-gray-600">Get degrees and certificates from world-renowned universities</p>
            </div>
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1:1 Mentorship</h3>
              <p className="text-gray-600">Personalized guidance from industry experts</p>
            </div>
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Practice-based Learning</h3>
              <p className="text-gray-600">Work on real projects and build industry-relevant skills</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <footer className="bg-gradient-to-br from-red-500 to-red-600 text-white mb-4 ">
      {/* Top Wave Design */}
      <div className="w-full">
        <svg className="w-full h-12 md:h-24 lg:h-32 -mb-1" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 50L48 45.7C96 41.3 192 32.7 288 39.3C384 46 480 68 576 70.8C672 73.7 768 57.3 864 52.2C960 47 1056 53 1152 54.8C1248 56.7 1344 54.3 1392 53.2L1440 52V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V50Z" fill="white"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-white" />
              <span className="ml-2 text-xl font-bold">JobPortal</span>
            </div>
            <p className="text-gray-100">
              Connecting talented professionals with their dream careers. Join thousands of companies and job seekers who trust JobPortal.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-200 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-gray-200 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-gray-200 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-gray-200 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {['Find Jobs', 'Post a Job','Career Advice', 'Pricing Plans'].map((link) => (
                <li key={link}>
                  <a href="#" className="flex items-center group">
                    <ArrowRight className="h-4 w-4 mr-2 transform group-hover:translate-x-2 transition-transform" />
                    <span className="group-hover:text-gray-200 transition-colors">{link}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3" />
                <span>info@updats.in</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-3" />
                <span>+91 8109718211</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-16 w-16 mr-3" />
                <span>G.F. Plaza Shop No.03 Ring Road 01,Near Udhyog Bhawan, Raipur, Chattisgarh 492001</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="mb-4 text-gray-100">Subscribe to our newsletter for the latest job updates and career tips.</p>
            <div className="flex space-x-2">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-300"
              />
              <Button className="bg-white text-red-500 hover:bg-gray-100">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-gray-100">
            © {new Date().getFullYear()} JobPortal. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="hover:text-gray-200 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-200 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-200 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>

      {/* Bottom Wave Design */}
      <div className="w-full">
        <svg className="w-full h-12 md:h-24 lg:h-32 -mb-1" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 50L48 45.7C96 41.3 192 32.7 288 39.3C384 46 480 68 576 70.8C672 73.7 768 57.3 864 52.2C960 47 1056 53 1152 54.8C1248 56.7 1344 54.3 1392 53.2L1440 52V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V50Z" fill="white"/>
        </svg>
      </div>
    </footer>
    </div>
  );
};

export default UpDate;
