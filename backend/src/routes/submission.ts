import { Router } from 'express';
import { 
  createSubmission,
  getSubmissions,
  getSubmissionById,
  updateSubmission,
  deleteSubmission,
  getSubmissionsByCompetition
} from '../controllers/submission.js';
import { auth } from '../middleware/auth.js';

export const submissionRouter = Router();

submissionRouter.use(auth);

submissionRouter.post('/', createSubmission);
submissionRouter.get('/', getSubmissions);
submissionRouter.get('/:id', getSubmissionById);
submissionRouter.get('/competition/:competitionId', getSubmissionsByCompetition);
submissionRouter.put('/:id', updateSubmission);
submissionRouter.delete('/:id', deleteSubmission);