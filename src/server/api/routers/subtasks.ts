import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const subtasksRouter = createTRPCRouter({
  editSubtask: publicProcedure
    .input(
      z.object({ id: z.string(), title: z.string(), isCompleted: z.boolean() })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.subtask.update({
        where: { id: input.id },
        data: { isCompleted: input.isCompleted },
      });
    }),
});
