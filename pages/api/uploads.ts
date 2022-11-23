import nextConnect from "next-connect";
import multer from "multer";
import type { NextApiRequest, NextApiResponse } from "next";

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.originalname + "-" + uniqueSuffix);
    },
  }),
});

type Data = {
  error?: string;
  data?: string;
};

const apiRoute = nextConnect({
  onError(error, req: NextApiRequest, res: NextApiResponse<Data>) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req: NextApiRequest, res: NextApiResponse<Data>) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.array("theFiles"));

apiRoute.post((req: NextApiRequest, res: NextApiResponse<Data>) => {
  console.log(req.body());
  res.status(200).json({ data: "success" });
});

export default apiRoute;

export const config = {
  api: {
    // bodyParser: false, // Disallow body parsing, consume as stream
  },
};
