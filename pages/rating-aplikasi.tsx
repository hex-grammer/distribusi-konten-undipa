import { setCookie, getCookie } from "cookies-next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TiArrowBackOutline } from "react-icons/ti";
import SkalaLikert from "../components/SkalaLikert";

type Props = {};

type FormData = {
  kelayakan?: string;
  alasan?: string;
  sudahPernahMenggunakan?: string;
  sudahPernahMengajukan?: string;
};

export default function RatingAaplikasi() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { isValid },
  } = useForm({ mode: "onBlur" });

  const pertanyaan = [
    {
      namaPertanyaan: "akses",
      pertanyaan:
        "Apakah kamu merasa aplikasi ini memenuhi kebutuhanmu dalam mengakses konten digital di Universitas Dipa Makassar?",
    },
    {
      namaPertanyaan: "fitur",
      pertanyaan:
        "Apakah kamu merasa aplikasi ini memiliki fitur yang sesuai dengan kebutuhanmu dalam mengakses konten digital di Universitas Dipa Makassar?",
    },
    {
      namaPertanyaan: "mudah",
      pertanyaan: "Apakah kamu merasa aplikasi ini mudah digunakan?",
    },
    {
      namaPertanyaan: "tampilan",
      pertanyaan:
        "Apakah kamu merasa aplikasi ini memiliki tampilan yang menarik?",
    },
    {
      namaPertanyaan: "kekurangan",
      pertanyaan: "Apakah kamu merasa ada banyak kekurangan pada aplikasi ini?",
    },
  ];

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const jenis_akun = getCookie("account") || "umum";
    setLoading(true);
    fetch("/api/rating", {
      method: "POST",
      body: JSON.stringify({ data: { ...data, jenis_akun } }),
    })
      .then((res) => {
        if (res.ok) {
          setSubmitted(true);
          return;
        }
        setLoading(false);
        return toast.error("Terjadi kesalahan, silahkan coba lagi");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="relative flex flex-col h-screen md:px-[18%] overflow-hidden bg-gray-200 ">
      <Head>
        <title>Distribusi Konten Digital UNDIPA</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex items-center text-white justify-between px-4 py-2 bg-gray-700">
        <h1 className="text-xl font-semibold">Rating Aplikasi</h1>
        {/* action menu */}
        <div className="relative inline-block text-left">
          <button
            className="p-2 rounded-full bg-gray-300 bg-opacity-5"
            onClick={() => router.back()}
          >
            <TiArrowBackOutline className="text-lg" />
          </button>
        </div>
      </div>
      <form
        className="bg-white shadow-md rounded p-6 pb-8 overflow-auto h-screen"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-xl font-bold text-gray-800 mb-4">
          Kuesioner Kelayakan Aplikasi
        </h1>
        {submitted ? (
          <p className="text-justify">
            &quot;Terimakasih banyak{" "}
            {getCookie("account") === "dosen" ? "Bpk/Ibu" : "saudara(i)"}{" "}
            <b className="text-blue-700">{getValues().nama}</b>, telah mengisi
            kuesioner ini sebagai bagian dari penelitian tugas akhir kami di
            Universitas Dipa Makassar. Kami sangat menghargai partisipasi anda.
            Semoga aplikasi ini dapat memberikan manfaat yang bermanfaat bagi
            kita semua.&quot;
            <br />
            <p
              onClick={router.back}
              className={"underline text-sm mt-2 text-blue-500 cursor-pointer"}
            >
              Kembali ke halaman utama
            </p>
          </p>
        ) : (
          <>
            <div className="flex flex-col mb-4">
              <label htmlFor="nama" className="font-medium">
                Nama Lengkap
              </label>
              <input
                id="nama"
                type="text"
                className="form-input sm:w-[30%] bg-gray-200 p-2 py-1 rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-3 mt-1 border-b-2 border-blue-500"
                {...register("nama", { required: true })}
              />
            </div>
            <ol className="list-decimal pl-4">
              {pertanyaan.map((p, index) => (
                <li className="mb-4" key={index}>
                  <p className="font-medium">{p.pertanyaan}</p>
                  <SkalaLikert
                    register={register}
                    name={`${p.namaPertanyaan}`}
                    opsi={[
                      "Sangat tidak setuju",
                      "Tidak setuju",
                      "Tidak tahu",
                      "Setuju",
                      "Sangat setuju",
                    ]}
                  />
                </li>
              ))}
            </ol>
            <div className="flex items-center justify-between mt-4">
              <button
                className={`text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-indigo ${
                  !isValid || loading
                    ? "cursor-not-allowed bg-gray-400 opacity-50"
                    : "bg-indigo-500 hover:bg-indigo-700"
                }}`}
                type="submit"
                disabled={!isValid}
              >
                {loading ? "Loading..." : "Kirim"}
              </button>
            </div>
          </>
        )}
      </form>
      <ToastContainer />
    </div>
  );
}
