"use client";
import EditProfileModal from "@/component/profile/EditProfileModal";
import ProtectedRoute from "@/ProtectedRoute/ProtectedRoute";
import { useGetUserProfileQuery } from "@/redux/features/auth/authApi";
import { useAppSelector } from "@/redux/features/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UserProfile = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const { data: profile } = useGetUserProfileQuery(undefined, { skip: !user });
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.replace("/signin?from=profile");
    }
  }, [user]);
  return (
    <ProtectedRoute allowedRoles={["admin", "user"]}>
      <div className="bg-slate-900 h-[87vh]">
        <div className="container mx-auto px-4 lg:px-8 pb-12 lg:pb-20">
          <div>
            <h1 className="text-slate-200 text-2xl lg:text-4xl text-center font-semibold tracking-wide pt-5">
              Profile
            </h1>
            <div className="w-30 h-30 mt-4 mx-auto">
              <Image
                className=" w-full rounded-full"
                src={profile?.image}
                alt="user image"
                width={400}
                height={400}
              />
            </div>
            <div className="text-slate-400 text-center">
              <h1 className="text-semibold my-1 text-xl lg:text-2xl">
                {profile?.name}
              </h1>
              <h1 className="text-semibold ">{profile?.role}</h1>
              <button
                onClick={() => setIsEditProfileModalOpen(true)}
                className="px-4 mt-1.5  text-white py-1 bg-lime-600 hover:bg-lime-500 transition duration-300 rounded cursor-pointer"
              >
                Edit Profile
              </button>
            </div>
            <hr className="lg:w-3/6 mx-auto w-10/12 text-slate-300 my-4" />
            <h1 className="text-semibold text-white mb-1 text-center text-xl lg:text-2xl">
              Contact Info
            </h1>
            <div>
              <h1 className="text-semibold text-slate-400 mb-0.5 text-center text-xl">
                {profile?.email}
              </h1>
              <h1 className="text-semibold text-slate-400 mb-0.5 text-center text-xl">
                {profile?.phone}
              </h1>
            </div>
          </div>
        </div>

        {/* edit profile modal */}
        {isEditProfileModalOpen && (
          <EditProfileModal
            isEditProfileModalOpen={isEditProfileModalOpen}
            closeIsEditProfileModal={() => setIsEditProfileModalOpen(false)}
          />
        )}
      </div>
    </ProtectedRoute>
  );
};

export default UserProfile;
