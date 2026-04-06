-- CreateTable
CREATE TABLE "newsletters" (
    "id" SERIAL NOT NULL,
    "subject" TEXT NOT NULL,
    "preview_text" TEXT,
    "markdown_content" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "recipient_count" INTEGER NOT NULL DEFAULT 0,
    "sent_at" TIMESTAMP(3),
    "error_message" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "newsletters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "newsletter_delivery_logs" (
    "id" SERIAL NOT NULL,
    "newsletter_id" INTEGER NOT NULL,
    "total_recipients" INTEGER NOT NULL,
    "success_count" INTEGER NOT NULL,
    "fail_count" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "completed_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "newsletter_delivery_logs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "newsletter_delivery_logs" ADD CONSTRAINT "newsletter_delivery_logs_newsletter_id_fkey" FOREIGN KEY ("newsletter_id") REFERENCES "newsletters"("id") ON DELETE CASCADE ON UPDATE CASCADE;
