// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import busboy from "busboy";
import fs from "fs";
import path from "path";

function getFilesInDirectory() {
  // const dirRelativeToPublicFolder = `files/${req.body.user}`;
  const dirRelativeToPublicFolder = `files`;
  // const dirRelativeToPublicFolder = `files/umum`;

  const dir = path.resolve("./public", dirRelativeToPublicFolder);

  console.log("\nFiles present in directory:");
  //   let files = fs.readdirSync(__dirname);
  let files = fs.readdirSync(dir);
  files.forEach((file) => {
    console.log(file);
  });
}

function deleteFile(req: NextApiRequest, res: NextApiResponse) {
  // const dirRelativeToPublicFolder = `files/${req.body.user}`;
  const dirRelativeToPublicFolder = `files`;
  // const dirRelativeToPublicFolder = `files/umum`;

  const dir = path.resolve("./public", dirRelativeToPublicFolder);
  const fileName = req.body.fileName;
  const filePath = dir + "\\" + fileName;
  try {
    // console.log(filePath);
    // fs.unlinkSync(req.body.filePath.replaceAll("\\\\", "\\"));
    fs.unlinkSync(filePath);
    res.status(200).json({ message: "Data Berhasil Dihapus!" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
  return;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;

  if (method === "DELETE") {
    return deleteFile(req, res);
  }

  return res.status(405).json({ error: `Method ${method} is not allowed` });
}
