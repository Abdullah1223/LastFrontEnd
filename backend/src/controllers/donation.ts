import { Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';
import { DonationSchema } from '../schemas/donation.js';
import { AuthRequest } from '../types/auth.js';

export const createDonation = async (req: AuthRequest, res: Response) => {
  try {
    const data = DonationSchema.parse(req.body);
    
    // Check if recipient exists and is an artist
    const recipient = await prisma.user.findUnique({
      where: { id: data.recipientId }
    });

    if (!recipient || recipient.role !== 'ARTIST') {
      return res.status(404).json({ error: 'Invalid recipient' });
    }

    // Create donation
    const donation = await prisma.donation.create({
      data: {
        amount: data.amount,
        message: data.message,
        userId: req.user.id,
        recipientId: data.recipientId
      }
    });

    // Update recipient's total donations received
    await prisma.user.update({
      where: { id: data.recipientId },
      data: {
        totalDonationsReceived: {
          increment: data.amount
        }
      }
    });

    // Update donor's total donations made
    await prisma.user.update({
      where: { id: req.user.id },
      data: {
        totalDonationsMade: {
          increment: data.amount
        }
      }
    });

    res.status(201).json(donation);
  } catch (error) {
    res.status(400).json({ error: 'Invalid donation data' });
  }
};

export const getDonations = async (req: AuthRequest, res: Response) => {
  try {
    const donations = await prisma.donation.findMany({
      where: {
        OR: [
          { userId: req.user.id },
          { recipientId: req.user.id }
        ]
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            handle: true,
            avatar: true
          }
        },
        recipient: {
          select: {
            id: true,
            name: true,
            handle: true,
            avatar: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json(donations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch donations' });
  }
};

export const getDonationById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const donation = await prisma.donation.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            handle: true,
            avatar: true
          }
        },
        recipient: {
          select: {
            id: true,
            name: true,
            handle: true,
            avatar: true
          }
        }
      }
    });

    if (!donation) {
      return res.status(404).json({ error: 'Donation not found' });
    }

    res.json(donation);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch donation' });
  }
};

export const getDonationsByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    
    const donations = await prisma.donation.findMany({
      where: {
        OR: [
          { userId },
          { recipientId: userId }
        ]
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            handle: true,
            avatar: true
          }
        },
        recipient: {
          select: {
            id: true,
            name: true,
            handle: true,
            avatar: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json(donations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch donations' });
  }
};

export const getDonationStats = async (req: AuthRequest, res: Response) => {
  try {
    const [donationsMade, donationsReceived] = await Promise.all([
      prisma.donation.aggregate({
        where: { userId: req.user.id },
        _sum: { amount: true },
        _count: true
      }),
      prisma.donation.aggregate({
        where: { recipientId: req.user.id },
        _sum: { amount: true },
        _count: true
      })
    ]);

    const stats = {
      donationsMade: {
        total: donationsMade._sum.amount || 0,
        count: donationsMade._count
      },
      donationsReceived: {
        total: donationsReceived._sum.amount || 0,
        count: donationsReceived._count
      }
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch donation stats' });
  }
};