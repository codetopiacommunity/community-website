"use server";

import { prisma } from "../../prisma/prisma";

export async function subscribe(email: string) {
    const existing = await prisma.subscriber.findUnique({
        where: { email },
    });

    if (existing) {
        return { message: "Already subscribed" };
    }

    await prisma.subscriber.create({
        data: { email },
    });

    return { message: "Successfully subscribed!" };
}