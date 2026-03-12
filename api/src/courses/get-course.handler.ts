import { RequestHandler } from "express";
import { db } from "../common/db";
import { IdSchema } from "../common/zod-schemas";
import { PrismaClient } from "@prisma/client";
import type { Prisma } from "@prisma/client"; // type-only import

const prisma = new PrismaClient();

export const getCourseHandler: RequestHandler = async (req, res, next) => {
  try {
    const courseId = IdSchema.parse(req.params.courseId);
    const data = await getCourseData(courseId);
    return res.json(data);
  } catch (error) {
    next(error);
  }
};

export const getCourseData = async (courseId: number) => {
  const where: Prisma.CourseWhereInput = { id: courseId };

  return db.course.findFirst({
    where,
    select: {
      id: true,
      title: true,
      description: true,
      liveLink: true,
      archived: true,
      modulesOrder: true,
      modules: {
        select: {
          id: true,
          title: true,
          topics: {
            select: {
              id: true,
              title: true,
              videoLink: true,
              assignmentFiles: true,
              resourceFiles: true,
            },
          },
        },
      },
      projectFiles: true,
    },
  });
};
