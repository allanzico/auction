import {Prisma, PrismaClient } from '@prisma/client'



const prismaClientSingleton = () => {
  return new PrismaClient(
    {
      log: process.env.NODE_ENV === 'development' ? [ 'error', 'warn'] : ['error'],
    }
  ).$extends({
    name: 'findManyAndCount',
    model: {
      $allModels: {
        findManyAndCount<Model, Args>(
          this: Model,
          args: Prisma.Exact<Args, Prisma.Args<Model, 'findMany'>>
        ): Promise<[Prisma.Result<Model, Args, 'findMany'>, number]> {
          return prisma.$transaction([
            (this as any).findMany(args),
            (this as any).count({ where: (args as any).where })
          ]) as any;
        }
      }
    }
  });
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma