// import Link from "next/link";

import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <div className="bg-slate-900">
      <div className=" container mx-auto lg:px-8 py-1.5">
        <div className="navbar bg-slate-900">
          <div className="navbar-start">
            {/* dropdown menu for mobile device */}
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost !text-white lg:hidden  border-0 transition duration-300 mr-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />{" "}
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-slate-800 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li className="focus:bg-violet-500 hover:bg-violet-500 transition duration-300">
                  <Link href="/" className="text-white">
                    Item 1
                  </Link>
                </li>
              </ul>
            </div>
            <Link
              href="/"
              className="text-xl sm:text-2xl font-bold text-lime-400 "
            >
              Eventify
            </Link>
          </div>
          {/* menu items for large device */}
          <div className="navbar-end hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link
                  className="text-white bg-lime-500 hover:bg-lime-400 tracking-wide font-semibold transition duration-300 mr-3.5"
                  href="/home"
                >
                  Home
                </Link>
              </li>
              <li className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="profile"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-slate-800 rounded-box !z-50 mt-3 w-52 p-2 shadow"
                >
                  <li className="text-white focus:bg-lime-500 hover:bg-lime-500 transition duration-300 rounded-sm">
                    <a href="/dashboard/profile" className="justify-between">
                      Profile
                    </a>
                  </li>

                  <li className="text-white focus:bg-lime-500 hover:bg-lime-500 transition duration-300 rounded-sm">
                    <button className="justify-between">Logout</button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          {/* for mobile device profile */}
          <div className="navbar-end lg:hidden flex ">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="profile"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-slate-800 rounded-box !z-50 mt-3 w-52 p-2 shadow"
              >
                <li className="text-white focus:bg-violet-500 hover:bg-violet-500 transition duration-300 rounded-sm">
                  <a href="/dashboard/profile" className="justify-between">
                    Profile
                  </a>
                </li>

                <li className="text-white focus:bg-violet-500 hover:bg-violet-500 transition duration-300 rounded-sm">
                  <button className="justify-between">Logout</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
