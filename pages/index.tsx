import axios from "axios";
import { setCookie, getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {};

type FormData = {
  masukSebagai?: string;
  nama?: string;
  stambuk?: string;
  nidn?: string;
  password?: string;
  jurusan?: string;
};

const Login = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [jenisAkun, setJenisAkun] = useState("Masyarakat Umum");

  const {
    register,
    getValues,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm<FormData>({
    mode: "onBlur",
  });

  const options = [
    { value: "Masyarakat Umum", label: "Masyarakat Umum" },
    { value: "Mahasiswa", label: "Mahasiswa" },
    { value: "Dosen", label: "Dosen" },
    { value: "Staff", label: "Staff/Admin" },
  ];

  useEffect(() => {
    const account = getCookie("account");
    account !== undefined && router.push(`${account}`);
  }, []);

  const onSubmit: SubmitHandler<FormData> = (dataInput) => {
    setLoading(true);
    if (dataInput.masukSebagai === "Masyarakat Umum") {
      fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({
          masukSebagai: "umum",
          nama: dataInput.nama,
        }),
      })
        .then((req) => req.json())
        .then((data) => {
          if (data.success) {
            setCookie("account", "umum");
            router.push("/umum");
            return null;
          }
          setLoading(false);
          return toast.error(data.message);
        })
        .finally(() => setLoading(false));
      return null;
    } else if (dataInput.masukSebagai === "Mahasiswa") {
      axios
        .get("/api/mahasiswa")
        .then((res) => {
          const { data } = res.data.data;
          if (
            data.some(
              (item: { stb: string; nmmhs: string }) =>
                item.stb === dataInput.stambuk &&
                item.nmmhs === dataInput.nama?.toUpperCase()
            )
          ) {
            setCookie("account", "mahasiswa");
            router.push("/mahasiswa");
            return null;
          } else {
            setLoading(false);
            return toast.error("Data tidak ditemukan");
          }
        })
        .catch(() => {
          setLoading(false);
          return toast.error("Terjadi kesalahan");
        });
    } else if (dataInput.masukSebagai === "Dosen") {
      axios
        .get("/api/dosen")
        .then((res) => {
          const { data } = res.data.data;
          console.log(data);
          console.log(`data.some(
            (item: { nidn: string; nmdos: string }) =>
              item.nidn === ${dataInput.nidn} &&
              item.nmdos === ${dataInput.nama?.toUpperCase()}
          )`);

          if (
            data.some(
              (item: { nidn: string; nmdos: string }) =>
                item.nidn === dataInput.nidn &&
                item.nmdos === dataInput.nama?.toUpperCase()
            )
          ) {
            setCookie("account", "dosen");
            router.push("/dosen");
            return null;
          } else {
            setLoading(false);
            return toast.error("Data tidak ditemukan");
          }
        })
        .catch(() => {
          setLoading(false);
          return toast.error("Terjadi kesalahan");
        });
    } else {
      fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({
          masukSebagai: "admin/staff",
          nama: dataInput.nama,
          password: dataInput.password,
        }),
      })
        .then((req) => req.json())
        .then((data) => {
          console.log(data);
          if (data.success) {
            setCookie("account", "admin");
            router.push("/admin");
            return null;
          }
          return toast.error(data.message);
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <div className="flex flex-col items-center justify-start sm:pt-8 bg-gray-200 w-full h-screen">
      <form
        className="relative px-4 pt-12 pb-6 flex flex-col items-start text-center bg-gray-50 sm:rounded-md shadow-md sm:w-fit w-full sm:min-w-[28%]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="absolute py-2 px-4 text-left sm:rounded-t-md top-0 left-0 w-full text-lg font-bold mb-3 bg-gray-700 text-gray-200">
          Sistem Distribusi Konten UNDIPA
        </h1>

        {/* Masuk Sebagai */}
        <div className="radio-group flex flex-col items-start mb-2">
          <label className="font-medium">Masuk Sebagai</label>
          {options.map((option, index) => (
            <div key={option.value}>
              <input
                className="hidden"
                type="radio"
                id={`masukSebagai-${index + 1}`}
                value={option.value}
                {...register("masukSebagai", {
                  required: true,
                  minLength: 3,
                  onChange: (e) => {
                    setJenisAkun(e.target.value.toLowerCase());
                  },
                })}
              />
              {getValues("masukSebagai") === option.value ? "✅" : "⬜"}
              <label className="ml-2" htmlFor={`masukSebagai-${index + 1}`}>
                {option.label}
              </label>
            </div>
          ))}
        </div>

        {/* nama lengkap */}
        {jenisAkun !== "masyarakat umum" && (
          <div className="my-1 w-full text-left">
            <label htmlFor="nama">Nama Pengguna</label>
            <input
              type="text"
              id="nama"
              {...register("nama", { required: true })}
              className="w-full px-2 py-1.5 mt-1 bg-gray-400 bg-opacity-30 rounded-sm"
            />
          </div>
        )}
        {jenisAkun === "mahasiswa" && (
          <>
            {/* Stambuk */}
            <div className="my-1 w-full text-left">
              <label htmlFor="stambuk">Stambuk</label>
              <input
                type="number"
                id="stambuk"
                {...register("stambuk", { required: true })}
                className="w-full px-2 py-1.5 mt-1 bg-gray-400 bg-opacity-30 rounded-sm"
              />
            </div>
            {/* jurusan */}
            {/* <div className="my-1 w-full text-left">
              <label htmlFor="jurusan">Jurusan</label>
              <select
                id="jurusan"
                {...register("jurusan", { required: true, minLength: 3 })}
                className="w-full px-2 py-1.5 mt-1 bg-gray-400 bg-opacity-30 rounded-sm"
              >
                <option className="text-gray-800" value="" />
                <option className="text-gray-800" value="Teknik Informatika">
                  Teknik Informatika
                </option>
                <option className="text-gray-800" value="Sistem Informasi">
                  Sistem Informasi
                </option>
                <option className="text-gray-800" value="Manajemen Informasi">
                  Manajemen Informasi
                </option>
                <option
                  className="text-gray-800"
                  value="Rekayasa Perangkat Lunak"
                >
                  Rekayasa Perangkat Lunak
                </option>
              </select>
            </div> */}
          </>
        )}
        {jenisAkun === "dosen" && (
          <>
            {/* Stambuk */}
            <div className="my-1 w-full text-left">
              <label htmlFor="nidn">NIDN</label>
              <input
                type="number"
                id="nidn"
                {...register("nidn", { required: true })}
                className="w-full px-2 py-1.5 mt-1 bg-gray-400 bg-opacity-30 rounded-sm"
              />
            </div>
          </>
        )}
        {jenisAkun === "staff" && (
          <>
            <div className="my-1 w-full text-left">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                {...register("password", { required: true })}
                className="w-full px-2 py-1.5 mt-1 bg-gray-400 bg-opacity-30 rounded-sm"
              />
            </div>
          </>
        )}
        {/* submit */}
        <input
          disabled={loading}
          type="submit"
          value={loading ? "Loading..." : "Mulai"}
          className={`${
            isValid && !loading ? "bg-blue-500 text-white" : "bg-gray-200"
          } w-full mt-4 py-1.5 px-6 rounded-sm`}
        />
      </form>
      {/* <Link href={"/"} className="text-blue-600 mt-4 underline">
        Kembali ke Halaman Utama
      </Link> */}
      <ToastContainer position="top-right" />
    </div>
  );
};

export default Login;
