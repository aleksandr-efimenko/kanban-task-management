import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { generateColor } from "@/utils/generateColor";

import defaultBoards from "@/data/defaultBoard.json";
export const defaultUser = {
  name: "Guest",
  email: "test@example.com",
  id: "64a01eb855d0203aca08e6a5",
};
export const boardsRouter = createTRPCRouter({
  getAllBoardsForDemoUser: publicProcedure.query(async ({ ctx }) => {
    const boards = await ctx.prisma.board.findMany({
      where: { ownerId: defaultUser.id },
      include: {
        columns: { include: { tasks: { include: { subtasks: true } } } },
      },
    });
    return boards;
  }),

  getAllBoardsForUser: protectedProcedure.query(async ({ ctx }) => {
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

  updateBoard: protectedProcedure
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

  createDefaultBoards: publicProcedure.mutation(async ({ ctx }) => {
    for (const board of defaultBoards.boards) {
      await ctx.prisma.board.create({
        data: {
          createdAt: new Date(),
          name: board.name,
          ownerId: defaultUser.id,
          columns: {
            create: [
              ...board.columns.map((column) => ({
                name: column.name,
                createdAt: new Date(),
                color: column.color || generateColor(),
                tasks: {
                  create: [
                    ...column.tasks.map((task) => ({
                      title: task.title,
                      createdAt: new Date(),
                      description: task.description,
                      subtasks: {
                        create: [
                          ...task.subtasks.map((subtask) => ({
                            title: subtask.title,
                            createdAt: new Date(),
                          })),
                        ],
                      },
                    })),
                  ],
                },
              })),
            ],
          },
        },
      });
    }
    return "success";
  }),
});
