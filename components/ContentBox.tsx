import Image from "next/image";
import React from "react";
import { HiDownload } from "react-icons/hi";
import {
  SiMicrosoftexcel,
  SiMicrosoftpowerpoint,
  SiMicrosoftword,
} from "react-icons/si";
import { VscFilePdf } from "react-icons/vsc";
import useDownloader from "react-use-downloader";

type Props = {
  imgPath: string;
  setModalUrl: Function;
  i?: number;
};

const ContentBox = ({ imgPath, i, setModalUrl }: Props) => {
  const { download } = useDownloader();

  // handle mouse enter
  const handleMouseEnter = (e: any) => {
    const vid = e.target;
    vid.muted = true;
    vid.play();
  };

  // handle mouse leave
  const handleMouseLeave = (e: any) => {
    const vid = e.target;
    vid.muted = false;
    vid.currentTime = 0;
    vid.pause();
  };

  const handleModalActive = (e: any) => {
    // if (e.currentTarget != e.target) return;
    setModalUrl(imgPath);
  };

  const extension = imgPath.split(".")[1];
  const newPath = imgPath.replaceAll("\\", "/");
  if (extension === "pdf") {
    return (
      <div
        key={i}
        className="relative cursor-pointer flex items-center justify-center p-5 bg-gray-200 w-full h-full"
        onClick={handleModalActive}
      >
        <button
          className="absolute flex items-center justify-center top-0 right-0 text-xl w-6 h-6 text-white p-1 bg-blue-700"
          onClick={() => download(newPath, newPath.replace("/files/", ""))}
        >
          <HiDownload />
        </button>
        <VscFilePdf className="text-gray-500 object-cover w-[70%] rounded-sm text-6xl" />
        <p className="truncate absolute bottom-0 left-0 w-full bg-gray-800 overflow-hidden p-1 text-center bg-opacity-80 text-white">
          {newPath.replace("/files/", "")}
        </p>
      </div>
    );
  }
  if (["docx", "doc"].includes(extension)) {
    return (
      <div
        key={i}
        className="relative cursor-pointer flex items-center justify-center p-5 bg-gray-200 w-full h-full"
        onClick={handleModalActive}
      >
        <button
          className="absolute flex items-center justify-center top-0 right-0 text-xl w-6 h-6 text-white p-1 bg-blue-700"
          onClick={() => download(newPath, newPath.replace("/files/", ""))}
        >
          <HiDownload />
        </button>
        <SiMicrosoftword className="object-cover w-[70%] rounded-sm text-6xl text-blue-700" />
        <p className="truncate absolute bottom-0 left-0 w-full bg-gray-800 overflow-hidden p-1 text-center bg-opacity-80 text-white">
          {newPath.replace("/files/", "")}
        </p>
      </div>
    );
  }
  if (["pptx", "ppt"].includes(extension)) {
    return (
      <div
        onClick={handleModalActive}
        key={i}
        className="relative cursor-pointer flex items-center justify-center p-5 bg-gray-200 w-full h-full"
      >
        <button
          className="absolute flex items-center justify-center top-0 right-0 text-xl w-6 h-6 text-white p-1 bg-blue-700"
          onClick={() => download(newPath, newPath.replace("/files/", ""))}
        >
          <HiDownload />
        </button>
        <SiMicrosoftpowerpoint className="text-red-600 object-cover w-[70%] rounded-sm text-6xl" />
        <p className="truncate absolute bottom-0 left-0 w-full bg-gray-800 overflow-hidden p-1 text-center bg-opacity-80 text-white">
          {newPath.replace("/files/", "")}
        </p>
      </div>
    );
  }
  if (["xlsx", "csv", "xls"].includes(extension)) {
    return (
      <div
        onClick={handleModalActive}
        key={i}
        className="relative cursor-pointer flex items-center justify-center p-5 bg-gray-200 w-full h-full"
      >
        <button
          className="absolute flex items-center justify-center top-0 right-0 text-xl w-6 h-6 text-white p-1 bg-blue-700"
          onClick={() => download(newPath, newPath.replace("/files/", ""))}
        >
          <HiDownload onClick={handleModalActive} />
        </button>
        <SiMicrosoftexcel className="text-green-700 object-cover w-[70%] rounded-sm text-6xl" />
        <p className="truncate absolute bottom-0 left-0 w-full bg-gray-800 overflow-hidden p-1 text-center bg-opacity-80 text-white">
          {newPath.replace("/files/", "")}
        </p>
      </div>
    );
  }
  if (["mp4", "m4v", "MOV"].includes(extension)) {
    return (
      <div
        key={i}
        className="relative flex items-center justify-center bg-gray-200 w-full h-full"
      >
        <button
          className="absolute flex items-center justify-center top-0 right-0 text-xl w-6 h-6 text-white p-1 bg-blue-700"
          onClick={() => download(newPath, newPath.replace("/files/", ""))}
        >
          <HiDownload />
        </button>
        <video
          className="object-cover w-full cursor-pointer"
          controls
          onClick={handleModalActive}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <source src={newPath} type="video/mp4" />
        </video>
        <p className="truncate absolute bottom-0 left-0 w-full bg-gray-800 overflow-hidden p-1 text-center bg-opacity-80 text-white">
          {newPath.replace("/files/", "")}
        </p>
      </div>
    );
  }
  // image || ELSE
  return (
    <div key={i} className="relative w-full">
      <button
        className="absolute flex items-center justify-center top-0 right-0 text-xl w-6 h-6 text-white p-1 bg-blue-700"
        onClick={() => download(newPath, newPath.replace("/files/", ""))}
      >
        <HiDownload />
      </button>
      <img
        onClick={handleModalActive}
        src={newPath}
        placeholder="blur"
        className="w-full object-cover min-h-full rounded-sm cursor-pointer"
        alt={newPath}
      />
      <p className="truncate absolute bottom-0 left-0 w-full bg-gray-800 overflow-hidden p-1 text-center bg-opacity-80 text-white">
        {newPath.replace("/files/", "")}
      </p>
    </div>
  );
};

export default ContentBox;
