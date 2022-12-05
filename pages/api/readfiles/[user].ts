import fs from "fs";
import path from "path";
import getConfig from "next/config";
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

type Data = {
  error?: string;
  data?: string;
  user?: string;
  images?: string[];
  message?: string;
};

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const prisma = new PrismaClient();
  const { user } = req.query;
  const dirRelativeToPublicFolder = `files`;
  let konten = [{ nama_file: "", akses: "" }];

  try {
    konten = await prisma.konten.findMany({
      where: {
        akses: {
          contains: `${user}`,
        },
      },
      select: {
        nama_file: true,
        akses: true,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: "Data tidak ditemukan",
    });
  }

  const kontenArr = konten.map((k) => k.nama_file);

  const dir = path.resolve("./public", dirRelativeToPublicFolder);

  const filenames = fs.readdirSync(dir);

  const images = kontenArr.map((name) =>
    path.join("/", dirRelativeToPublicFolder, name)
  );

  //   console.log("user");
  //   console.log(user);
  //   console.log("images");
  //   console.log(images);
  //   console.log("kontenArr");
  //   console.log(kontenArr);

  //   const filteredFiles = images.filter(f=>)

  res.status(200).json({ images });
};
// next.config.js
// module.exports = {
//   serverRuntimeConfig: {
//     PROJECT_ROOT: __dirname,
//   },
// };
