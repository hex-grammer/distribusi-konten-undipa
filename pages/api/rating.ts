import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(400).json({ message: "Method not Allowed", success: false });
  }
  const prisma = new PrismaClient();
  try {
    const { data } = JSON.parse(req.body);
    const result = await prisma.responden.create({
      data: {
        ...data,
      },
    });
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default handler;
