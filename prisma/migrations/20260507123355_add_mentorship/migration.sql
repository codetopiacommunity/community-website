-- CreateTable
CREATE TABLE "mentorships" (
    "id" SERIAL NOT NULL,
    "slug" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "is_online" BOOLEAN NOT NULL DEFAULT true,
    "location" TEXT,
    "capacity" INTEGER,
    "application_link" TEXT,
    "image_url" TEXT,
    "tags" TEXT[],
    "status" TEXT NOT NULL DEFAULT 'open',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mentorships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MentorshipToTeamMember" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_MentorshipToTeamMember_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "mentorships_slug_key" ON "mentorships"("slug");

-- CreateIndex
CREATE INDEX "_MentorshipToTeamMember_B_index" ON "_MentorshipToTeamMember"("B");

-- AddForeignKey
ALTER TABLE "_MentorshipToTeamMember" ADD CONSTRAINT "_MentorshipToTeamMember_A_fkey" FOREIGN KEY ("A") REFERENCES "mentorships"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MentorshipToTeamMember" ADD CONSTRAINT "_MentorshipToTeamMember_B_fkey" FOREIGN KEY ("B") REFERENCES "team_members"("id") ON DELETE CASCADE ON UPDATE CASCADE;
