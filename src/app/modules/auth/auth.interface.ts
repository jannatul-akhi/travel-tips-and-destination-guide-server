import { Types } from 'mongoose';

export type TAuth = {
  user: Types.ObjectId;
  email: string;
  password: string;
};
