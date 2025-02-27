import { Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';
import { SubmissionSchema } from '../schemas/submission.js';
import { AuthRequest } from '../types/auth.js';

export const createSubmission = async (req: AuthRequest, res: Response) => {
  try {
    const data = SubmissionSchema.parse(req.body);
    
    // Check if competition exists and is accepting submissions
    const competition = await prisma.competition.findUnique({
      where: { id: data.competitionId }
    });

    if (!competition) {
      return res.status(404).json({ error: 'Competition not found' });
    }

    if (competition.status !== 'LIVE') {
      return res.status(400).json({ error: 'Competition is not accepting submissions' });
    }

    // Check if user already submitted to this competition
    const existingSubmission = await prisma.submission.findFirst({
      where: {
        competitionId: data.competitionId,
        userId: req.user.id
      }
    });

    if (existingSubmission) {
      return res.status(400).json({ error: 'You have already submitted to this competition' });
    }

    const submission = await prisma.submission.create({
      data: {
        ...data,
        userId: req.user.id
      }
    });

    res.status(201).json(submission);
  } catch (error) {
    res.status(400).json({ error: 'Invalid submission data' });
  }
};

export const getSubmissions = async (req: AuthRequest, res: Response) => {
  try {
    const submissions = await prisma.submission.findMany({
      where: {
        userId: req.user.id
      },
      include: {
        competition: true,
        votes: true
      }
    });

    res.json(submissions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
};

export const getSubmissionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const submission = await prisma.submission.findUnique({
      where: { id },
      include: {
        competition: true,
        user: {
          select: {
            id: true,
            name: true,
            handle: true,
            avatar: true
          }
        },
        votes: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                role: true
              }
            }
          }
        }
      }
    });

    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    res.json(submission);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch submission' });
  }
};

export const getSubmissionsByCompetition = async (req: Request, res: Response) => {
  try {
    const { competitionId } = req.params;
    
    const submissions = await prisma.submission.findMany({
      where: { competitionId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            handle: true,
            avatar: true
          }
        },
        votes: true
      }
    });

    res.json(submissions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
};

export const updateSubmission = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const data = SubmissionSchema.partial().parse(req.body);
    
    const submission = await prisma.submission.findUnique({
      where: { id },
      include: { competition: true }
    });

    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    // Only allow updates by the creator
    if (submission.userId !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    // Only allow updates if competition is still live
    if (submission.competition.status !== 'LIVE') {
      return res.status(400).json({ error: 'Competition is no longer accepting updates' });
    }

    const updated = await prisma.submission.update({
      where: { id },
      data
    });

    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: 'Invalid submission data' });
  }
};

export const deleteSubmission = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    
    const submission = await prisma.submission.findUnique({
      where: { id },
      include: { competition: true }
    });

    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    // Only allow deletion by the creator or admin
    if (submission.userId !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Not authorized' });
    }

    // Only allow deletion if competition is still live
    if (submission.competition.status !== 'LIVE') {
      return res.status(400).json({ error: 'Competition is no longer accepting changes' });
    }

    await prisma.submission.delete({
      where: { id }
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete submission' });
  }
};