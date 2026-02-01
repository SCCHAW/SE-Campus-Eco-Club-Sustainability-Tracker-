-- Migration: Add event_time, agenda, and requirements columns to events table

-- Add event_time column
ALTER TABLE events ADD COLUMN event_time TEXT;

-- Add agenda column
ALTER TABLE events ADD COLUMN agenda TEXT;

-- Add requirements column
ALTER TABLE events ADD COLUMN requirements TEXT;
