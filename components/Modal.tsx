import React, { useState } from "react";
import { HiDownload } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import useDownloader from "react-use-downloader";
import SelectedContent from "./SelectedContent";
import axios from "axios";
import { mutate } from "swr";
import PulseLoader from "react-spinners/PulseLoader";

type Props = {
  path: string;
  setModalUrl: Function;
  setError?: Function;
  mutateEndPoint: string;
  admin?: boolean;
};

const Modal = ({ path, setModalUrl, admin, mutateEndPoint }: Props) => {
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const handleClose = (e: any) => {
    if (e.currentTarget != e.target) return;
    setModalUrl("");
  };
  const fileName = path;
  const filePath = "https://project-api.xolusi.com/public/files/";
  const newPath = filePath + fileName;

  async function downloadFile(filename: string) {
    setLoading(true);
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
      mutate(mutateEndPoint);
    } catch (error) {
      console.error(error);
    }
  }

  const handleDelete = async () => {
    if (!confirm(`Yakin ingin menghapus ${fileName}`)) return;
    setLoadingDelete(true);
    deleteFile(fileName, newPath).then(() => setLoadingDelete(false));
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
          <div className="grid w-full p-4 pt-0 gap-2">
            {/* Download Button */}
            <button
              className={`flex flex-1 items-center rounded-md justify-center text-white p-2 px-4 ${
                loading ? "bg-gray-300" : "bg-blue-600"
              }`}
              onClick={() =>
                downloadFile(fileName).then(() => setLoading(false))
              }
              disabled={loading}
            >
              {loading ? (
                <PulseLoader
                  color="#ffffff"
                  size={8}
                  cssOverride={{ padding: "4px 0px" }}
                  speedMultiplier={0.7}
                />
              ) : (
                <>
                  Download
                  <HiDownload className="text-lg ml-1" />
                </>
              )}
            </button>
            {admin && (
              <>
                <button
                  className={`flex flex-1 items-center rounded-md justify-center text-white p-2 px-4 ${
                    loading ? "bg-gray-300" : "bg-red-600"
                  }`}
                  onClick={handleDelete}
                  disabled={loadingDelete}
                >
                  {loadingDelete ? (
                    <PulseLoader
                      color="#ffffff"
                      size={8}
                      cssOverride={{ padding: "4px 0px" }}
                      speedMultiplier={0.7}
                    />
                  ) : (
                    <>
                      Hapus
                      <RiDeleteBin5Line className="text-lg ml-1" />
                    </>
                  )}
                </button>
                {/* Edit Button */}
                {/* <button
                  className="flex flex-1 items-center rounded-md justify-center text-white p-2 px-4 bg-orange-400"
                  onClick={() => console.log("edit")}
                  disabled={loading}
                >
                  {loading ? (
                    <PulseLoader
                      color="#ffffff"
                      size={8}
                      cssOverride={{ padding: "4px 0px" }}
                      speedMultiplier={0.7}
                    />
                  ) : (
                    <>
                      Edit
                      <FiEdit className="text-lg ml-1" />
                    </>
                  )}
                </button> */}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
