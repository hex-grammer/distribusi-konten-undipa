import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import excel from 'excel4node';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    res.status(400).json({ message: "Method not Allowed", success: false });
  }
  const prisma = new PrismaClient();
  try {
    const responden = await prisma.responden.findMany();

    // Creating a new Excel workbook
    const workbook = new excel.Workbook();
    // Adding a new worksheet to the workbook
    const worksheet = workbook.addWorksheet('Responden');
    // Defining the headers for the worksheet
    worksheet.cell(1,1).string('ID Responden');
    worksheet.cell(1,2).string('Jenis Akun');
    worksheet.cell(1,3).string('Nama');
    worksheet.cell(1,4).string('Akses');
    worksheet.cell(1,5).string('Fitur');
    worksheet.cell(1,6).string('Mudah');
    worksheet.cell(1,7).string('Tampilan');
    worksheet.cell(1,8).string('Kekurangan');
    // Adding the responden data to the worksheet
    responden.forEach((r, i) => {
        worksheet.cell(i+2,1).number(r.id_responden);
        worksheet.cell(i+2,2).string(r.jenis_akun);
        worksheet.cell(i+2,3).string(r.nama);
        worksheet.cell(i+2,4).string(r.akses);
        worksheet.cell(i+2,5).string(r.fitur);
        worksheet.cell(i+2,6).string(r.mudah);
        worksheet.cell(i+2,7).string(r.tampilan);
        worksheet.cell(i+2,8).string(r.kekurangan);
    });
    // Sending the Excel file to the client
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=responden.xlsx');
    workbook.write('responden.xlsx', res);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default handler;
