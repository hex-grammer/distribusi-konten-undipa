import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  data?: string;
  user?: string;
  images?: string[];
  message?: string;
};

// Setelah inisialisasi PrismaClient, dapatkan nama pengguna dari permintaan
export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const prisma = new PrismaClient();
  const { user } = req.query;

  try {
    // Temukan konten yang mengandung nama pengguna di field akses
    const konten = await prisma.konten.findMany({
      where: {
        akses: {
          contains: `${user}`,
        },
      },
      select: {
        nama_file: true,
        kategori: true,
        created_at: true,
      },
    });

    // Dapatkan nama-nama konten
    const namaKonten = konten.map((k) => k.nama_file);

    // Dapatkan full path ke direktori
    const dir = path.resolve("./public", `files`);
    // Dapatkan full path ke gambar menggunakan nama-nama konten dan full path ke direktori
    const images = namaKonten.map((nama) => path.join("/", `files`, nama));

    // Kirim balik gambar
    res.status(200).json({ images });
  } catch (error) {
    // Kirim balik pesan error jika terjadi masalah
    res.status(400).json({
      message: "Data tidak ditemukan",
    });
  }
};
