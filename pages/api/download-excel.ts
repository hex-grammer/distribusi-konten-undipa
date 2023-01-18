import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import * as XLSX from 'xlsx';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    res.status(400).json({ message: "Method not Allowed", success: false });
    return;
  }
  const prisma = new PrismaClient();
  try {
    const responden = await prisma.responden.findMany();

    // Initializing the data array
    const data = [['No.','Jenis Akun', 'Nama', 'Akses', 'Fitur', 'Mudah', 'Tampilan', 'Kekurangan']];
    // Adding the responden data to the array
    responden.forEach((r,i) => {
        data.push([(i+1).toString(),r.jenis_akun, r.nama, r.akses, r.fitur, r.mudah, r.tampilan, r.kekurangan]);
    });
    // Creating a new worksheet
    const ws = XLSX.utils.aoa_to_sheet(data);
    // Creating a new Excel workbook
    const wb = XLSX.utils.book_new();
    // Adding the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Responden');
    // Setting the response headers
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=responden.xlsx');
    // Writing the excel file to a buffer
    const buffer = XLSX.write(wb, {type:'buffer', bookType:'xlsx'});
    // Sending the buffer as a response
    res.end(buffer, 'binary');
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default handler;
