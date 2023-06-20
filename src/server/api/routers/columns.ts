import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { generateColor } from "@/utils/generateColor";

export const columnsRouter = createTRPCRouter({
  createColumn: publicProcedure
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
        console.log(e);
        throw new Error("Error creating column");
      }
    }),

  updateColumn: publicProcedure
    .input(z.object({ id: z.string(), name: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.column.update({
        where: { id: input.id },
        data: { name: input.name },
      });
    }),
});
