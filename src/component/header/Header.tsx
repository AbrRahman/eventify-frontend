// import Link from "next/link";
"use client";
import { useGetUserProfileQuery } from "@/redux/features/auth/authApi";
import { logOut } from "@/redux/features/auth/authSlice";
import { googleLogOut } from "@/redux/features/auth/firebase/authService";
import { setActiveMenu } from "@/redux/features/header/headerSlice";
import { useAppDispatch, useAppSelector } from "@/redux/features/hooks";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
  const { user, googleUiu } = useAppSelector((state) => state.auth);
  const { activeMenu } = useAppSelector((state) => state.header);
  const { data: profile } = useGetUserProfileQuery(undefined, { skip: !user });
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
  ];

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSignOut = async () => {
    if (googleUiu) {
      await googleLogOut();
    }
    dispatch(logOut());
    router.replace("/");
  };

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
                {menuItems?.map((item, index) => (
                  <li
                    onClick={() => dispatch(setActiveMenu(item?.name))}
                    key={index}
                    className={`focus:bg-lime-500 hover:bg-lime-600 transition duration-300 ${
                      activeMenu == item?.name ? "" : "bg-lime-500"
                    }`}
                  >
                    <Link href={item?.path} className="text-white">
                      {item?.name}
                    </Link>
                  </li>
                ))}
                {!user && (
                  <>
                    <li
                      onClick={() => dispatch(setActiveMenu("SignIn"))}
                      className={`focus:bg-lime-500 hover:bg-lime-600 transition duration-300 ${
                        activeMenu == "SignIn" ? "bg-lime-500" : ""
                      }`}
                    >
                      <Link href="/signin" className="text-white">
                        SignIn
                      </Link>
                    </li>
                    <li
                      onClick={() => dispatch(setActiveMenu("SignUp"))}
                      className={`focus:bg-lime-500 hover:bg-lime-600 transition duration-300 ${
                        activeMenu == "SignUP" ? "bg-lime-500" : ""
                      }`}
                    >
                      <Link href="/signup" className="text-white">
                        SignUp
                      </Link>
                    </li>
                  </>
                )}
                {user && (
                  <>
                    <li
                      onClick={() => dispatch(setActiveMenu("MyBooking"))}
                      className={`focus:bg-lime-500 hover:bg-lime-600 transition duration-300 ${
                        activeMenu == "MyBooking" ? "bg-lime-500" : ""
                      }`}
                    >
                      <Link href="/my-booking" className="text-white">
                        MyBooking
                      </Link>
                    </li>
                  </>
                )}
                {user && user?.role == "admin" && (
                  <>
                    <li
                      onClick={() => dispatch(setActiveMenu("Add Event"))}
                      className={`focus:bg-lime-500 hover:bg-lime-600 transition duration-300 ${
                        activeMenu == "Add Event" ? "bg-lime-500" : ""
                      }`}
                    >
                      <Link href="/add-event" className="text-white">
                        Add Event
                      </Link>
                    </li>
                  </>
                )}
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
            <ul className="menu menu-horizontal lg:flex items-center px-1">
              {menuItems?.map((item, index) => (
                <li key={index}>
                  <Link
                    onClick={() => dispatch(setActiveMenu(item?.name))}
                    className={`text-white  hover:bg-lime-600 tracking-wide font-semibold transition duration-300 mr-3.5 ${
                      activeMenu == item.name ? "bg-lime-600" : ""
                    }`}
                    href={item?.path}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              {!user && (
                <>
                  <li>
                    <Link
                      onClick={() => dispatch(setActiveMenu("SignIn"))}
                      className={`text-white  hover:bg-lime-600 tracking-wide font-semibold transition duration-300 mr-3.5 ${
                        activeMenu == "SignIn" ? "bg-lime-600" : ""
                      }`}
                      href="/signin"
                    >
                      SignIn
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => dispatch(setActiveMenu("signup"))}
                      className={`text-white  hover:bg-lime-600 tracking-wide font-semibold transition duration-300 mr-3.5 ${
                        activeMenu == "signup" ? "bg-lime-600" : ""
                      }`}
                      href="/signup"
                    >
                      SignUp
                    </Link>
                  </li>
                </>
              )}
              {user && user?.role == "admin" && (
                <li>
                  <Link
                    onClick={() => dispatch(setActiveMenu("Add Event"))}
                    className={`text-white  hover:bg-lime-600 tracking-wide font-semibold transition duration-300 mr-3.5 ${
                      activeMenu == "Add Event" ? "bg-lime-600" : ""
                    }`}
                    href="/add-event"
                  >
                    Add Event
                  </Link>
                </li>
              )}
              {user && (
                <>
                  <li>
                    <Link
                      onClick={() => dispatch(setActiveMenu(" My Booking"))}
                      className={`text-white  hover:bg-lime-600 tracking-wide font-semibold transition duration-300 mr-3.5 ${
                        activeMenu == " My Booking" ? "bg-lime-600" : ""
                      }`}
                      href="/my-booking"
                    >
                      My Booking
                    </Link>
                  </li>
                  <li className="dropdown dropdown-end">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-ghost btn-circle avatar"
                    >
                      <div className="w-10 rounded-full">
                        {profile && (
                          <Image
                            alt="profile"
                            src={profile?.image}
                            width={400}
                            height={400}
                          />
                        )}
                      </div>
                    </div>
                    <ul
                      tabIndex={0}
                      className="menu menu-sm dropdown-content bg-slate-800 rounded-box !z-50 mt-3 w-52 p-2 shadow"
                    >
                      <li className="text-white focus:bg-lime-500 hover:bg-lime-500 transition duration-300 rounded-sm">
                        <a href="/profile" className="justify-between">
                          Profile
                        </a>
                      </li>

                      <li className="text-white focus:bg-lime-500 hover:bg-lime-500 transition duration-300 rounded-sm">
                        <button
                          onClick={handleSignOut}
                          className="justify-between"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* for mobile device profile */}
          {user && (
            <div className="navbar-end lg:hidden flex ">
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    {profile && (
                      <Image
                        alt="profile"
                        src={profile?.image}
                        width={400}
                        height={400}
                      />
                    )}
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-slate-800 rounded-box !z-50 mt-3 w-52 p-2 shadow"
                >
                  <li className="text-white focus:bg-violet-500 hover:bg-violet-500 transition duration-300 rounded-sm">
                    <a href="/profile" className="justify-between">
                      Profile
                    </a>
                  </li>

                  <li className="text-white focus:bg-violet-500 hover:bg-violet-500 transition duration-300 rounded-sm">
                    <button onClick={handleSignOut} className="justify-between">
                      SignOut
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
