// /models/User.js
import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  userType: string;
  company?: string;
  role?: string;
  phoneNumber: number;
  admin: boolean;
  image: string;
  resumeUrl: string;
  registrationStep: string;
  summary: string;
  resume: string;
  jobs: {
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  educations: {
    degree: string;
    institution: string;
    graduationYear: string;
  }[];
  skills: string[];
}


const UserSchema = new Schema<IUser>({
  name: { type: String, },
  email: { type: String, },
  password: { type: String,},
  userType: { type: String, required: true }, // "jobseeker" or "employer"
  company: { type: String },
  role: { type: String},
  phoneNumber: {type: Number, required: true},
  admin: {type: Boolean, default: false},
  image: { type: String},
  resumeUrl: {
    type: String,
    default: null
  },
  registrationStep: {
    type: String,
    enum: ['phone-verified', 'completed'],
    default: 'phone-verified'
  },
  summary: { type: String },
  resume: { type: String },
  jobs: [{
    title: String,
    company: String,
    startDate: String,
    endDate: String,
    description: String
  }],
  educations: [{
    degree: String,
    institution: String,
    graduationYear: String
  }],
  skills: [String]
});

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
