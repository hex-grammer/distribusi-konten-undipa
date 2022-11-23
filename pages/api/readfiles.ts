import fs from "fs";
import path from "path";
import getConfig from "next/config";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  error?: string;
  data?: string;
  images?: string[];
};

export default (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const dirRelativeToPublicFolder = "img";

  const dir = path.resolve("./public", dirRelativeToPublicFolder);

  const filenames = fs.readdirSync(dir);

  const images = filenames.map((name) =>
    path.join("/", dirRelativeToPublicFolder, name)
  );

  res.status(200).json({ images });
};
// next.config.js
// module.exports = {
//   serverRuntimeConfig: {
//     PROJECT_ROOT: __dirname,
//   },
// };
