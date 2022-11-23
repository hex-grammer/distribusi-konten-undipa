import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import useSWR from "swr";
import { HiDownload } from "react-icons/hi";
import { VscFilePdf } from "react-icons/vsc";
import {
  SiMicrosoftexcel,
  SiMicrosoftword,
  SiMicrosoftpowerpoint,
} from "react-icons/si";
import { UiFileInputButton } from "../components/UiFileInputButton";
import useDownloader from "react-use-downloader";

export default function Home() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data } = useSWR("/api/readfiles", fetcher);
  const onChange = async (formData: FormData) => {
    console.log(formData.forEach((item) => console.log(item)));
    // console.log(formData.forEach((item) => console.log(item)));
    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: (event: any) => {
        console.log(
          `Current progress:`,
          Math.round((event.loaded * 100) / event.total)
        );
      },
    };

    const response = await axios.post("/api/uploads", formData, config);

    console.log("response", response.data);
  };

  const { size, elapsed, percentage, download, cancel, error, isInProgress } =
    useDownloader();

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

  return (
    <div className="flex flex-col bg-gray-700 h-screen md:px-[18%] overflow-hidden">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex items-center text-white justify-between px-4 py-2">
        <h1 className="text-xl font-semibold">
          Distribusi Konten Digital <br />
          Universitas Dipa Makassar
        </h1>
        <Link href="/login">Login</Link>
      </div>
      <div className="grid md:grid-cols-5 py-5 grid-cols-3 w-full gap-2 h-fit overflow-y-auto">
        {!data && "Loading..."}
        {data &&
          data.images.map((imgPath: string, i: number) => {
            const extension = imgPath.split(".")[1];
            if (extension === "pdf") {
              return (
                <div
                  key={i}
                  className="relative flex items-center justify-center p-5 bg-gray-200 w-full h-full"
                >
                  <button
                    className="absolute flex items-center justify-center top-0 right-0 text-xl w-6 h-6 text-white p-1 bg-blue-700"
                    onClick={() =>
                      download(imgPath, imgPath.replace("\\img\\", ""))
                    }
                  >
                    <HiDownload />
                  </button>
                  <VscFilePdf className="text-gray-500 object-cover w-[70%] rounded-sm text-6xl" />
                  <p className="truncate absolute bottom-0 left-0 w-full bg-gray-800 overflow-hidden p-1 text-center bg-opacity-80 text-white">
                    {imgPath.replace("\\img\\", "")}
                  </p>
                </div>
              );
            }
            if (extension === "docx" || extension === "doc") {
              return (
                <div
                  key={i}
                  className="relative flex items-center justify-center p-5 bg-gray-200 w-full h-full"
                >
                  <button
                    className="absolute flex items-center justify-center top-0 right-0 text-xl w-6 h-6 text-white p-1 bg-blue-700"
                    onClick={() =>
                      download(imgPath, imgPath.replace("\\img\\", ""))
                    }
                  >
                    <HiDownload />
                  </button>
                  <SiMicrosoftword className="object-cover w-[70%] rounded-sm text-6xl text-blue-700" />
                  <p className="truncate absolute bottom-0 left-0 w-full bg-gray-800 overflow-hidden p-1 text-center bg-opacity-80 text-white">
                    {imgPath.replace("\\img\\", "")}
                  </p>
                </div>
              );
            }
            if (extension === "pptx" || extension === "ppt") {
              return (
                <div
                  key={i}
                  className="relative flex items-center justify-center p-5 bg-gray-200 w-full h-full"
                >
                  <button
                    className="absolute flex items-center justify-center top-0 right-0 text-xl w-6 h-6 text-white p-1 bg-blue-700"
                    onClick={() =>
                      download(imgPath, imgPath.replace("\\img\\", ""))
                    }
                  >
                    <HiDownload />
                  </button>
                  <SiMicrosoftpowerpoint className="text-red-600 object-cover w-[70%] rounded-sm text-6xl" />
                  <p className="truncate absolute bottom-0 left-0 w-full bg-gray-800 overflow-hidden p-1 text-center bg-opacity-80 text-white">
                    {imgPath.replace("\\img\\", "")}
                  </p>
                </div>
              );
            }
            if (
              extension === "xlsx" ||
              extension === "csv" ||
              extension === "xls"
            ) {
              return (
                <div
                  key={i}
                  className="relative flex items-center justify-center p-5 bg-gray-200 w-full h-full"
                >
                  <button
                    className="absolute flex items-center justify-center top-0 right-0 text-xl w-6 h-6 text-white p-1 bg-blue-700"
                    onClick={() =>
                      download(imgPath, imgPath.replace("\\img\\", ""))
                    }
                  >
                    <HiDownload />
                  </button>
                  <SiMicrosoftexcel className="text-green-700 object-cover w-[70%] rounded-sm text-6xl" />
                  <p className="truncate absolute bottom-0 left-0 w-full bg-gray-800 overflow-hidden p-1 text-center bg-opacity-80 text-white">
                    {imgPath.replace("\\img\\", "")}
                  </p>
                </div>
              );
            }
            if (extension === "mp4") {
              return (
                <div
                  key={i}
                  className="relative flex items-center justify-center bg-gray-200 w-full h-full"
                >
                  <button
                    className="absolute flex items-center justify-center top-0 right-0 text-xl w-6 h-6 text-white p-1 bg-blue-700"
                    onClick={() =>
                      download(imgPath, imgPath.replace("\\img\\", ""))
                    }
                  >
                    <HiDownload />
                  </button>
                  <video
                    className="object-cover w-full"
                    controls
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <source src={imgPath} type="video/mp4" />
                  </video>
                  <p className="truncate absolute bottom-0 left-0 w-full bg-gray-800 overflow-hidden p-1 text-center bg-opacity-80 text-white">
                    {imgPath.replace("\\img\\", "")}
                  </p>
                </div>
              );
            }
            return (
              <div className="relative w-full">
                <button
                  className="absolute flex items-center justify-center top-0 right-0 text-xl w-6 h-6 text-white p-1 bg-blue-700"
                  onClick={() =>
                    download(imgPath, imgPath.replace("\\img\\", ""))
                  }
                >
                  <HiDownload />
                </button>
                <img
                  src={imgPath}
                  className="object-cover h-full w-full rounded-sm"
                  alt={imgPath}
                />
                <p className="truncate absolute bottom-0 left-0 w-full bg-gray-800 overflow-hidden p-1 text-center bg-opacity-80 text-white">
                  {imgPath.replace("\\img\\", "")}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
}
