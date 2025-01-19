import { Types } from "mongoose";

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: Types.ObjectId;
  roles: Types.ObjectId[];
  createdAt: Date;
}
