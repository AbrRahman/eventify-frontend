import React from "react";
import { FaPlus } from "react-icons/fa";
const page = () => {
  return (
    <div className="bg-slate-900 h-[80vh] overflow-y-auto">
      <div className="container mx-auto px-4 lg:px-8 pb-12 lg:pb-20">
        {" "}
        <h1 className="text-slate-200 text-center pt-4 text-2xl lg:text-3xl ">
          Event Management
        </h1>
        <div className="mt-4">
          <button className="text-white bg-ca px-3 bg-lime-600 py-1 hover:bg-lime-500 cursor-pointer transition duration-300 flex items-center justify-center gap-3.5">
            <FaPlus className="size-4" />
            Add a Event
          </button>
        </div>
        <div className="overflow-x-auto mt-5 lg:mt-8">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="bg-slate-800 text-slate-200 border-b border-gray-400">
                <th>Event Name</th>
                <th>Event Date</th>
                <th>Number of tickets</th>

                <th>Payment status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr className="bg-slate-800 text-slate-200">
                <th>Music Fest</th>

                <td className="whitespace-nowrap">5 Not 2025</td>
                <td>5</td>
                <td>Unpaid</td>
                <td>
                  <div className="flex gap-3">
                    <button className="text-white bg-amber-400 px-3 py-1 hover:bg-amber-500 cursor-pointer transition duration-300">
                      Cancel
                    </button>
                    <button className="text-white whitespace-nowrap bg-violet-500 px-3 py-1 hover:bg-violet-400 cursor-pointer transition duration-300">
                      Write a Review
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default page;
