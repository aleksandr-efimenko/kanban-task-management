import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { generateColor } from "@/utils/generateColor";
import { prisma } from "@/server/db";

export const boardsRouter = createTRPCRouter({
  getAllBoardsForUser: protectedProcedure.query(async ({ ctx }) => {
    console.log(ctx.session?.user?.id);
    const boards = await ctx.prisma.board.findMany({
      where: { ownerId: ctx.session?.user?.id },
      include: {
        columns: { include: { tasks: { include: { subtasks: true } } } },
      },
    });
    return boards;
  }),

  createBoard: publicProcedure
    .input(
      z.object({
        name: z.string(),
        ownerId: z.string(),
        columns: z.array(z.string()),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const newBoard = await ctx.prisma.board.create({
        include: { columns: true },
        data: {
          createdAt: new Date(),
          name: input.name,
          ownerId: input.ownerId,
          columns: {
            create: [
              ...input.columns.map((column) => ({
                name: column,
                color: generateColor(),
                createdAt: new Date(),
                tasks: {
                  create: [],
                },
              })),
            ],
          },
        },
      });
      return newBoard;
    }),

  updateBoard: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      //update board name
      const updatedBoard = await ctx.prisma.board.update({
        where: { id: input.id },
        data: { name: input.name },
        include: {
          columns: { include: { tasks: { include: { subtasks: true } } } },
        },
      });
      console.log(updatedBoard);
      // return updated board
      // const newBoard = await ctx.prisma.board.findFirst({
      //   where: { id: input.id },
      //   include: {
      //     columns: { include: { tasks: { include: { subtasks: true } } } },
      //   },
      // });
      // console.log(newBoard);
      return updatedBoard;
    }),

  deleteBoard: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.board.delete({ where: { id: input.id } });
    }),
});
