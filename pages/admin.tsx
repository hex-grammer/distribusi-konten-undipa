import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import useSWR from "swr";
import { BsThreeDotsVertical } from "react-icons/bs";
import ContentBox from "../components/ContentBox";
import Modal from "../components/Modal";
import { useState, useEffect } from "react";
import { getCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import { VscSignOut } from "react-icons/vsc";
import { HiUpload } from "react-icons/hi";
import UploadModal from "../components/UploadModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Loading = () => (
  <>
    {[...Array(5)].map((e, i) => (
      <div
        key={i}
        className="relative animate-pulse flex items-center justify-center p-5 bg-gray-200 w-full h-40 rounded-md"
      />
    ))}
  </>
);

export default function Admin() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const apiEndPoint = "/api/readfiles";
  const { data } = useSWR(apiEndPoint, fetcher, {
    // revalidateOnFocus: false,
    // revalidateOnMount: false,
    // revalidateOnReconnect: false,
    // refreshWhenOffline: false,
    // refreshWhenHidden: false,
  });
  const [modalUrl, setModalUrl] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [uploadModal, setUploadModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getCookie("account") !== "admin" && router.push("/sign-in");
  }, []);

  const showUploadModal = () => {
    setUploadModal(true);
    setShowDropdown(false);
  };

  const onSignOut = () => {
    deleteCookie("account");
    router.push("/sign-in");
  };

  return (
    <div className="relative flex flex-col bg-gray-700 h-screen md:px-[18%] overflow-hidden">
      <Head>
        <title>Distribusi Konten Digital UNDIPA</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {uploadModal && (
        <UploadModal mutateEndPoint={apiEndPoint} setShow={setUploadModal} />
      )}
      <div className="flex items-center text-white justify-between px-4 py-2">
        <h1 className="text-xl font-semibold">Selamat datang Admin!</h1>
        {/* action menu */}
        <div className="relative inline-block text-left">
          <div>
            <button
              type="button"
              className="p-3 rounded-full bg-gray-300 bg-opacity-5"
              onClick={() => setShowDropdown(!showDropdown)}
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
            >
              <BsThreeDotsVertical />
            </button>
          </div>
          <div
            className={`${
              !showDropdown && "hidden"
            } flex flex-col text-gray-700 px-2 items-center justify-between absolute right-0 z-10 mt-2 w-24 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex={-1}
          >
            <div className="flex justify-between items-center w-full">
              <button
                onClick={showUploadModal}
                className="block w-full py-2 text-right text-sm mr-1"
              >
                Upload
              </button>
              <HiUpload onClick={showUploadModal} className="text-xl" />
            </div>
            <div className="flex justify-between items-center  w-full">
              <button
                onClick={onSignOut}
                className="block w-full py-2 text-right text-sm mr-1"
              >
                Sign out
              </button>
              <VscSignOut onClick={onSignOut} className="text-xl" />
            </div>
          </div>
        </div>
      </div>
      {modalUrl !== "" && (
        <Modal
          mutateEndPoint={apiEndPoint}
          admin={true}
          setModalUrl={setModalUrl}
          filePath={modalUrl}
        />
      )}
      <div className="h-full bg-gray-50 ">
        <div className="grid place-items-start md:grid-cols-5 p-4 grid-cols-3 w-full gap-2 h-fit overflow-y-auto">
          {!data ? (
            <Loading />
          ) : (
            data.images.map((imgPath: string, i: number) => (
              <ContentBox
                key={i}
                setModalUrl={setModalUrl}
                path={imgPath}
                index={i}
              />
            ))
          )}
        </div>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
}
