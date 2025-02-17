"use client"

import { useState, useEffect } from "react";
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Search, 
  Filter,
  Clock,
  Building2,
  MapPin,
  DollarSign,
  BadgeCheck,
  ChevronRight,
  Briefcase
} from "lucide-react";

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

const AdminJobDashboard = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [sessionUserEmail, setSessionUserEmail] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch('/api/jobs');
      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }
      const data = await response.json();
      setJobs(data.jobs);
      setSessionUserEmail(data.sessionUserEmail);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (jobId: string) => {
    try {
      const response = await fetch(`/api/jobs/${jobId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'approved' }),
      });

      if (!response.ok) {
        throw new Error('Failed to update job status');
      }

      setJobs(jobs.map(job => 
        job._id === jobId ? {...job, status: "approved"} : job
      ));
    } catch (err) {
      console.error('Error approving job:', err);
    }
  };

  const handleReject = async (jobId: string) => {
    try {
      const response = await fetch(`/api/jobs/${jobId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'rejected' }),
      });

      if (!response.ok) {
        throw new Error('Failed to update job status');
      }

      setJobs(jobs.map(job => 
        job._id === jobId ? {...job, status: "rejected"} : job
      ));
    } catch (err) {
      console.error('Error rejecting job:', err);
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || job.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 border-b border-red-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-white/10 rounded-lg">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Job Approval Dashboard</h1>
              <p className="text-red-100 mt-1">Manage and review job postings</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {[
            { 
              label: "Pending Review", 
              value: jobs.filter(j => j.status === "pending").length,
              color: "bg-yellow-500",
              lightColor: "bg-yellow-50"
            },
            { 
              label: "Approved Jobs", 
              value: jobs.filter(j => j.status === "approved").length,
              color: "bg-green-500",
              lightColor: "bg-green-50"
            },
            { 
              label: "Rejected Jobs", 
              value: jobs.filter(j => j.status === "rejected").length,
              color: "bg-red-500",
              lightColor: "bg-red-50"
            }
          ].map((stat, idx) => (
            <div key={idx} className={`${stat.lightColor} rounded-xl shadow-sm overflow-hidden border border-gray-200`}>
              <div className={`h-1 w-full ${stat.color}`} />
              <div className="p-4">
                <p className="text-gray-500 text-sm">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs..."
                className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-4">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
          </div>
        ) : error ? (
          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Job List */}
            <div className="lg:col-span-2 space-y-4">
              {filteredJobs.map(job => (
                <div 
                  key={job._id}
                  className={`bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer transition-all hover:shadow-md ${
                    selectedJob?._id === job._id ? 'ring-2 ring-gray-500' : ''
                  }`}
                  onClick={() => setSelectedJob(job)}
                >
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center space-x-3">
                          <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        </div>
                        <div className="mt-2 space-y-2">
                          <div className="flex items-center text-gray-500">
                            <Building2 className="h-4 w-4 mr-2" />
                            {job.company}
                          </div>
                          <div className="flex items-center text-gray-500">
                            <MapPin className="h-4 w-4 mr-2" />
                            {job.location}
                          </div>
                          <div className="flex items-center text-gray-500">
                            <DollarSign className="h-4 w-4 mr-2" />
                            {job.salary}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        {job.status === 'pending' && (
                          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            Pending
                          </span>
                        )}
                        {job.status === 'approved' && (
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm flex items-center">
                            <BadgeCheck className="h-4 w-4 mr-1" />
                            Approved
                          </span>
                        )}
                        {job.status === 'rejected' && (
                          <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm flex items-center">
                            <XCircle className="h-4 w-4 mr-1" />
                            Rejected
                          </span>
                        )}
                        <span className="text-sm text-gray-500">
                          {job.applicants} applicants
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="h-1 w-full bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100" />
                </div>
              ))}
            </div>

            {/* Job Details Panel */}
            <div className="lg:col-span-1">
              {selectedJob ? (
                <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-6">
                  <div className="h-2 w-full bg-gradient-to-r from-red-500 to-red-600" />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900">{selectedJob.title}</h3>
                      <div className={`w-2 h-2 rounded-full ${
                        selectedJob.status === 'pending' ? 'bg-yellow-500' :
                        selectedJob.status === 'approved' ? 'bg-green-500' : 'bg-red-500'
                      }`} />
                    </div>
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-500">Posted By</h4>
                        <p className="text-gray-900 mt-1">{sessionUserEmail}</p>
                        <p className="text-sm text-gray-500 mt-1">Posted on {selectedJob.postedDate}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Description</h4>
                        <p className="text-gray-900 mt-1">{selectedJob.description}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Requirements</h4>
                        <ul className="mt-2 space-y-2">
                          {selectedJob.requirements.map((req, index) => (
                            <li key={index} className="flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                              <span className="text-gray-700">{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {selectedJob.status === 'pending' && (
                        <div className="flex space-x-4 mt-6">
                          <button
                            onClick={() => handleApprove(selectedJob._id)}
                            className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center"
                          >
                            <CheckCircle className="h-5 w-5 mr-2" />
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(selectedJob._id)}
                            className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center"
                          >
                            <XCircle className="h-5 w-5 mr-2" />
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm p-6 text-center text-gray-500">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-600 font-medium">Select a job to view details</p>
                  <p className="text-sm text-gray-500 mt-1">Click on any job listing to see more information</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminJobDashboard;
