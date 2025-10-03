"use client";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import {
  useGoogleSingInMutation,
  useSigninMutation,
} from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { loginWithGoogle } from "@/redux/features/auth/firebase/authService";
import { useAppDispatch } from "@/redux/features/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { useRouter, useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { useState } from "react";
import signinFromValidation from "@/schemas/signinFormValidation";

type TSignInput = {
  email: string;
  password: string;
};

const SignInPage = () => {
  const [googleSignIn] = useGoogleSingInMutation();
  const [SingInUser] = useSigninMutation();
  const [unauthorizeErr, setUnAuthorizeErr] = useState("");
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
  } = useForm<TSignInput>({
    resolver: zodResolver(signinFromValidation),
  });

  // handle user signUp form
  const handleUserSignin: SubmitHandler<TSignInput> = async (data) => {
    try {
      const result = await SingInUser(data);

      // handle invalid email or password case
      if ("error" in result) {
        const err = result?.error as FetchBaseQueryError & {
          status: number;
        };

        if (err?.status == 401) {
          toast.error("Login failed");
          setUnAuthorizeErr("Invalid email or password");
          return;
        }
      }

      const user = await verifyToken(result?.data?.accessToken);

      dispatch(setUser({ user, token: result?.data?.accessToken, uid: null }));
      toast.success("Login Successfully");
      reset();
      router.replace(from);
    } catch (err) {
      toast.error("Login failed");
      console.log(err);
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
    <div className="bg-slate-900">
      <div className="container mx-auto px-4 lg:px-8 pb-12 lg:pb-20">
        <div className="flex items-center pt-6">
          <div className="w-11/12 lg:w-1/2 mx-auto bg-slate-800 py-8 px-6 lg:py-10 lg:px-12  rounded shadow">
            <h1 className="text-slate-200 text-2xl lg:text-3xl">SignUp</h1>

            {/* signUp Form */}
            <form onSubmit={handleSubmit(handleUserSignin)} className="mt-8">
              <div className="space-y-3.5">
                {/* email */}
                <div>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="Enter Your Email"
                    className="bg-slate-900 text-slate-400 px-3 py-2 w-full border-lime-500 border rounded-lg"
                  />
                  <p className="text-red-400 ">{errors?.email?.message}</p>
                </div>

                {/* password */}
                <div>
                  <input
                    {...register("password")}
                    type="password"
                    placeholder="Enter your password"
                    className="bg-slate-900 text-slate-400 px-3 py-2 w-full border-lime-500 border rounded"
                  />
                  <p className="text-red-400 ">{errors?.password?.message}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-slate-400">
                  {" Don't have account?"}
                  <Link href="/signup" className="text-lime-500 underline">
                    SignUP
                  </Link>
                </p>
                <button
                  type="submit"
                  className="bg-lime-600 mt-1 hover:bg-lime-500 text-slate-200 tracking-wide text-lg transition duration-300 rounded cursor-pointer px-4 py-1.5"
                >
                  SignUP
                </button>
                <p className="text-red-400 mt-0.5">{unauthorizeErr}</p>
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
  );
};

export default SignInPage;
