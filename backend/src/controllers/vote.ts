import { Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';
import { VoteSchema } from '../schemas/vote.js';
import { AuthRequest } from '../types/auth.js';

export const createVote = async (req: AuthRequest, res: Response) => {
  try {
    const data = VoteSchema.parse(req.body);
    
    // Check if submission exists
    const submission = await prisma.submission.findUnique({
      where: { id: data.submissionId },
      include: { competition: true }
    });

    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    // Check if competition is still accepting votes
    if (submission.competition.status !== 'LIVE') {
      return res.status(400).json({ error: 'Competition is not accepting votes' });
    }

    // Check if user already voted for this submission
    const existingVote = await prisma.vote.findFirst({
      where: {
        submissionId: data.submissionId,
        userId: req.user.id
      }
    });

    if (existingVote) {
      return res.status(400).json({ error: 'You have already voted for this submission' });
    }

    // Create vote
    const vote = await prisma.vote.create({
      data: {
        ...data,
        userId: req.user.id,
        competitionId: submission.competitionId
      }
    });

    // Update submission score
    const votes = await prisma.vote.findMany({
      where: { submissionId: data.submissionId }
    });

    const averageScore = votes.reduce((acc, vote) => acc + vote.score, 0) / votes.length;

    await prisma.submission.update({
      where: { id: data.submissionId },
      data: { score: averageScore }
    });

    res.status(201).json(vote);
  } catch (error) {
    res.status(400).json({ error: 'Invalid vote data' });
  }
};

export const getVotes = async (req: AuthRequest, res: Response) => {
  try {
    const votes = await prisma.vote.findMany({
      where: {
        userId: req.user.id
      },
      include: {
        submission: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                handle: true
              }
            }
          }
        }
      }
    });

    res.json(votes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch votes' });
  }
};

export const getVoteById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const vote = await prisma.vote.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            role: true
          }
        },
        submission: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                handle: true
              }
            }
          }
        }
      }
    });

    if (!vote) {
      return res.status(404).json({ error: 'Vote not found' });
    }

    res.json(vote);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch vote' });
  }
};

export const getVotesBySubmission = async (req: Request, res: Response) => {
  try {
    const { submissionId } = req.params;
    
    const votes = await prisma.vote.findMany({
      where: { submissionId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            role: true
          }
        }
      }
    });

    res.json(votes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch votes' });
  }
};

export const updateVote = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const data = VoteSchema.partial().parse(req.body);
    
    const vote = await prisma.vote.findUnique({
      where: { id },
      include: {
        submission: {
          include: { competition: true }
        }
      }
    });

    if (!vote) {
      return res.status(404).json({ error: 'Vote not found' });
    }

    // Only allow updates by the voter
    if (vote.userId !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    // Only allow updates if competition is still live
    if (vote.submission.competition.status !== 'LIVE') {
      return res.status(400).json({ error: 'Competition is no longer accepting vote changes' });
    }

    const updated = await prisma.vote.update({
      where: { id },
      data
    });

    // Update submission score
    const votes = await prisma.vote.findMany({
      where: { submissionId: vote.submissionId }
    });

    const averageScore = votes.reduce((acc, vote) => acc + vote.score, 0) / votes.length;

    await prisma.submission.update({
      where: { id: vote.submissionId },
      data: { score: averageScore }
    });

    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: 'Invalid vote data' });
  }
};

export const deleteVote = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    
    const vote = await prisma.vote.findUnique({
      where: { id },
      include: {
        submission: {
          include: { competition: true }
        }
      }
    });

    if (!vote) {
      return res.status(404).json({ error: 'Vote not found' });
    }

    // Only allow deletion by the voter or admin
    if (vote.userId !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Not authorized' });
    }

    // Only allow deletion if competition is still live
    if (vote.submission.competition.status !== 'LIVE') {
      return res.status(400).json({ error: 'Competition is no longer accepting vote changes' });
    }

    await prisma.vote.delete({
      where: { id }
    });

    // Update submission score
    const votes = await prisma.vote.findMany({
      where: { submissionId: vote.submissionId }
    });

    const averageScore = votes.length > 0
      ? votes.reduce((acc, vote) => acc + vote.score, 0) / votes.length
      : null;

    await prisma.submission.update({
      where: { id: vote.submissionId },
      data: { score: averageScore }
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete vote' });
  }
};