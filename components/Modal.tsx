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
  filePath: string;
  setModalUrl: Function;
  setError?: Function;
  admin?: boolean;
};

const Modal = ({ filePath, setModalUrl, admin }: Props) => {
  const { download } = useDownloader();
  const handleClose = (e: any) => {
    if (e.currentTarget != e.target) return;
    setModalUrl("");
  };
  const newPath = filePath.replaceAll("\\", "/");
  const fileName = newPath.replace("/files/", "");
  const handleDelete = async () => {
    if (!confirm(`Yakin ingin menghapus ${fileName}`)) return;
    try {
      await axios.delete("/api/deleteFile", { data: { fileName } });
    } catch (e: any) {
      console.log(e.message);
    } finally {
      // router.reload();
      mutate("/api/readfiles");
      setModalUrl("");
    }
  };

  return (
    <div
      onClick={handleClose}
      className="absolute w-full h-full left-0 top-0 flex justify-center p-5 items-center bg-gray-900 bg-opacity-80 backdrop-blur-sm z-50"
    >
      <div
        className={`${
          admin && "md:flex-row md:items-start"
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
                  onClick={() => download(newPath, fileName)}
                >
                  Edit
                  <FiEdit className="text-lg ml-1" />
                </button>
              </>
            )}
            <button
              className="flex flex-1 items-center col-span-2 rounded-md justify-center text-white p-2 px-4 bg-blue-600"
              onClick={() => download(newPath, fileName)}
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
