import fs from "fs";
import path from "path";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  error?: string;
  data?: string;
  user?: string;
  images?: string[];
};

export default (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const dirRelativeToPublicFolder = `files`;

  const dir = path.resolve("./public", dirRelativeToPublicFolder);

  const filenames = fs.readdirSync(dir);

  const images = filenames.map((name) =>
    path.join("/", dirRelativeToPublicFolder, name)
  );

  res.status(200).json({ images });
};
