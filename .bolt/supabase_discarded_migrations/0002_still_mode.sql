/*
  # Add voting system

  1. New Tables
    - Vote table for storing user votes on submissions
      - id (uuid, primary key)
      - score (float, required)
      - comment (text, optional)
      - created_at (timestamp)
      - user_id (references users)
      - submission_id (references submissions)
      - competition_id (references competitions)

  2. Changes
    - Add score field to Submission table for average vote score
    - Add vote count field to Submission table

  3. Security
    - Enable RLS on Vote table
    - Add policies for vote creation and viewing
*/

-- Add score and vote count to Submission table
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'Submission' AND column_name = 'score'
  ) THEN
    ALTER TABLE "Submission" ADD COLUMN "score" DOUBLE PRECISION;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'Submission' AND column_name = 'voteCount'
  ) THEN
    ALTER TABLE "Submission" ADD COLUMN "voteCount" INTEGER NOT NULL DEFAULT 0;
  END IF;
END $$;

-- Create Vote table
CREATE TABLE IF NOT EXISTS "Vote" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "score" DOUBLE PRECISION NOT NULL CHECK (score >= 0 AND score <= 100),
  "comment" TEXT,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "user_id" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "submission_id" TEXT NOT NULL REFERENCES "Submission"("id") ON DELETE CASCADE,
  "competition_id" TEXT NOT NULL REFERENCES "Competition"("id") ON DELETE CASCADE
);

-- Enable RLS
ALTER TABLE "Vote" ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view votes"
  ON "Vote"
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create votes"
  ON "Vote"
  FOR INSERT
  TO authenticated
  WITH CHECK (
    -- Check if user is allowed to vote (not their own submission)
    auth.uid() != (
      SELECT "userId" 
      FROM "Submission" 
      WHERE id = submission_id
    )
  );

-- Create unique constraint to prevent multiple votes
CREATE UNIQUE INDEX IF NOT EXISTS "unique_user_submission_vote" 
  ON "Vote"("user_id", "submission_id");

-- Create function to update submission score
CREATE OR REPLACE FUNCTION update_submission_score()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- Increment vote count and update average score
    UPDATE "Submission"
    SET 
      "voteCount" = "voteCount" + 1,
      "score" = (
        SELECT AVG(score)
        FROM "Vote"
        WHERE submission_id = NEW.submission_id
      )
    WHERE id = NEW.submission_id;
  ELSIF TG_OP = 'DELETE' THEN
    -- Decrement vote count and update average score
    UPDATE "Submission"
    SET 
      "voteCount" = "voteCount" - 1,
      "score" = (
        SELECT AVG(score)
        FROM "Vote"
        WHERE submission_id = OLD.submission_id
      )
    WHERE id = OLD.submission_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to update submission score
CREATE TRIGGER vote_after_insert
  AFTER INSERT ON "Vote"
  FOR EACH ROW
  EXECUTE FUNCTION update_submission_score();

CREATE TRIGGER vote_after_delete
  AFTER DELETE ON "Vote"
  FOR EACH ROW
  EXECUTE FUNCTION update_submission_score();