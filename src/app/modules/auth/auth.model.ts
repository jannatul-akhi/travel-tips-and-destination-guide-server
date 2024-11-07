import { model, Schema } from 'mongoose';
import { TAuth } from './auth.interface';

const authSchema = new Schema<TAuth>({
  user: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
  email: {type: String, required: true},
  password: { type: String, required: true },
});

export const Auth = model('Auth', authSchema);
