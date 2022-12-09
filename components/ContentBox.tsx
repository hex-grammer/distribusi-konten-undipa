import Image from "next/image";
import React from "react";
import { HiDownload } from "react-icons/hi";
import {
  SiMicrosoftexcel,
  SiMicrosoftpowerpoint,
  SiMicrosoftword,
} from "react-icons/si";
import { VscFilePdf } from "react-icons/vsc";
import { FcFolder } from "react-icons/fc";
import useDownloader from "react-use-downloader";

type Props = {
  path: string;
  setModalUrl: Function;
  index?: number;
};

const ContentBox = (props: Props) => {
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
    props.setModalUrl(props.path);
  };

  const extension = props.path.split(".")[1];
  const filePath = props.path.replaceAll("\\", "/");
  const fileName = filePath.replace("/files/", "");
  if (extension === "pdf") {
    return (
      <div
        key={props.index}
        className="relative cursor-pointer flex items-center justify-center p-5 bg-gray-200 w-full h-[160px]"
        onClick={handleModalActive}
      >
        <button
          className="absolute flex items-center justify-center top-0 right-0 text-xl w-6 h-6 text-white p-1 bg-blue-700"
          onClick={() => download(filePath, fileName)}
        >
          <HiDownload />
        </button>
        <VscFilePdf className="text-gray-500 object-cover w-[70%] rounded-sm text-6xl" />
        <p className="truncate absolute bottom-0 left-0 w-full bg-gray-800 overflow-hidden p-1 text-center bg-opacity-80 text-white">
          {fileName}
        </p>
      </div>
    );
  }
  if (["docx", "doc"].includes(extension)) {
    return (
      <div
        key={props.index}
        className="relative cursor-pointer flex items-center justify-center p-5 bg-gray-200 w-full  h-[160px]"
        onClick={handleModalActive}
      >
        <button
          className="absolute flex items-center justify-center top-0 right-0 text-xl w-6 h-6 text-white p-1 bg-blue-700"
          onClick={() => download(filePath, fileName)}
        >
          <HiDownload />
        </button>
        <SiMicrosoftword className="object-cover w-[70%] rounded-sm text-6xl text-blue-700" />
        <p className="truncate absolute bottom-0 left-0 w-full bg-gray-800 overflow-hidden p-1 text-center bg-opacity-80 text-white">
          {fileName}
        </p>
      </div>
    );
  }
  if (["pptx", "ppt"].includes(extension)) {
    return (
      <div
        onClick={handleModalActive}
        key={props.index}
        className=" h-[160px] relative cursor-pointer flex items-center justify-center p-5 bg-gray-200 w-full"
      >
        <button
          className="absolute flex items-center justify-center top-0 right-0 text-xl w-6 h-6 text-white p-1 bg-blue-700"
          onClick={() => download(filePath, fileName)}
        >
          <HiDownload />
        </button>
        <SiMicrosoftpowerpoint className="text-red-600 object-cover w-[70%] rounded-sm text-6xl" />
        <p className="truncate absolute bottom-0 left-0 w-full bg-gray-800 overflow-hidden p-1 text-center bg-opacity-80 text-white">
          {fileName}
        </p>
      </div>
    );
  }
  if (["xlsx", "csv", "xls"].includes(extension)) {
    return (
      <div
        onClick={handleModalActive}
        key={props.index}
        className="h-[160px] relative cursor-pointer flex items-center justify-center p-5 bg-gray-200 w-full"
      >
        <button
          className="absolute flex items-center justify-center top-0 right-0 text-xl w-6 h-6 text-white p-1 bg-blue-700"
          onClick={() => download(filePath, fileName)}
        >
          <HiDownload onClick={handleModalActive} />
        </button>
        <SiMicrosoftexcel className="text-green-700 object-cover w-[70%] rounded-sm text-6xl" />
        <p className="truncate absolute bottom-0 left-0 w-full bg-gray-800 overflow-hidden p-1 text-center bg-opacity-80 text-white">
          {fileName}
        </p>
      </div>
    );
  }
  if (["mp4", "m4v", "MOV"].includes(extension)) {
    return (
      <div
        key={props.index}
        className="h-[160px] relative flex items-center justify-center bg-gray-200 w-full"
      >
        <button
          className="absolute flex items-center justify-center top-0 right-0 text-xl w-6 h-6 text-white p-1 bg-blue-700"
          onClick={() => download(filePath, fileName)}
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
          <source src={filePath} type="video/mp4" />
        </video>
        <p className="truncate absolute bottom-0 left-0 w-full bg-gray-800 overflow-hidden p-1 text-center bg-opacity-80 text-white">
          {fileName}
        </p>
      </div>
    );
  }
  if (extension === undefined) {
    return (
      <div
        onClick={handleModalActive}
        key={props.index}
        className="h-fit relative cursor-pointer flex items-center justify-center p-5 bg-gray-200 w-full"
      >
        <button
          className="absolute flex items-center justify-center top-0 right-0 text-xl w-6 h-6 text-white p-1 bg-blue-700"
          onClick={() => download(filePath, fileName)}
        >
          <HiDownload onClick={handleModalActive} />
        </button>
        <FcFolder className="text-green-700 object-cover w-[70%] rounded-sm text-6xl" />
        <p className="truncate absolute bottom-0 left-0 w-full bg-gray-800 overflow-hidden p-1 text-center bg-opacity-80 text-white">
          {fileName}
        </p>
      </div>
    );
  }
  // image || ELSE
  return (
    <div key={props.index} className="relative w-full  h-[160px]">
      <button
        className="absolute flex items-center justify-center top-0 right-0 text-xl w-6 h-6 text-white p-1 bg-blue-700"
        onClick={() => download(filePath, fileName)}
      >
        <HiDownload />
      </button>
      <img
        onClick={handleModalActive}
        src={filePath}
        placeholder="blur"
        className="object-cover h-full rounded-sm cursor-pointer"
        alt={filePath}
      />
      <p className="truncate absolute bottom-0 left-0 w-full bg-gray-800 overflow-hidden p-1 text-center bg-opacity-80 text-white">
        {fileName}
      </p>
    </div>
  );
};

export default ContentBox;
