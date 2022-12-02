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
  i?: number;
};

const SelectedContent = ({ imgPath, i }: Props) => {
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

  const extention = imgPath.split(".")[1];

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
  if (specialExtention.includes(extention)) {
    return (
      <div
        key={i}
        className="relative flex items-center justify-center p-5 rounded-md min-h-[30vh] bg-gray-200 w-full h-full"
      >
        {extention === "pdf" && (
          <VscFilePdf className="text-gray-500 object-cover w-[70%] rounded-sm text-7xl" />
        )}
        {(extention === "docx" || extention === "doc") && (
          <SiMicrosoftword className="object-cover w-[70%] rounded-sm text-7xl text-blue-700" />
        )}
        {(extention === "pptx" || extention === "ppt") && (
          <SiMicrosoftpowerpoint className="text-red-600 object-cover w-[70%] rounded-sm text-7xl" />
        )}
        {(extention === "xlsx" ||
          extention === "csv" ||
          extention === "xls") && (
          <SiMicrosoftexcel className="text-green-700 object-cover w-[70%] rounded-sm text-7xl" />
        )}
        {extention === "mp4" && (
          <video
            className="object-cover w-full"
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

  return (
    <div key={i} className="relative w-full">
      <Image
        height={680}
        width={680}
        objectFit="cover"
        src={newPath}
        blurDataURL={newPath}
        placeholder="blur"
        className="w-full rounded-md"
        alt={newPath}
      />
    </div>
  );
};

export default SelectedContent;
