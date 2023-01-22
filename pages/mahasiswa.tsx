import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import useSWR, { Fetcher } from "swr";
import { BsStar, BsThreeDotsVertical } from "react-icons/bs";
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
import { IoMdClose } from "react-icons/io";
import { FiMenu } from "react-icons/fi";
import { AiOutlineMenu } from "react-icons/ai";
import Image from "next/image";
import { Interface } from "readline";

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

interface Images {
  nama_file: string;
  kategori: string;
  created_at: string;
}

type DataImages = {
  images: Images[];
};

type Kategori = {
  nama_file: string;
  kategori: string;
  created_at: string;
};

export default function Admin() {
  const fetcher: Fetcher<DataImages> = (url: string) =>
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: "mahasiswa",
      }),
    }).then((res) => res.json());
  const apiEndPoint = "https://project-api.xolusi.com/readfiles.php";
  const { data } = useSWR<DataImages>(apiEndPoint, fetcher);
  const [modalUrl, setModalUrl] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [uploadModal, setUploadModal] = useState(false);
  const [sortBy, setSortBy] = useState("kategori");
  const [selectedCat, setSelectedCat] = useState("semua");
  const router = useRouter();

  useEffect(() => {
    getCookie("account") !== "mahasiswa" && router.push("/");
  }, []);

  const sortedContent = (): any => {
    const kats = data?.images.map((d) => d.kategori);
    const dates = data?.images.map((d) => d.created_at);
    const uniqueKategori = kats?.filter(
      (n, i) => kats.indexOf(n) === i && n !== ""
    );

    const uniqueDate = dates
      ?.filter((n, i) => dates.indexOf(n) === i)
      .reverse();

    const filterByKat = [...(uniqueKategori || []), ""].map((kat) =>
      data?.images.filter((k) => k.kategori === kat)
    );
    const filterByDate = uniqueDate?.map((date) =>
      data?.images.filter((d) => d.created_at === date)
    );
    const retVal = sortBy === "kategori" ? filterByKat : filterByDate;
    return retVal;
  };

  // date to text
  const dateToText = (date: string) => {
    const dateArr = date.split("-");
    const month = dateArr[1];
    const day = dateArr[2].split(" ")[0];
    const year = dateArr[0];
    const monthText = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    // return `${day}-${monthText[parseInt(month) - 1].slice(0, 3)}-${year}`;
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="relative flex flex-col h-screen md:px-[18%] overflow-hidden bg-gray-900">
      <Head>
        <title>Distribusi Konten Digital UNDIPA</title>
        <meta
          name="description"
          content="Aplikasi Distribusi Konten Digital Universitas Dipa Makassar"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex items-center bg-gray-700  text-white justify-between px-4 py-2">
        <h1 className="text-xl font-semibold flex gap-1">
          Konten Khusus Mahasiswa
        </h1>
        {/* action menu */}
        <div className="relative inline-block text-left">
          <div>
            <button
              type="button"
              className={`p-3 rounded-full bg-opacity-5 ${
                showDropdown && "bg-gray-300 "
              }`}
              onClick={() => setShowDropdown(!showDropdown)}
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
            >
              {showDropdown ? (
                <IoMdClose size={18} />
              ) : (
                <AiOutlineMenu size={24} />
              )}
            </button>
          </div>
          <div
            className={`${
              !showDropdown && "hidden"
            } flex flex-col text-gray-700 px-2 items-center justify-between absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex={-1}
          >
            <Link
              href={"/rating-aplikasi"}
              className="flex justify-between items-center w-full"
            >
              <button className="block w-full py-2 text-right text-sm mr-1">
                Rating Aplikasi
              </button>
              <BsStar className="text-xl" />
            </Link>
            <button
              onClick={() => {
                deleteCookie("account");
                router.push("/");
              }}
              className="flex justify-between items-center  w-full"
            >
              <button className="block w-full py-2 text-right text-sm mr-1">
                Keluar
              </button>
              <VscSignOut className="text-xl" />
            </button>
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
      {/* konten */}
      <div className="h-full overflow-y-auto pb-4 bg-gray-400 bg-logo-background bg-no-repeat bg-cover bg-center">
        <div className="grid place-items-start md:grid-cols-5 p-4 grid-cols-3 w-full gap-2 h-fit overflow-y-auto">
          {/* Urut Berdasarkan */}
          <div className="col-span-full">
            <h2 className="text-lg mt-2 text-gray-800 flex bg-gray-200 px-2 py-1 rounded-sm shadow-md">
              <label htmlFor="sort">Urut berdasarkan:</label>
              <select
                id="sort"
                className="bg-transparent text-blue-700 ml-1"
                onChange={(e) => {
                  setSortBy(e.target.value.toLowerCase());
                  setSelectedCat("semua");
                }}
              >
                <option>Kategori</option>
                <option>Tanggal</option>
              </select>
            </h2>
          </div>
          <div className="col-span-full flex flex-wrap gap-2 py-2 w-full">
            {/* Semua */}
            <h2
              onClick={() => setSelectedCat("semua")}
              className={`flex items-center px-4 text-lg font-medium col-span-full mt-2 shadow-md bg-opacity-80 rounded-full cursor-pointer ${
                selectedCat === "semua"
                  ? "bg-blue-700 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Semua
            </h2>
            {/* chips kategori */}
            {data &&
              sortedContent()?.map((kategori: Kategori[], i: number) => {
                const label =
                  sortBy === "kategori"
                    ? kategori[0].kategori
                    : dateToText(kategori[0].created_at);
                return (
                  <h2
                    key={i}
                    onClick={() => setSelectedCat(label.toLocaleLowerCase())}
                    className={`flex items-center px-4 text-lg font-medium col-span-full mt-2 shadow-md bg-opacity-80 rounded-full cursor-pointer whitespace-nowrap ${
                      selectedCat === label.toLocaleLowerCase() || ""
                        ? "bg-blue-700 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {label || "Tanpa Kategori"}
                  </h2>
                );
              })}
          </div>
          {!data ? (
            <Loading />
          ) : (
            sortedContent()?.map((kategori: Kategori[]) => {
              const contents = kategori
                .filter(
                  (k) =>
                    selectedCat === k.kategori.toLowerCase() ||
                    selectedCat === dateToText(k.created_at).toLowerCase() ||
                    selectedCat === "semua"
                )
                .map((k) => {
                  return {
                    name: k.nama_file,
                    date: k.created_at,
                    kategori: k.kategori,
                  };
                });
              console.log(contents);
              return (
                <>
                  {/* LABEL KATEGORI & TANGGAL */}
                  {sortBy === "kategori" &&
                    selectedCat === "semua" &&
                    contents[0] && (
                      <h2 className="text-lg font-medium col-span-full mt-2 text-gray-700 bg-gray-200 shadow-md px-2 bg-opacity-80 rounded-sm">
                        {contents[0]?.kategori || "Tanpa Kategori"}
                      </h2>
                    )}
                  {sortBy === "tanggal" &&
                    selectedCat === "semua" &&
                    contents[0] && (
                      <h2 className="text-lg font-medium col-span-full mt-2 text-gray-700 bg-gray-200 shadow-md px-2 bg-opacity-80 rounded-sm">
                        {dateToText(contents[0]?.date) || "Tanpa Kategori"}
                      </h2>
                    )}

                  {contents.map(
                    (img: { name: string; date: string }, i: number) => (
                      <ContentBox
                        key={i}
                        setModalUrl={setModalUrl}
                        path={img.name}
                        date={img.date}
                        index={i}
                      />
                    )
                  )}
                </>
              );
            })
          )}
        </div>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
}
