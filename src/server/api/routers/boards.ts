import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const boardsRouter = createTRPCRouter({
  getAllBoards: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.board.findMany();
  }),

  createBoard: publicProcedure
    .input(z.object({ name: z.string(), ownerId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const board = await ctx.prisma.board.create({
        data: {
          createdAt: new Date(),
          name: input.name,
          ownerId: input.ownerId,
        },
      });
      console.log(board);
      return board.id;
    }),

  updateBoard: publicProcedure
    .input(z.object({ id: z.string(), name: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.board.update({
        where: { id: input.id },
        data: { name: input.name },
      });
    }),
});
