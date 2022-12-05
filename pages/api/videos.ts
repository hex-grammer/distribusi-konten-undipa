// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import busboy from "busboy";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

function uploadFile(req: NextApiRequest, res: NextApiResponse) {
  const bb = busboy({ headers: req.headers });

  bb.on("file", (_, file, info) => {
    const fileName = info.filename;
    const filePath = `./public/files/${fileName}`;

    const stream = fs.createWriteStream(filePath);

    file.pipe(stream);
  });

  bb.on("close", () => {
    res.writeHead(200, { Connection: "close" });
    res.end(`That's the end`);
  });

  req.pipe(bb);
  return;
}

function deleteFile(req: NextApiRequest, res: NextApiResponse) {
  const data = req.body;
  try {
    console.log(data);
    // fs.unlinkSync(req.body.filePath);
    res.status(200).json({ message: "Data Berhasil Dihapus!" });
  } catch (error) {
    res.status(400).json({ message: "Data Tidak Berhasil Dihapus!" });
  }
  return;
}

const CHUNK_SIZE_IN_BYTES = 1000000; // 1 mb

function getFile(req: NextApiRequest, res: NextApiResponse) {
  const range = req.headers.range;

  if (!range) {
    return res.status(400).send("Rang must be provided");
  }

  const videoId = req.query.videoId;

  const videoPath = `./videos/${videoId}.mp4`;

  const videoSizeInBytes = fs.statSync(videoPath).size;

  const chunkStart = Number(range.replace(/\D/g, ""));

  const chunkEnd = Math.min(
    chunkStart + CHUNK_SIZE_IN_BYTES,
    videoSizeInBytes - 1
  );

  const contentLength = chunkEnd - chunkStart + 1;

  const headers = {
    "Content-Range": `bytes ${chunkStart}-${chunkEnd}/${videoSizeInBytes}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  res.writeHead(206, headers);
  const videoStream = fs.createReadStream(videoPath, {
    start: chunkStart,
    end: chunkEnd,
  });

  videoStream.pipe(res);
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;

  if (method === "GET") {
    return getFile(req, res);
  }

  if (method === "POST") {
    return uploadFile(req, res);
  }

  if (method === "DELETE") {
    return deleteFile(req, res);
  }

  return res.status(405).json({ error: `Method ${method} is not allowed` });
}
