"use client";
import {
  useCreateUserMutation,
  useGoogleSingInMutation,
} from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { loginWithGoogle } from "@/redux/features/auth/firebase/authService";
import { useAppDispatch } from "@/redux/features/hooks";
import { TSignUpInput } from "@/types/signup.types";
import { verifyToken } from "@/utils/verifyToken";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupFormValidation } from "@/schemas/signupFormValidation";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { TErrorResponse } from "@/types/error.type";
import { useState } from "react";
import PublicRoute from "@/PublicRoute/PublicRoute";

const SingUpPage = () => {
  const [googleSignIn] = useGoogleSingInMutation();
  const [singUpUser, { isLoading }] = useCreateUserMutation();
  const [duplicateEmailError, setDuplicateEmailError] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  // redirect page
  const from = searchParams.get("from") || "/";

  // react hookFrom
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TSignUpInput>({
    resolver: zodResolver(signupFormValidation),
  });

  // handle user signUp form
  const handleUserSignup: SubmitHandler<TSignUpInput> = async (data) => {
    // generate form data
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      if (key !== "image") {
        formData.append(key, value as string);
      }
    }

    //  if user upload image file set image file from data
    Array.from(data.image ?? []).forEach((file) => {
      formData.append("file", file);
    });

    const result = await singUpUser(formData);

    if (result?.data?.success) {
      toast.success("SignUp successfully");
      reset();
      router.replace(from);
    }

    // handle backend error
    if ("error" in result) {
      const err = result?.error as FetchBaseQueryError & {
        data: TErrorResponse;
      };
      if (err?.data?.error?.code == 11000) {
        setDuplicateEmailError(err.data.errorSource?.[0]?.message);
      }
      toast.error("Register failed");
    }
  };

  // handle google authentication
  const handleGoogleSignIn = async () => {
    try {
      // cole google sign function
      const result = await loginWithGoogle();
      const { photoURL, displayName, email, uid } = result;

      if (photoURL && displayName && email) {
        //  google sign data to database
        const { data } = await googleSignIn({
          name: displayName,
          email: email,
          image: photoURL,
        });

        // token to covert data
        const user = await verifyToken(data?.data?.accessToken);

        // set date global state
        dispatch(setUser({ user, token: data?.data?.accessToken, uid }));

        toast.success("SingIn Successfully");
        router.replace(from);
      }
    } catch (err) {
      toast.error("SignIn failed");
      console.log(err);
    }
  };

  return (
    <PublicRoute>
      <div className="bg-slate-900">
        <div className="container mx-auto px-4 lg:px-8 pb-12 lg:pb-20">
          <div className="flex items-center pt-6">
            <div className="w-11/12 lg:w-1/2 mx-auto bg-slate-800 py-8 px-6 lg:py-10 lg:px-12  rounded shadow">
              <h1 className="text-slate-200 text-2xl lg:text-3xl">SignUp</h1>

              {/* sign up form */}
              <form onSubmit={handleSubmit(handleUserSignup)} className="mt-8">
                <div className="space-y-3.5">
                  {/* full name */}
                  <div>
                    <input
                      {...register("name")}
                      type="text"
                      placeholder="Enter your name"
                      className="bg-slate-900 text-slate-400 px-3 py-2 w-full border-lime-500 border rounded-lg"
                    />
                    <p className="text-red-400 ">{errors?.name?.message}</p>
                  </div>
                  {/* email */}
                  <div>
                    <input
                      type="email"
                      {...register("email")}
                      placeholder="Enter Your Email"
                      className="bg-slate-900 text-slate-400 px-3 py-2 w-full border-lime-500 border rounded-lg"
                    />
                    <p className="text-red-400 ">
                      {errors?.email?.message
                        ? errors?.email?.message
                        : duplicateEmailError}
                    </p>
                  </div>
                  {/* phone number */}
                  <div>
                    <input
                      type="text"
                      {...register("phone")}
                      placeholder="Enter your phone"
                      className="bg-slate-900 text-slate-400 px-3 py-2 w-full border-lime-500 border rounded"
                    />
                    <p className="text-red-400 ">{errors?.phone?.message}</p>
                  </div>
                  {/* password */}
                  <div>
                    <input
                      type="password"
                      {...register("password")}
                      placeholder="Enter your password"
                      className="bg-slate-900 text-slate-400 px-3 py-2 w-full border-lime-500 border rounded"
                    />
                    <p className="text-red-400 ">{errors?.password?.message}</p>
                  </div>
                  {/* image file */}
                  <div>
                    <input
                      type="file"
                      {...register("image")}
                      placeholder="Select image"
                      className="bg-slate-900 text-slate-400 px-3 py-2 w-full border-lime-500 border rounded"
                    />
                    <p className="text-red-400 ">{errors?.image?.message}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-slate-400">
                    Do have account?{" "}
                    <Link href="/signin" className="text-lime-500 underline">
                      SignIn
                    </Link>
                  </p>
                  <button className="bg-lime-600 mt-1 hover:bg-lime-500 text-slate-200 tracking-wide text-lg transition duration-300 rounded cursor-pointer px-4 py-1.5">
                    {isLoading ? (
                      <span className="loading loading-spinner mx-5 loading-md"></span>
                    ) : (
                      <span>SignUp</span>
                    )}
                  </button>
                </div>
              </form>
              <hr className="w-full text-slate-400 my-2" />

              <button
                onClick={handleGoogleSignIn}
                className="bg-lime-600 w-full mt-1 flex gap-2.5 justify-center items-center hover:bg-lime-500 text-slate-200 tracking-wide text-lg transition duration-300 rounded cursor-pointer px-4 py-1.5"
              >
                <FaGoogle size={20} />
                <span>SignIn With Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </PublicRoute>
  );
};

export default SingUpPage;
