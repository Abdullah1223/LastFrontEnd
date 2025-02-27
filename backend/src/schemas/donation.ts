import { z } from 'zod';

export const DonationSchema = z.object({
  amount: z.number().positive(),
  message: z.string().optional(),
  recipientId: z.string()
});