import Link from "next/link";
import React, { useState } from "react";
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
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid, isDirty },
  } = useForm<FormData>({
    mode: "onBlur",
  });

  const [jenisAkun, setJenisAkun] = useState("mahasiswa");

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // reset();
    toast.error("Akun tidak ditemukan!");
    console.log(data);
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
              onChange: (e) => setJenisAkun(e.target.value.toLowerCase()),
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
          <label htmlFor="nama">Nama Lengkap</label>
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
            {/* Stambuk */}
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
          type="submit"
          value="Login"
          //   disabled={!isValid}
          className={`${
            isValid || isSubmitting ? "bg-blue-500 text-white" : "bg-gray-200"
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
