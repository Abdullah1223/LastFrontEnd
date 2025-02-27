import { z } from 'zod';

export const VoteSchema = z.object({
  score: z.number().min(0).max(100),
  comment: z.string().optional(),
  submissionId: z.string()
});