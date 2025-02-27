import { z } from 'zod';

export const CompetitionSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  prize: z.number().positive(),
  entryFee: z.number().positive().optional(),
  genre: z.string(),
  status: z.enum(['DRAFT', 'UPCOMING', 'LIVE', 'COMPLETED', 'CANCELLED']),
  startDate: z.string().datetime(),
  endDate: z.string().datetime()
});