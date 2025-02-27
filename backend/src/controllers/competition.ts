import { Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';
import { CompetitionSchema } from '../schemas/competition.js';
import { AuthRequest } from '../types/auth.js';

export const createCompetition = async (req: AuthRequest, res: Response) => {
  try {
    const data = CompetitionSchema.parse(req.body);
    
    const competition = await prisma.competition.create({
      data: {
        ...data,
        userId: req.user.id
      }
    });

    res.status(201).json(competition);
  } catch (error) {
    res.status(400).json({ error: 'Invalid competition data' });
  }
};

export const getCompetitions = async (req: Request, res: Response) => {
  try {
    const competitions = await prisma.competition.findMany({
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            handle: true,
            avatar: true
          }
        }
      }
    });

    res.json(competitions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch competitions' });
  }
};

export const getCompetitionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const competition = await prisma.competition.findUnique({
      where: { id },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            handle: true,
            avatar: true
          }
        },
        submissions: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                handle: true,
                avatar: true
              }
            }
          }
        }
      }
    });

    if (!competition) {
      return res.status(404).json({ error: 'Competition not found' });
    }

    res.json(competition);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch competition' });
  }
};

export const updateCompetition = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const data = CompetitionSchema.partial().parse(req.body);
    
    const competition = await prisma.competition.findUnique({
      where: { id }
    });

    if (!competition) {
      return res.status(404).json({ error: 'Competition not found' });
    }

    // Only allow updates by the creator or admin
    if (competition.userId !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const updated = await prisma.competition.update({
      where: { id },
      data
    });

    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: 'Invalid competition data' });
  }
};

export const deleteCompetition = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    
    const competition = await prisma.competition.findUnique({
      where: { id }
    });

    if (!competition) {
      return res.status(404).json({ error: 'Competition not found' });
    }

    // Only allow deletion by the creator or admin
    if (competition.userId !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await prisma.competition.delete({
      where: { id }
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete competition' });
  }
};