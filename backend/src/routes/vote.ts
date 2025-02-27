import { Router } from 'express';
import { 
  createVote,
  getVotes,
  getVoteById,
  updateVote,
  deleteVote,
  getVotesBySubmission
} from '../controllers/vote.js';
import { auth } from '../middleware/auth.js';

export const voteRouter = Router();

voteRouter.use(auth);

voteRouter.post('/', createVote);
voteRouter.get('/', getVotes);
voteRouter.get('/:id', getVoteById);
voteRouter.get('/submission/:submissionId', getVotesBySubmission);
voteRouter.put('/:id', updateVote);
voteRouter.delete('/:id', deleteVote);