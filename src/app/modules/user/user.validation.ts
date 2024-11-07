import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must not exceed 50 characters'),
    email: z.string().email('Invalid email format'),
    role: z.enum(['user', 'admin']).optional().default('user'),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .optional(),
    phone: z.string().min(7, 'Phone number must be at least 7 digits'),
    address: z.string().min(5, 'Address must be at least 5 characters'),
    isDeleted: z.boolean().optional(),
  }),
});

export const UserValidations = {
  createUserValidationSchema,
};
