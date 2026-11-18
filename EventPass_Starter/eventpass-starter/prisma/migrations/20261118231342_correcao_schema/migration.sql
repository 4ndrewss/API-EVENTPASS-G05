/*
  Warnings:

  - A unique constraint covering the columns `[attendeeId,sessionId]` on the table `Registration` will be added. If there are existing duplicate values, this will fail.
  - Made the column `capacity` on table `Session` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "capacity" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Registration_attendeeId_sessionId_key" ON "Registration"("attendeeId", "sessionId");
