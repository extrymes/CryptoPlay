import { prisma } from "@/lib/prisma";
import { User } from "@/types/User";

export async function createUser(data: {
  username: string;
  email: string;
  password: string;
}): Promise<User> {
  return await prisma.user.create({
    data,
  });
}

export async function getUserByEmail(email: string): Promise<User | null> {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
}

export async function getUserByUsername(
  username: string
): Promise<User | null> {
  return await prisma.user.findUnique({
    where: {
      username,
    },
  });
}

export async function getUserById(id: string): Promise<User | null> {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
}

export async function updateUser(
  id: string,
  data: { string?: string; email?: string; password?: string }
): Promise<User> {
  return await prisma.user.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteUser(id: string): Promise<User> {
  return await prisma.user.delete({
    where: {
      id,
    },
  });
}
