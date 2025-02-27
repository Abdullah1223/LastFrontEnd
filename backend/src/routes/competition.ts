import { Router } from 'express';
import { 
  createCompetition,
  getCompetitions,
  getCompetitionById,
  updateCompetition,
  deleteCompetition
} from '../controllers/competition.js';
import { auth } from '../middleware/auth.js';

export const competitionRouter = Router();

competitionRouter.use(auth); // Protect all competition routes

competitionRouter.post('/', createCompetition);
competitionRouter.get('/', getCompetitions);
competitionRouter.get('/:id', getCompetitionById);
competitionRouter.put('/:id', updateCompetition);
competitionRouter.delete('/:id', deleteCompetition);