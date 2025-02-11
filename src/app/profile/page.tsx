"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import axios from "axios"

interface Job {
  id: number
  title: string
  company: string
  startDate: string
  endDate: string
  description: string
}

interface Education {
  id: number
  degree: string
  institution: string
  graduationYear: string
}

export default function Profile() {
  const { data: session } = useSession()
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    image: "",
    userType: "",
    company: "",
  })

  // Editable states
  const [summary, setSummary] = useState("")
  const [jobs, setJobs] = useState<Job[]>([])
  const [educations, setEducations] = useState<Education[]>([])
  const [skills, setSkills] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState("")

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/profile')
        const user = response.data
        
        // Set read-only data
        setUserData({
          name: user.name || "",
          email: user.email || "",
          phoneNumber: user.phoneNumber?.toString() || "",
          image: user.image || "",
          userType: user.userType || "",
          company: user.company || "",
        })

        // Set editable data
        setSummary(user.summary || "")
        setJobs(user.jobs || [])
        setEducations(user.educations || [])
        setSkills(user.skills || [])
      } catch (error) {
        console.error("Error fetching user data:", error)
      }
    }

    if (session?.user) {
      fetchUserData()
    }
  }, [session])

  const handleSaveChanges = async () => {
    try {
    const response = await axios.put('/api/profile', {
        summary,
        jobs,
        educations,
        skills,

      });

      if (response.status === 200) {
        setIsEditing(false);
        alert('Profile updated successfully');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  const addJob = () => {
    const newJob: Job = {
      id: Date.now(),
      title: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
    }
    setJobs([...jobs, newJob])
  }

  const updateJob = (id: number, field: keyof Job, value: string) => {
    setJobs(jobs.map((job) => (job.id === id ? { ...job, [field]: value } : job)))
  }

  const removeJob = (id: number) => {
    setJobs(jobs.filter((job) => job.id !== id))
  }

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now(),
      degree: "",
      institution: "",
      graduationYear: "",
    }
    setEducations([...educations, newEducation])
  }

  const updateEducation = (id: number, field: keyof Education, value: string) => {
    setEducations(educations.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)))
  }

  const removeEducation = (id: number) => {
    setEducations(educations.filter((edu) => edu.id !== id))
  }

  const addSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill])
      setNewSkill("")
    }
  }

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill))
  }

  return (
    <Card className="w-full max-w-4xl md:mx-auto mt-20 shadow-custom border-2 border-black mx-1">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="font-extrabold text-3xl">Your Profile</CardTitle>
        <Button 
          onClick={() => {
            if (isEditing) {
              handleSaveChanges();
            } else {
              setIsEditing(true);
            }
          }}
        >
          {isEditing ? "Save Changes" : "Edit Profile"}
        </Button>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Personal Information - Read Only */}
        <div>
          <div className="bg-red-600 h-32"></div>
          <div className="relative px-6 pb-6">
            <div className="flex flex-col items-center -mt-20 space-y-4 md:space-y-0">
              <Avatar className="w-32 h-32 rounded-full border-4 border-white bg-white">
                <AvatarImage 
                  src={userData.image || "/default-avatar.png"} 
                  alt={userData.name} 
                  className="object-cover"
                />
                <AvatarFallback>{userData.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <p className="text-3xl font-bold">{userData.name}</p>
                <p className="text-2xl font-medium text-gray-400">
                  {userData.userType === 'employer' ? 'Employer' : 'Job Seeker'}
                  {userData.company && ` at ${userData.company}`}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Read-only Information */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Personal Information</h2>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label>Email</Label>
              <p>{userData.email}</p>
            </div>
            <div className="grid gap-2">
              <Label>Phone</Label>
              <p>{userData.phoneNumber}</p>
            </div>
            {userData.company && (
              <div className="grid gap-2">
                <Label>Company</Label>
                <p>{userData.company}</p>
              </div>
            )}
          </div>
        </section>

        {/* Editable Sections */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Professional Summary</h2>
          <div className="grid gap-2">
            <Label>Summary</Label>
            {isEditing ? (
              <Textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={4} />
            ) : (
              <p>{summary}</p>
            )}
          </div>
        </section>

        {/* Work Experience */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Work Experience</h2>
            {isEditing && <Button onClick={addJob}>Add Job</Button>}
          </div>
          {jobs.map((job) => (
            <div key={job.id} className="space-y-4 p-4 border rounded-md relative">
              {isEditing && (
                <Button 
                  variant="destructive" 
                  size="sm" 
                  className="absolute top-2 right-2"
                  onClick={() => removeJob(job.id)}
                >
                  Remove
                </Button>
              )}
              <div className="grid gap-4 md:grid-cols-2">
                {isEditing ? (
                  <>
                    <input
                      value={job.title}
                      onChange={(e) => updateJob(job.id, 'title', e.target.value)}
                      className="border p-2 rounded"
                      placeholder="Job Title"
                    />
                    <input
                      value={job.company}
                      onChange={(e) => updateJob(job.id, 'company', e.target.value)}
                      className="border p-2 rounded"
                      placeholder="Company"
                    />
                    <input
                      value={job.startDate}
                      onChange={(e) => updateJob(job.id, 'startDate', e.target.value)}
                      className="border p-2 rounded"
                      placeholder="Start Date"
                    />
                    <input
                      value={job.endDate}
                      onChange={(e) => updateJob(job.id, 'endDate', e.target.value)}
                      className="border p-2 rounded"
                      placeholder="End Date"
                    />
                  </>
                ) : (
                  <>
                    <div className="grid gap-2">
                      <Label htmlFor={`title-${job.id}`}>Job Title</Label>
                      <p>{job.title}</p>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor={`company-${job.id}`}>Company</Label>
                      <p>{job.company}</p>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor={`startDate-${job.id}`}>Start Date</Label>
                      <p>{job.startDate}</p>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor={`endDate-${job.id}`}>End Date</Label>
                      <p>{job.endDate}</p>
                    </div>
                  </>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor={`description-${job.id}`}>Description</Label>
                <p>{job.description}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Education */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Education</h2>
            {isEditing && <Button onClick={addEducation}>Add Education</Button>}
          </div>
          {educations.map((edu) => (
            <div key={edu.id} className="space-y-4 p-4 border rounded-md relative">
              {isEditing && (
                <Button 
                  variant="destructive" 
                  size="sm" 
                  className="absolute top-2 right-2"
                  onClick={() => removeEducation(edu.id)}
                >
                  Remove
                </Button>
              )}
              <div className="grid gap-4 md:grid-cols-2">
                {isEditing ? (
                  <>
                    <input
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                      className="border p-2 rounded"
                      placeholder="Degree"
                    />
                    <input
                      value={edu.institution}
                      onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                      className="border p-2 rounded"
                      placeholder="Institution"
                    />
                    <input
                      value={edu.graduationYear}
                      onChange={(e) => updateEducation(edu.id, 'graduationYear', e.target.value)}
                      className="border p-2 rounded"
                      placeholder="Graduation Year"
                    />
                  </>
                ) : (
                  <>
                    <div className="grid gap-2">
                      <Label htmlFor={`degree-${edu.id}`}>Degree</Label>
                      <p>{edu.degree}</p>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor={`institution-${edu.id}`}>Institution</Label>
                      <p>{edu.institution}</p>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor={`graduationYear-${edu.id}`}>Graduation Year</Label>
                      <p>{edu.graduationYear}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </section>

        {/* Skills */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Skills</h2>
          {isEditing && (
            <div className="flex gap-2">
              <input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="border p-2 rounded"
                placeholder="New Skill"
              />
              <Button onClick={addSkill}>Add</Button>
            </div>
          )}
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="text-sm">
                {skill}
                {isEditing && (
                  <button 
                    onClick={() => removeSkill(skill)}
                    className="ml-2 text-red-500"
                  >
                    ×
                  </button>
                )}
              </Badge>
            ))}
          </div>
        </section>
      </CardContent>
    </Card>
  )
}
