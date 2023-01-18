import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import * as XLSX from 'xlsx';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    res.status(400).json({ message: "Method not Allowed", success: false });
  }
  const prisma = new PrismaClient();
  try {
    const responden = await prisma.responden.findMany();

    // Initializing the data array
    const data = [['ID Responden', 'Jenis Akun', 'Nama', 'Akses', 'Fitur', 'Mudah', 'Tampilan', 'Kekurangan']];
    // Adding the responden data to the array
    responden.forEach((r) => {
        data.push([r.id_responden.toString(), r.jenis_akun, r.nama, r.akses, r.fitur, r.mudah, r.tampilan, r.kekurangan]);
    });
    // Creating a new worksheet
    const ws = XLSX.utils.aoa_to_sheet(data);
    // Creating a new Excel workbook
    const wb = XLSX.utils.book_new();
    // Adding the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Responden');
    // Sending the Excel file to the client
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=responden.xlsx');
    XLSX.write(wb, {type:'buffer', bookType:'xlsx'}).then((buffer:any) => {
      res.end(Buffer.from(buffer), 'binary');
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default handler;
