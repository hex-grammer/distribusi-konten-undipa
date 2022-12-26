import React from "react";
import { HiDownload } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import useDownloader from "react-use-downloader";
import SelectedContent from "./SelectedContent";
import axios from "axios";
import { mutate } from "swr";

type Props = {
  path: string;
  setModalUrl: Function;
  setError?: Function;
  mutateEndPoint: string;
  admin?: boolean;
};

async function downloadFile(filename: string) {
  // Send an HTTP GET request to the PHP endpoint with the filename in the query string
  const response = await fetch(
    `https://project-api.xolusi.com/download.php?filename=${filename}`
  );

  // Check if the response is successful
  if (!response.ok) {
    throw new Error(`Failed to download file: ${response.statusText}`);
  }

  // Get the file data from the response
  const fileBlob = await response.blob();

  // Create a blob URL for the file
  const fileUrl = URL.createObjectURL(fileBlob);

  // Create an anchor element
  const a = document.createElement("a");

  // Set the href attribute of the anchor element to the blob URL
  a.href = fileUrl;

  // Set the download attribute of the anchor element to the file name
  a.download = filename;

  // Trigger the download by simulating a click on the anchor element
  a.click();

  // Revoke the blob URL to release the memory
  URL.revokeObjectURL(fileUrl);
}

const Modal = ({ path, setModalUrl, admin, mutateEndPoint }: Props) => {
  const { download } = useDownloader();
  const handleClose = (e: any) => {
    if (e.currentTarget != e.target) return;
    setModalUrl("");
  };
  const fileName = path;
  const filePath = "https://project-api.xolusi.com/public/files/";
  const newPath = filePath + fileName;

  async function deleteFile(fileName: string, filePath: string) {
    try {
      const response = await fetch(
        "https://project-api.xolusi.com/deleteFile.php",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fileName, filePath }),
        }
      );
      const data = await response.json();
      // console.log(data);
      setModalUrl("");
      mutate("https://project-api.xolusi.com/readfilesAdmin.php");
    } catch (error) {
      console.error(error);
    }
  }

  const handleDelete = async () => {
    if (!confirm(`Yakin ingin menghapus ${fileName}`)) return;
    deleteFile(fileName, newPath);
  };

  return (
    <div
      onClick={handleClose}
      className="absolute w-full h-full left-0 top-0 flex justify-center p-5 items-center bg-gray-900 bg-opacity-80 backdrop-blur-sm z-50"
    >
      <div
        className={`${
          admin && "md:flex-row md:items-start md:min-w-[580px]"
        } relative flex flex-col items-center bg-gray-100 rounded-md max-w-[80%]`}
      >
        <SelectedContent imgPath={newPath} />
        <button
          onClick={() => setModalUrl("")}
          className="absolute flex items-center justify-center top-2 right-2 text-xl w-5 h-5 text-white p-0.5 rounded-full bg-gray-800 bg-opacity-70"
        >
          <IoMdClose />
        </button>
        <div className="w-full">
          <div className="flex justify-between items-center p-4 w-full gap-2">
            <p>{fileName}</p>
          </div>
          <div className="grid grid-cols-2 w-full p-4 pt-0 gap-2">
            {admin && (
              <>
                <button
                  className="flex flex-1 items-center rounded-md justify-center text-white p-2 px-4 bg-red-600"
                  onClick={handleDelete}
                >
                  Delete
                  <RiDeleteBin5Line className="text-lg ml-1" />
                </button>
                <button
                  className="flex flex-1 items-center rounded-md justify-center text-white p-2 px-4 bg-orange-400"
                  onClick={() => console.log("edit")}
                >
                  Edit
                  <FiEdit className="text-lg ml-1" />
                </button>
              </>
            )}
            <button
              className="flex flex-1 items-center col-span-2 rounded-md justify-center text-white p-2 px-4 bg-blue-600"
              // onClick={() => download(newPath, fileName)}
              onClick={() => downloadFile(fileName)}
            >
              Download
              <HiDownload className="text-lg ml-1" />
              {/* Rename
            <FiEdit className="text-lg ml-1" /> */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
