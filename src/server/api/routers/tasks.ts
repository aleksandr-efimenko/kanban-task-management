import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const tasksRouter = createTRPCRouter({
  createTask: protectedProcedure
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

  updateTask: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        newTitle: z.string(),
        newDescription: z.string(),
        newColumnId: z.string(),
        newStatus: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.task.update({
        where: { id: input.id },
        data: {
          title: input.newTitle,
          description: input.newDescription,
          columnId: input.newColumnId,
        },
      });
    }),

  changeTaskColumn: protectedProcedure
    .input(z.object({ id: z.string(), newColumnId: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.task.update({
        where: { id: input.id },
        data: { columnId: input.newColumnId },
      });
    }),

  deleteTask: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.task.delete({
        where: { id: input.id },
      });
    }),
});
