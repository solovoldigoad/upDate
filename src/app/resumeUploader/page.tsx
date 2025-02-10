'use client';

import { useState } from 'react';
import axios from 'axios';

const ResumeUpload = ({ userId }: { userId: string }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return alert('Please select a file');

    const formData = new FormData();
    formData.append('resume', file);

    try {
      setUploading(true);
      const { data } = await axios.post('/api/upload/resume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          userId: userId // Send user ID for database update
        }
      });

      setResumeUrl(data.fileUrl);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 border rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-2">Upload Your Resume</h2>

      <input type="file" onChange={handleFileChange} accept=".pdf,.doc,.docx" />

      <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
        onClick={handleUpload}
        disabled={uploading}
      >
        {uploading ? 'Uploading...' : 'Upload Resume'}
      </button>

      {resumeUrl && (
        <div className="mt-2">
          <p>Resume uploaded successfully! <a href={resumeUrl} target="_blank" className="text-blue-600 underline">View Resume</a></p>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;
