// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "cookies-next";

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
    if (request.masukSebagai === "mahasiswa") {
      const dataMahasiswa = await prisma.mahasiswa.findFirst({
        where: {
          stambuk: request.stambuk,
        },
      });
      return request.nama.toLowerCase() === dataMahasiswa?.nama.toLowerCase() &&
        request.jurusan === dataMahasiswa?.jurusan
        ? res.status(200).json({ message: "Login Berhasil", success: true })
        : res
            .status(400)
            .json({ message: "Akun tidak ditemukan", success: false });
    }
    if (request.masukSebagai === "dosen") {
      const dataDosen = await prisma.dosen.findFirst({
        where: {
          nidn: request.nidn,
        },
      });
      return request.nama.toLowerCase() === dataDosen?.nama.toLowerCase()
        ? res.status(200).json({ message: "Login Berhasil", success: true })
        : res
            .status(400)
            .json({ message: "Akun tidak ditemukan", success: false });
    }
    const dataAdmin = await prisma.admin.findFirst({
      where: {
        nama: request.nama,
      },
    });
    if (request.password === dataAdmin?.password) {
      setCookie("account", "admin");
      res.status(200).json({ message: "Login Berhasil", success: true });
    }
    return request.password === dataAdmin?.password
      ? res.status(200).json({ message: "Login good", success: true })
      : res
          .status(400)
          .json({ message: "username/password salah", success: false });
  } catch (error) {
    res.status(400).json({ message: "Error from server", success: false });
  }
  console.log(request);
}
