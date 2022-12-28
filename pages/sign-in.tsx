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
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm<FormData>({
    mode: "onBlur",
  });
  const router = useRouter();

  const [jenisAkun, setJenisAkun] = useState("mahasiswa");

  useEffect(() => {
    const account = getCookie("account");
    account !== undefined && router.push(`${account}`);
  }, []);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setLoading(true);
    if (data.masukSebagai === "Mahasiswa") {
      fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({
          masukSebagai: "mahasiswa",
          nama: data.nama,
          stambuk: data.stambuk,
          jurusan: data.jurusan,
        }),
      })
        .then((req) => req.json())
        .then((data) => {
          if (data.success) {
            setCookie("account", "mahasiswa");
            router.push("/mahasiswa");
            return null;
          }
          setLoading(false);
          return toast.error(data.message);
        })
        .finally(() => setLoading(false));
      return null;
    }
    if (data.masukSebagai === "Dosen") {
      fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({
          masukSebagai: "dosen",
          nama: data.nama,
          nidn: data.nidn,
        }),
      })
        .then((req) => req.json())
        .then((data) => {
          if (data.success) {
            setCookie("account", "dosen");
            router.push("/dosen");
            return null;
          }
          return toast.error(data.message);
        })
        .finally(() => setLoading(false));
      return null;
    }
    fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({
        masukSebagai: "admin/staff",
        nama: data.nama,
        password: data.password,
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
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-200 w-full h-screen">
      <form
        className="flex flex-col items-start text-center bg-gray-50 rounded-md shadow-md p-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-lg font-bold mb-3">.Login</h1>

        {/* masukSebagai */}
        <div className="my-1 w-full text-left">
          <label htmlFor="masukSebagai">Masuk Sebagai</label>
          <select
            id="masukSebagai"
            {...register("masukSebagai", {
              required: true,
              minLength: 3,
              onChange: (e) => {
                setJenisAkun(e.target.value.toLowerCase());
              },
            })}
            className="w-full px-2 py-1.5 mt-1 bg-gray-400 bg-opacity-30 rounded-sm"
          >
            <option className="text-gray-800" value="Mahasiswa">
              Mahasiswa
            </option>
            <option className="text-gray-800" value="Dosen">
              Dosen
            </option>
            <option className="text-gray-800" value="Staff">
              Staff/Admin
            </option>
          </select>
        </div>
        {/* nama lengkap */}
        <div className="my-1 w-full text-left">
          <label htmlFor="nama">
            {jenisAkun === "staff" ? "Username" : "Nama Lengkap"}
          </label>
          <input
            type="text"
            id="nama"
            {...register("nama", { required: true })}
            className="w-full px-2 py-1.5 mt-1 bg-gray-400 bg-opacity-30 rounded-sm"
          />
        </div>
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
            <div className="my-1 w-full text-left">
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
            </div>
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
          value={loading ? "Loading..." : "Login"}
          className={`${
            isValid && !loading ? "bg-blue-500 text-white" : "bg-gray-200"
          } w-full mt-4 py-1.5 px-6 rounded-sm`}
        />
      </form>
      <Link href={"/"} className="text-blue-600 mt-4 underline">
        Kembali ke Halaman Utama
      </Link>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default Login;
