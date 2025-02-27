import { z } from 'zod';

export const SubmissionSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  mediaUrl: z.string().url(),
  competitionId: z.string()
});