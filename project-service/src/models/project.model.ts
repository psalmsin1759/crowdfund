import mongoose, { Document, Schema, Model } from 'mongoose';

export type ProjectStatus = 'draft' | 'published' | 'funding' | 'completed' | 'cancelled';

export interface IProject extends Document {
  title: string;
  description: string;
  category: string;
  targetAmount: number;
  fundedAmount: number;
  deadline: Date;
  creatorId: string; 
  status: ProjectStatus;
  images: string[];
  video?: string;
  featured: boolean;
  backersCount: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema: Schema<IProject> = new Schema<IProject>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    targetAmount: { type: Number, required: true },
    fundedAmount: { type: Number, default: 0 },
    deadline: { type: Date, required: true },
    creatorId: { type: String, required: true },
    status: {
      type: String,
      enum: ['draft', 'published', 'funding', 'completed', 'cancelled'],
      default: 'draft',
    },
    images: { type: [String], default: [] },
    video: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    backersCount: { type: Number, default: 0 },
    tags: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }
);

const Project: Model<IProject> = mongoose.model<IProject>('Project', projectSchema);
export default Project;
