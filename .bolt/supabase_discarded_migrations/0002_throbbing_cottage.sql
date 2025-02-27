/*
  # Add donation tracking and recipient relationship

  1. Changes
    - Add donation tracking fields to User table
    - Add recipient relationship to Donation table
    - Enable RLS and set up security policies

  2. Security
    - Enable RLS on Donation table
    - Add policies for viewing and creating donations
*/

-- Add donation tracking fields to User table
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'User' AND column_name = 'totalDonationsMade'
  ) THEN
    ALTER TABLE "User" ADD COLUMN "totalDonationsMade" DOUBLE PRECISION NOT NULL DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'User' AND column_name = 'totalDonationsReceived'
  ) THEN
    ALTER TABLE "User" ADD COLUMN "totalDonationsReceived" DOUBLE PRECISION NOT NULL DEFAULT 0;
  END IF;
END $$;

-- Add recipient field to Donation table
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'Donation' AND column_name = 'recipientId'
  ) THEN
    ALTER TABLE "Donation" ADD COLUMN "recipientId" TEXT NOT NULL;
    ALTER TABLE "Donation" ADD CONSTRAINT "Donation_recipientId_fkey" 
      FOREIGN KEY ("recipientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
  END IF;
END $$;

-- Enable RLS
ALTER TABLE "Donation" ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own donations"
  ON "Donation"
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = "userId" OR 
    auth.uid() = "recipientId"
  );

CREATE POLICY "Users can create donations"
  ON "Donation"
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = "userId"
  );