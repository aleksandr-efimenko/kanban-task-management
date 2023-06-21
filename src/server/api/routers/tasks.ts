import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const tasksRouter = createTRPCRouter({
  createColumn: publicProcedure
    .input(
      z.object({
        title: z.string(),
        columnId: z.string().min(1),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const newTask = await ctx.prisma.task.create({
        data: {
          createdAt: new Date(),
          title: input.title,
          columnId: input.columnId,
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
