import Image from "next/image";
import React, { useState } from "react";
import { HiDownload } from "react-icons/hi";
import {
  SiMicrosoftexcel,
  SiMicrosoftpowerpoint,
  SiMicrosoftword,
} from "react-icons/si";
import { VscFilePdf } from "react-icons/vsc";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { BsFileEarmarkMusic, BsFileEarmarkImage } from "react-icons/bs";
import { FcFolder } from "react-icons/fc";
import { PulseLoader } from "react-spinners";

type Props = {
  path: string;
  date: string;
  setModalUrl: Function;
  index?: number;
};

const ContentBox = (props: Props) => {
  const [loading, setLoading] = useState(false);

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
    // if (e.currentTarget.id != e.target) return;
    props.setModalUrl(props.path);
  };

  async function downloadFile(filename: string) {
    setLoading(true);

    // Send an HTTP GET request to the PHP endpoint with the filename in the query string
    const response = await fetch(
      `https://project-api.xolusi.com/download.php?filename=${filename}`
    );

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`Failed to download file: ${response.statusText}`);
    } else {
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

  const splitedByDot = props.path.split(".");
  const fileName = props.path;
  const fileDate = new Date(props.date).getTime()
  const currDate = new Date().getTime()
  const dateDiff = Math.floor((currDate-fileDate)/(24*3600*1000))
  const filePath = "https://project-api.xolusi.com/public/files/";
  const extension = splitedByDot[splitedByDot.length - 1];
  const extensionMapping: { [extension: string]: React.ReactElement } = {
    pdf: (
      <VscFilePdf className="text-gray-500 object-cover w-[70%] rounded-sm text-6xl" />
    ),
    docx: (
      <SiMicrosoftword className="object-cover w-[70%] rounded-sm text-6xl text-blue-700" />
    ),
    doc: (
      <SiMicrosoftword className="object-cover w-[70%] rounded-sm text-6xl text-blue-700" />
    ),
    pptx: (
      <SiMicrosoftpowerpoint className="text-red-600 object-cover w-[70%] rounded-sm text-6xl" />
    ),
    ppt: (
      <SiMicrosoftpowerpoint className="text-red-600 object-cover w-[70%] rounded-sm text-6xl" />
    ),
    xlsx: (
      <SiMicrosoftexcel className="text-green-600 object-cover w-[70%] rounded-sm text-6xl" />
    ),
    xls: (
      <SiMicrosoftexcel className="text-green-600 object-cover w-[70%] rounded-sm text-6xl" />
    ),
    mp4: (
      <MdOutlineOndemandVideo className="object-cover w-[70%] rounded-sm text-6xl text-orange-600" />
    ),
    mp3: (
      <BsFileEarmarkMusic className="object-cover w-[70%] rounded-sm text-6xl text-purple-600" />
    ),
  };

  if (["jpg", "jpeg", "png", "webp"].includes(extension.toLowerCase())) {
    return (
      <div
        key={props.index}
        className="relative w-full  h-[160px] overflow-hidden shadow-md rounded-sm"
      >
        <button
          className="absolute flex items-center justify-center top-0 right-0 text-xl w-6 h-6 text-white p-1 bg-blue-700"
          // onClick={() => download(filePath, fileName)}
          onClick={(e) => {
            e.stopPropagation();
            downloadFile(fileName).then(() => setLoading(false));
          }}
          id="downloader"
        >
          {loading ? (
            <PulseLoader color="#ffffff" size={3} speedMultiplier={0.5} />
          ) : (
            <HiDownload />
          )}
        </button>
        <img
          onClick={handleModalActive}
          src={filePath + fileName}
          placeholder="blur"
          className="object-cover h-full w-full rounded-sm cursor-pointer"
          alt={fileName}
        />
        <p className="truncate absolute bottom-0 left-0 w-full bg-gray-800 overflow-hidden p-1 text-center bg-opacity-80 text-white">
          {`(${dateDiff})`+fileName}
        </p>
      </div>
    );
  }

  return (
    <div
      key={props.index}
      className="relative cursor-pointer flex items-center justify-center p-5 bg-gray-200 w-full h-[160px] shadow-md rounded-sm"
      onClick={handleModalActive}
    >
      <button
        className="absolute flex items-center justify-center top-0 right-0 text-xl w-6 h-6 text-white p-1 bg-blue-700"
        onClick={(e) => {
          e.stopPropagation();
          downloadFile(fileName).then(() => setLoading(false));
        }}
        id="downloader"
      >
        {loading ? (
          <PulseLoader color="#ffffff" size={3} speedMultiplier={0.5} />
        ) : (
          <HiDownload />
        )}
      </button>
      {extensionMapping[extension.toLowerCase()]}
      <p className="truncate absolute bottom-0 left-0 w-full bg-gray-800 overflow-hidden p-1 text-center bg-opacity-80 text-white">
        {!dateDiff&&'(Baru) '}
        {/* {`(${!dateDiff&&'(Baru)'}) ${fileName}`} */}
        {fileName}
      </p>
    </div>
  );
};

export default ContentBox;
