import Image from "next/image";

const page = () => {
  return (
    <div className="bg-slate-900">
      <div className="container mx-auto px-4 lg:px-8 pb-12 lg:pb-20">
        <div>
          <h1 className="text-slate-200 text-2xl lg:text-4xl text-center font-semibold tracking-wide pt-5">
            Profile
          </h1>
          <div className="w-30 h-30 mt-4 mx-auto">
            <Image
              className=" w-full rounded-full"
              src="/images/user.png"
              alt="user image"
              width={400}
              height={400}
            />
          </div>
          <div className="text-slate-400 text-center">
            <h1 className="text-semibold my-1 text-xl lg:text-2xl">Jone Deo</h1>
            <h1 className="text-semibold ">User</h1>
            <button className="px-4 mt-1.5  text-white py-1 bg-lime-600 hover:bg-lime-500 transition duration-300 rounded cursor-pointer">
              Edit Profile
            </button>
          </div>
          <hr className="lg:w-3/6 mx-auto w-10/12 text-slate-300 my-4" />
          <h1 className="text-semibold text-white mb-1 text-center text-xl lg:text-2xl">
            Contact Info
          </h1>
          <div>
            <h1 className="text-semibold text-slate-400 mb-0.5 text-center text-xl">
              jondeo@gamil.com
            </h1>
            <h1 className="text-semibold text-slate-400 mb-0.5 text-center text-xl">
              1234567891
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
