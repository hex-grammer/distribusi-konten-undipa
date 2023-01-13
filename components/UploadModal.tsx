import React, { useState } from "react";
import { HiUpload } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { FileUploader } from "react-drag-drop-files";
import axios from "axios";
import { useRouter } from "next/router";
import { mutate } from "swr";
import PulseLoader from "react-spinners/PulseLoader";

type Props = {
  admin?: boolean;
  show?: boolean;
  mutateEndPoint?: string;
  setShow: Function;
};

const UploadModal = (props: Props) => {
  const handleClose = (e: any) => {
    if (e.currentTarget != e.target) return;
    props.setShow((s: any) => !s);
  };
  const [file, setFile] = useState<File | undefined>();
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [akses, setAkses] = useState("");
  const [kategori, setKategori] = useState("");

  async function uploadFile() {
    setLoading(true);
    try {
      const formData = new FormData();
      if (!file) return;
      formData.append("file", file);
      formData.append("field", JSON.stringify({akses,kategori}));

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axios.post(
        "https://project-api.xolusi.com/uploadFile.php",
        formData,
        config
      );
      // console.log(response.data);
      props.setShow(false);
      mutate("https://project-api.xolusi.com/readfilesAdmin.php");
    } catch (error) {
      console.error(error);
    }
  }

  const handleChangeFile = (file: File | undefined) => {
    setFile(file);
  };

  const handleChangeAkses = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedAkses = e.target.value;
    akses.includes(selectedAkses)
      ? setAkses((a) => a.replace(selectedAkses, ""))
      : setAkses(akses + selectedAkses);
  };

  const CheckBox = ({ label }: { label: string }) => (
    <div className="flex items-center my-2">
      <input
        onChange={handleChangeAkses}
        id={label}
        type="checkbox"
        value={label}
        className="w-4 h-4 hidden"
      />
      <label htmlFor={label} className="flex items-center ml-2 cursor-pointer">
        {akses.includes(label) ? (
          "✅"
        ) : (
          <div className="mx-0.5 h-4 w-4 bg-gray-400" />
        )}
        {label}
      </label>
    </div>
  );

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
        <FileUploader
          handleChange={handleChangeFile}
          name="file"
          label={"Upload atau geser file ke area ini"}
        />
        {file && (
          <div className="w-full">
            <div className="py-2 w-full text-sm mt-2">
              <h2 className="font-semibold text-base">
                Kategori konten:
              </h2>
              <input type="text" onChange={(e)=>setKategori(e.target.value)} name="kategori" className="w-full bg-gray-300 p-2 rounded-sm text-gray-800" />
            </div>
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
                className={`flex items-center rounded-md justify-center text-white p-2 px-4 ml-2 ${loading ? "bg-gray-300" : "bg-blue-600"
                  }`}
                disabled={loading}
                onClick={() => uploadFile().then(() => setLoading(false))}
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
                    Upload
                    <HiUpload className="text-lg ml-1" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadModal;
