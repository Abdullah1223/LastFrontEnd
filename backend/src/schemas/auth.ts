import { z } from 'zod';

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2),
  role: z.enum(['USER', 'ARTIST', 'JUDGE', 'ADMIN']).optional()
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});