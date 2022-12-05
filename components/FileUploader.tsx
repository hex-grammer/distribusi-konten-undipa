import React, { ChangeEventHandler, useState } from "react";
import { HiDownload, HiUpload } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import useDownloader from "react-use-downloader";
import SelectedContent from "./SelectedContent";
import { FileUploader } from "react-drag-drop-files";
import axios, { AxiosRequestConfig } from "axios";
import { useRouter } from "next/router";
import { mutate } from "swr";

type Props = {
  admin?: boolean;
  show?: boolean;
  setShow: Function;
};

const UploadModal = (props: Props) => {
  const handleClose = (e: any) => {
    if (e.currentTarget != e.target) return;
    props.setShow((s: any) => !s);
  };
  const fileTypes = ["JPG", "PNG", "DOCX", "PDF"];
  const router = useRouter();
  // const [file, setFile] = useState({ name: null });
  const [file, setFile] = useState<File | undefined>();
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleCheckBox = (e: ChangeEventHandler | undefined) => {
    // if (e?.currentTarget !== e?.target) return;
    // e.preventDefault();
  };

  const CheckBox = ({ label }: { label: string }) => (
    <div className="flex items-center my-2">
      <input
        // onChange={handleCheckBox}
        id={label}
        type="checkbox"
        value={label}
        className="w-4 h-4"
      />
      <label htmlFor={label} className="ml-2 cursor-pointer">
        {label}
      </label>
    </div>
  );

  async function handleUpload() {
    const data = new FormData();

    if (!file) return;

    setSubmitting(true);

    data.append("file", file);

    const config: AxiosRequestConfig = {
      onUploadProgress: function (progressEvent) {
        const percentComplete = Math.round(
          (progressEvent.loaded * 100) / (progressEvent.total || 100)
        );
        setProgress(percentComplete);
      },
    };

    try {
      await axios.post("/api/videos", data, config);
    } catch (e: any) {
      setError(e.message);
    } finally {
      // router.reload();
      mutate("/api/readfiles");
      props.setShow(false);
      setSubmitting(false);
      setProgress(0);
    }
  }

  const handleChange = (file: File | undefined) => {
    setFile(file);
    console.log(file);
  };

  return (
    <div
      onClick={handleClose}
      className="absolute w-full h-full left-0 top-0 flex justify-center p-5 items-center bg-gray-900 bg-opacity-80 backdrop-blur-sm z-50 cursor-pointer"
    >
      <div className="relative flex flex-col items-center bg-gray-100 rounded-md py-6 pt-4 px-3 sm:max-w-[360px] max-w-[340px]">
        <button
          onClick={() => props.setShow((s: any) => !s)}
          className="absolute flex items-center justify-center top-2 right-2 text-lg w-5 h-5 text-white p-0.5 rounded-full bg-gray-800 bg-opacity-70"
        >
          <IoMdClose />
        </button>
        <h1 className="mb-2 font-semibold">Upload File</h1>
        {/* <div className="max-w-[95%]"> */}
        <FileUploader
          handleChange={handleChange}
          name="file"
          label={"Upload atau geser file ke area ini"}
          // types={fileTypes}
        />
        {/* </div> */}
        {file && (
          <div className="w-full">
            <div className="py-2 w-full text-sm">
              <h2 className="font-semibold text-base">
                File ini dapat diakses oleh:
              </h2>
              <CheckBox label="Pengguna Umum" />
              <CheckBox label="Mahasiswa" />
              <CheckBox label="Dosen" />
            </div>
            <div className="flex justify-end w-full items-center text-sm mt-2">
              <p className="truncate max-w-full">
                {progress > 0 && `${progress}%`} {file.name}
              </p>
              <button
                className="flex items-center rounded-md justify-center text-white p-2 px-4 bg-blue-500 ml-2 w-fit"
                onClick={handleUpload}
                // onClick={() => download(newPath, newPath.replace("/img/", ""))}
              >
                Upload
                <HiUpload className="text-lg ml-1" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadModal;
