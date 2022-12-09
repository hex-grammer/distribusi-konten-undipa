// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  success: boolean;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    res.status(400).json({ message: "Method not Allowed", success: false });
  }
  const prisma = new PrismaClient();
  const request = JSON.parse(req.body);
  try {
    const dataAdmin = await prisma.admin.findFirst({
      where: {
        nama: request.nama,
      },
    });
    return res
      .status(400)
      .json({ message: "username/password salah", success: false });
  } catch (error) {
    res.status(500).json({ message: "Error from server", success: false });
  }
  console.log(request);
}
