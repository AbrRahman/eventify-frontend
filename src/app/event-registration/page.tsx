const page = () => {
  return (
    <div className="bg-slate-900">
      <div className="container mx-auto px-4 lg:px-8 h-[85vh]">
        <div className="flex items-center pt-15 lg:pt-8">
          <div className="w-11/12 lg:w-1/2 mx-auto bg-slate-800 py-8 px-6 lg:py-10 lg:px-12  rounded shadow">
            <h1 className="text-slate-200 text-2xl lg:text-3xl">
              Booking Event
            </h1>
            <form className="mt-8">
              <div className="space-y-3.5">
                {/* phone number */}
                <div>
                  <input
                    type="text"
                    placeholder="Enter phone number"
                    className="bg-slate-900 text-slate-400 px-3 py-2 w-full border-lime-500 border rounded"
                  />
                  {/* <p className="text-red-400 ">{"error"}</p> */}
                </div>
                {/* number of sets */}
                <div>
                  <input
                    type="text"
                    placeholder="Number of tickets"
                    className="bg-slate-900 text-slate-400 px-3 py-2 w-full border-lime-500 border rounded"
                  />
                  {/* <p className="text-red-400 ">{"error"}</p> */}
                </div>
                {/* payment method */}
                <div>
                  <input
                    type="text"
                    placeholder="Write payment method types"
                    className="bg-slate-900 text-slate-400 px-3 py-2 w-full border-lime-500 border rounded"
                  />
                  {/* <p className="text-red-400 ">{"error"}</p> */}
                </div>
              </div>
              <button className="bg-lime-600 mt-8 hover:bg-lime-500 text-slate-200 tracking-wide text-lg transition duration-300 rounded cursor-pointer px-4 py-1.5">
                Booking Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
