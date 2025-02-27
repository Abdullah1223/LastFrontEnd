import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { authRouter } from './routes/auth.js';
import { competitionRouter } from './routes/competition.js';
import { submissionRouter } from './routes/submission.js';
import { voteRouter } from './routes/vote.js';
import { donationRouter } from './routes/donation.js';
import { errorHandler } from './middleware/error.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/competitions', competitionRouter);
app.use('/api/submissions', submissionRouter);
app.use('/api/votes', voteRouter);
app.use('/api/donations', donationRouter);

// Error handling
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});