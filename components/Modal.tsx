import React from "react";
import { HiDownload } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import useDownloader from "react-use-downloader";
import ContentBox from "./ContentBox";
import SelectedContent from "./SelectedContent";

type Props = {
  imgPath: string;
  setModalUrl: Function;
};

const Modal = ({ imgPath, setModalUrl }: Props) => {
  const { download } = useDownloader();
  const handleClose = (e: any) => {
    if (e.currentTarget != e.target) return;
    setModalUrl("");
  };
  const newPath = imgPath.replaceAll("\\", "/");
  return (
    <div
      onClick={handleClose}
      className="absolute w-full h-full left-0 top-0 flex justify-center p-5 items-center bg-gray-900 bg-opacity-80 backdrop-blur-sm z-50"
    >
      <div className="relative flex flex-col items-center bg-gray-100 rounded-md">
        <SelectedContent imgPath={newPath} />
        <button className="absolute flex items-center justify-center top-2 right-2 text-xl w-7 h-7 text-white p-0.5 rounded-full bg-gray-800 bg-opacity-70">
          <IoMdClose onClick={handleClose} />
        </button>
        <div className="flex justify-between items-center p-4 w-full gap-2">
          <p>{newPath.replace("/img/", "")}</p>
          <button
            className="flex items-center rounded-md justify-center text-white p-2 px-4 bg-blue-700  "
            onClick={() => download(newPath, newPath.replace("/img/", ""))}
          >
            Download
            <HiDownload className="text-lg ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
