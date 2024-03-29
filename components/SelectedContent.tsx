import Image from "next/image";
import React from "react";
import { FcFolder } from "react-icons/fc";
import { HiDownload } from "react-icons/hi";
import {
  SiMicrosoftexcel,
  SiMicrosoftpowerpoint,
  SiMicrosoftword,
} from "react-icons/si";
import { VscFilePdf } from "react-icons/vsc";

type Props = {
  imgPath: string;
  i?: number;
};

const SelectedContent = ({ imgPath, i }: Props) => {
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

  const splitedByDot = imgPath.split(".");
  const extension = splitedByDot[splitedByDot.length - 1];

  const specialExtention = [
    "pdf",
    "docx",
    "doc",
    "pptx",
    "ppt",
    "xlsx",
    "csv",
    "xls",
    "mp4",
  ];

  const newPath = imgPath.replaceAll("\\", "/");

  // if not an image
  if (specialExtention.includes(extension)) {
    return (
      <div
        key={i}
        className="relative flex items-center justify-center p-2 rounded-md min-h-[30vh] bg-gray-200 w-full h-full"
      >
        {extension === "pdf" && (
          <VscFilePdf className="text-gray-500 object-cover w-[70%] rounded-sm text-7xl" />
        )}
        {(extension === "docx" || extension === "doc") && (
          <SiMicrosoftword className="object-cover w-[70%] rounded-sm text-7xl text-blue-700" />
        )}
        {(extension === "pptx" || extension === "ppt") && (
          <SiMicrosoftpowerpoint className="text-red-600 object-cover w-[70%] rounded-sm text-7xl" />
        )}
        {(extension === "xlsx" ||
          extension === "csv" ||
          extension === "xls") && (
          <SiMicrosoftexcel className="text-green-700 object-cover w-[70%] rounded-sm text-7xl" />
        )}
        {extension === "mp4" && (
          <video
            className="object-contain w-full max-h-[50vh]"
            controls
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <source src={newPath} type="video/mp4" />
          </video>
        )}
      </div>
    );
  }

  if (extension === undefined) {
    return (
      <div className="relative flex items-center justify-center p-2 rounded-md min-h-[30vh] bg-gray-200 w-full h-full">
        <FcFolder className="text-gray-500 object-cover w-[70%] rounded-sm text-7xl" />
      </div>
    );
  }

  return (
    <div key={i} className="relative w-full">
      <img
        src={newPath}
        placeholder="blur"
        className="w-full rounded-md max-h-[60vh] object-cover"
        alt={newPath}
      />
    </div>
  );
};

export default SelectedContent;
