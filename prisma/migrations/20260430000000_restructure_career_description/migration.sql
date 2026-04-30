-- Migration: restructure_career_description
-- Replaces the single `description` TEXT column with proper structured columns.
-- Includes a data migration that parses existing JSON descriptions into the new columns.

-- Step 1: Add new columns (nullable first so existing rows don't fail)
ALTER TABLE "careers"
  ADD COLUMN "about_role"        TEXT NOT NULL DEFAULT '',
  ADD COLUMN "responsibilities"  TEXT[] NOT NULL DEFAULT '{}',
  ADD COLUMN "nice_to_have"      TEXT[] NOT NULL DEFAULT '{}',
  ADD COLUMN "what_we_offer"     TEXT[] NOT NULL DEFAULT '{}',
  ADD COLUMN "how_to_apply"      TEXT NOT NULL DEFAULT '',
  ADD COLUMN "duration"          TEXT;

-- Step 2: Data migration — parse existing JSON descriptions into the new columns.
-- Rows that contain valid JSON with an "aboutRole" key are migrated field by field.
-- Rows with legacy plain text are moved into about_role as-is.
UPDATE "careers"
SET
  "about_role" = CASE
    WHEN description ~ '^\s*\{' AND description::jsonb ? 'aboutRole'
      THEN (description::jsonb ->> 'aboutRole')
    ELSE description
  END,
  "responsibilities" = CASE
    WHEN description ~ '^\s*\{' AND description::jsonb ? 'responsibilities'
      THEN ARRAY(SELECT jsonb_array_elements_text(description::jsonb -> 'responsibilities'))
    ELSE '{}'
  END,
  "nice_to_have" = CASE
    WHEN description ~ '^\s*\{' AND description::jsonb ? 'niceToHave'
      THEN ARRAY(SELECT jsonb_array_elements_text(description::jsonb -> 'niceToHave'))
    ELSE '{}'
  END,
  "what_we_offer" = CASE
    WHEN description ~ '^\s*\{' AND description::jsonb ? 'whatWeOffer'
      THEN ARRAY(SELECT jsonb_array_elements_text(description::jsonb -> 'whatWeOffer'))
    ELSE '{}'
  END,
  "how_to_apply" = CASE
    WHEN description ~ '^\s*\{' AND description::jsonb ? 'howToApply'
      THEN (description::jsonb ->> 'howToApply')
    ELSE ''
  END,
  "duration" = CASE
    WHEN description ~ '^\s*\{' AND description::jsonb ? 'duration'
      THEN NULLIF(description::jsonb ->> 'duration', '')
    ELSE NULL
  END;

-- Step 3: Drop the old description column
ALTER TABLE "careers" DROP COLUMN "description";
