import { NextApiRequest, NextApiResponse } from "next";
type Data = {
  success: boolean;
  message?: string;
  data?: {
    nidn: string;
    nmdos: string;
  }[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;
  if (method !== "GET") {
    res.status(400).json({ message: "Method not Allowed", success: false });
  }
  try {
    const response = await fetch(
      "https://testing.undipa.ac.id/allmahasiswa.php?api=071994"
    );
    const data = await response.json();
    res.status(200).json({ data, success: true });
  } catch (error) {
    res.status(500).json({ message: "Error from server", success: false });
  }
}
