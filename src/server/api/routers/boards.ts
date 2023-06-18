import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { Board } from "@prisma/client";

interface MyContext {
  prisma: {
    board: {
      findMany: () => Promise<Board[]>;
    };
  };
}

export const boardsRouter = createTRPCRouter({
  getAllBoards: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.board.findMany();
  }),

  createBoard: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.board.create({
        data: {
          createdAt: new Date(),
          updatedAt: new Date(),
          name: input.name,
          ownerId: "648f097303133e55475e1169",
        },
      });
    }),
});
