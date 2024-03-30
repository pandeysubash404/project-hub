import { Schema, model, Types } from 'mongoose';
import Project from './projects';
import User from './users';

export interface IOrganization {
  name: string;
  members: Types.ObjectId[];
  projects: Types.ObjectId[];
  expireAt?: Date;
}

const organizationSchema = new Schema<IOrganization>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    members: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: User, // Assuming your User model is named 'User'
          required: true,
        },
      ],
      validate: {
        validator(array: Types.ObjectId[]) {
          return array.length > 0;
        },
        message: () => 'members should not be empty',
      },
    },    
    projects: [
      {
        type: Schema.Types.ObjectId,
        ref: Project, // Assuming your Project model is named 'Project'
      },
    ],
    expireAt: {
      type: Date,
      expires: 2592000, // 30 days in seconds
    },
  },
  {
    timestamps: true,
  }
);

const Organization = model<IOrganization>('Organization', organizationSchema);

export default Organization;
