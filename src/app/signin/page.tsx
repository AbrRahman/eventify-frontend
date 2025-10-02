import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
const page = () => {
  return (
    <div className="bg-slate-900">
      <div className="container mx-auto px-4 lg:px-8 pb-12 lg:pb-20">
        <div className="flex items-center pt-6">
          <div className="w-11/12 lg:w-1/2 mx-auto bg-slate-800 py-8 px-6 lg:py-10 lg:px-12  rounded shadow">
            <h1 className="text-slate-200 text-2xl lg:text-3xl">SignUp</h1>
            <form className="mt-8">
              <div className="space-y-3.5">
                {/* email */}
                <div>
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    className="bg-slate-900 text-slate-400 px-3 py-2 w-full border-lime-500 border rounded-lg"
                  />
                  {/* <p className="text-red-400 ">{"error"}</p> */}
                </div>

                {/* password */}
                <div>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="bg-slate-900 text-slate-400 px-3 py-2 w-full border-lime-500 border rounded"
                  />
                  {/* <p className="text-red-400 ">{"error"}</p> */}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-slate-400">
                  {" Don't have account?"}
                  <Link href="/signup" className="text-lime-500 underline">
                    SignUP
                  </Link>
                </p>
                <button className="bg-lime-600 mt-1 hover:bg-lime-500 text-slate-200 tracking-wide text-lg transition duration-300 rounded cursor-pointer px-4 py-1.5">
                  SignUP
                </button>
              </div>
            </form>
            <hr className="w-full text-slate-400 my-2" />

            <button className="bg-lime-600 w-full mt-1 flex gap-2.5 justify-center items-center hover:bg-lime-500 text-slate-200 tracking-wide text-lg transition duration-300 rounded cursor-pointer px-4 py-1.5">
              <FaGoogle size={20} />
              <span>SignIn With Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
