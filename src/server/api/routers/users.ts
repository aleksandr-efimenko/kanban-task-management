import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const usersRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany();
  }),

  createUser: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.user.create({
        data: {
          name: input.name,
        },
      });
    }),
});
