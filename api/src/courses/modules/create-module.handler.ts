import { RequestHandler } from "express";
import { z } from "zod";
import { db } from "../../common/db";
import { IdSchema } from "../../common/zod-schemas";
import type { Prisma } from "@prisma/client"; // ✅ type import for transaction

export const createModuleSchema = z.object({
  title: z.string().min(1),
  topics: z
    .array(
      z.object({
        title: z.string().min(1),
        videoLink: z.string().url(),
      })
    )
    .min(1),
});

export const createModuleHandler: RequestHandler = async (req, res, next) => {
  try {
    const data = await createModuleSchema.parseAsync(req.body);
    const courseId = await IdSchema.parseAsync(req.params.courseId);

    const newModule = await db.$transaction(async (tx: Prisma.TransactionClient) => {
      // Create new module
      const moduleRecord = await tx.module.create({
        data: {
          title: data.title,
          courseId: courseId,
          topics: {
            createMany: {
              data: data.topics,
            },
          },
        },
      });

      // Update the module order in course table
      await tx.course.update({
        where: { id: courseId },
        data: {
          modulesOrder: {
            push: moduleRecord.id,
          },
        },
      });

      return moduleRecord;
    });

    return res.json({
      title: newModule.title,
      id: newModule.id,
    });
  } catch (error) {
    next(error);
  }
};
