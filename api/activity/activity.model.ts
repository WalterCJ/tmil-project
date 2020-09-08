import * as mongoose from "mongoose";
import { User } from "../users/users.model";

export interface Activity extends mongoose.Document {
  title: string;
  tags: [];
  image_path: string;
  description: string;
  detail: string;
  user: mongoose.Types.ObjectId | User;
  createdAt: Date;
  updatedAt: Date;
}

const activitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 60,
    minlength: 3,
  },
  tags: {
    type: [String],
    required: true,
  },
  image_url: {
    type: String,
  },
  description: {
    type: String,
    required: true,
    maxlength: 300,
    minlength: 10,
  },
  detail: {
    type: String,
    minlength: 10,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const Activity = mongoose.model<Activity>("Activity", activitySchema);
