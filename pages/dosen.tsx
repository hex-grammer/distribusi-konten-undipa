import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import useSWR from "swr";
import { BsStar, BsThreeDotsVertical } from "react-icons/bs";
import ContentBox from "../components/ContentBox";
import Modal from "../components/Modal";
import { useState, useEffect } from "react";
import { getCookie, deleteCookie, setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { VscSignOut } from "react-icons/vsc";
import { IoMdClose } from "react-icons/io";

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
  const apiEndPoint = "/api/readfiles/dosen";
  const { data } = useSWR(apiEndPoint, fetcher);
  const [modalUrl, setModalUrl] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getCookie("account") !== "dosen" && router.push("/sign-in");
  }, []);

  const onSignOut = () => {
    deleteCookie("account");
    router.push("/sign-in");
  };

  return (
    <div className="relative flex flex-col h-screen md:px-[18%] overflow-hidden bg-gray-200 ">
      <Head>
        <title>Distribusi Konten Digital UNDIPA</title>
        <meta
          name="description"
          content="Aplikasi ini dirancang untuk memudahkan baik mahasiswa, dosen maupun staff di Universitas Dipa Makassar dalam mendistribusikan konten digital."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex items-center bg-gray-700  text-white justify-between px-4 py-2">
        <h1 className="text-xl font-semibold">Konten khusus Dosen</h1>
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
              {showDropdown ? <IoMdClose /> : <BsThreeDotsVertical />}
            </button>
          </div>
          <div
            className={`${
              !showDropdown && "hidden"
            } flex flex-col text-gray-700 px-2 items-center justify-between absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
            role="menu"
          >
            <button
              onClick={() => {
                deleteCookie("account");
                router.push("/sign-in");
              }}
              className="flex justify-between items-center  w-full"
            >
              <button className="block w-full py-2 text-right text-sm mr-1">
                Sign out
              </button>
              <VscSignOut className="text-xl" />
            </button>
            <Link
              href={"/rating-aplikasi"}
              className="flex justify-between items-center w-full"
            >
              <button className="block w-full py-2 text-right text-sm mr-1">
                Rating Aplikasi
              </button>
              <BsStar className="text-xl" />
            </Link>
          </div>
        </div>
      </div>
      {modalUrl !== "" && (
        <Modal
          mutateEndPoint={apiEndPoint}
          setModalUrl={setModalUrl}
          path={modalUrl}
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
    </div>
  );
}
