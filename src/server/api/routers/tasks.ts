import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const tasksRouter = createTRPCRouter({
  createTask: publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        columnId: z.string().min(1),
        boardId: z.string().min(1),
        subtasks: z.array(z.string()),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const newTask = await ctx.prisma.task.create({
        include: { subtasks: true },
        data: {
          createdAt: new Date(),
          title: input.title,
          description: input.description,
          columnId: input.columnId,
          boardId: input.boardId,
          subtasks: {
            create: [
              ...input.subtasks.map((subtask) => ({
                title: subtask,
                createdAt: new Date(),
              })),
            ],
          },
        },
      });
      return newTask;
    }),

  updateTask: publicProcedure
    .input(z.object({ id: z.string(), title: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.task.update({
        where: { id: input.id },
        data: { title: input.title },
      });
    }),
});
