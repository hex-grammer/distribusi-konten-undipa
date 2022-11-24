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
import Image from "next/image";
import ContentBox from "../components/ContentBox";
import Modal from "../components/Modal";
import { useState } from "react";

const Loading = () => (
  <>
    {[...Array(5)].map((e, i) => (
      <>
        <div
          key={i}
          className="relative animate-pulse flex items-center justify-center p-5 bg-gray-200 w-full h-40 rounded-md"
        />
      </>
    ))}
  </>
);

export default function Home() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data } = useSWR("/api/readfiles", fetcher);
  const [modalUrl, setModalUrl] = useState("");

  return (
    <div className="relative flex flex-col bg-gray-700 h-screen md:px-[18%] overflow-hidden">
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
      {modalUrl !== "" && (
        <Modal setModalUrl={setModalUrl} imgPath={modalUrl} />
      )}
      <div className="grid md:grid-cols-5 py-5 grid-cols-3 w-full gap-2 h-fit overflow-y-auto">
        {!data ? (
          <Loading />
        ) : (
          data.images.map((imgPath: string, i: number) => (
            <ContentBox setModalUrl={setModalUrl} imgPath={imgPath} i={i} />
          ))
        )}
      </div>
    </div>
  );
}
