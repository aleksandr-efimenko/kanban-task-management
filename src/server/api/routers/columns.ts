import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { generateColor } from "@/utils/generateColor";

export const columnsRouter = createTRPCRouter({
  createColumn: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        boardId: z.string().min(1),
      })
    )
    .mutation(async ({ input, ctx }) => {
      console.log(input);
      if (input.boardId.length < 1)
        throw new Error("Board ID must be at least 1 character long");
      try {
        const newColumn = await ctx.prisma.column.create({
          data: {
            createdAt: new Date(),
            name: input.name,
            color: generateColor(),
            boardId: input.boardId,
          },
        });
        return newColumn;
      } catch (e) {
        throw new Error("Error creating column");
      }
    }),

  deleteColumn: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.column.delete({
        where: { id: input.id },
      });
    }),

  updateColumn: protectedProcedure
    .input(z.object({ id: z.string(), name: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.column.update({
        where: { id: input.id },
        data: { name: input.name },
      });
    }),
});
