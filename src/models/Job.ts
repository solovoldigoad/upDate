
import{ Schema, model, models } from 'mongoose';

const JobSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    },
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',  // Reference to the User model
        required: true
    },
    postedDate: {
        type: String,
        default: () => new Date().toISOString(),
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    requirements: [{
        type: String,
        required: true
    }],
    applicants: {
        type: Number,
        default: 0
    }
}, { 
    timestamps: true 
});

export const Job = models.Job || model('Job', JobSchema);
