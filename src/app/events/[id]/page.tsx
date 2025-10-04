"use client";
import Image from "next/image";
import { Calendar, MapPin, Users, DollarSign, User } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useGetSingleEventQuery } from "@/redux/features/event/eventApi";
import { useAppDispatch, useAppSelector } from "@/redux/features/hooks";
import { setRegisterEventId } from "@/redux/features/auth/authSlice";
import { useEffect } from "react";
import { setActiveMenu } from "@/redux/features/header/headerSlice";

const EventDetails = () => {
  const { id } = useParams();
  const { data: event } = useGetSingleEventQuery(id);
  const { user } = useAppSelector((state) => state?.auth);
  const router = useRouter();
  const dispatch = useAppDispatch();
  // handle booking registration
  const handleBookingRegistration = () => {
    if (!user) {
      router.replace("/signin?from=event-registration");
    } else {
      dispatch(setRegisterEventId(id));
      router.replace("/event-registration");
    }
  };

  const date = new Date(event?.date);
  const formatted = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  useEffect(() => {
    dispatch(setActiveMenu("Event Details"));
  }, [dispatch]);

  return (
    <div className="bg-slate-900">
      <div className="container mx-auto px-4 lg:px-8 pb-12 lg:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-12 pt-8 gap-4">
          <div className=" lg:col-span-7 order-2 lg:order-1  flex items-center">
            <div>
              <h1 className="text-slate-200 tabs-2xl lg:text-4xl font-semibold tracking-wide mt-8 lg:mt-0 ">
                {event?.title}
              </h1>
              <p className="text-slate-400 text-xl mt-5 tracking-wide leading-relaxed">
                {event?.description}
              </p>
              <div className="mt-5 space-y-5">
                <div className="flex">
                  <span className="text-lime-500 text-2xl font-semibold px-3 py-1 rounded bg-slate-800">
                    {event?.category}
                  </span>
                </div>
                {/* date and price */}
                <div className="flex gap-4 items-center">
                  <div className="flex gap-2.5 items-center">
                    <Calendar className=" size-7 text-lime-500" />
                    <p className="text-slate-400 text-xl font-semibold">
                      {formatted}
                    </p>
                  </div>
                  <div className="flex gap-0.5 items-center">
                    <DollarSign className=" size-7 text-lime-500" />
                    <p className="text-slate-400 text-xl font-bold">
                      {event?.price}
                    </p>
                  </div>
                </div>
                {/* location */}
                <div className="flex gap-2.5 items-center">
                  <MapPin className=" size-7 text-lime-500" />
                  <p className="text-slate-400 text-xl font-semibold">
                    {event?.location}
                  </p>
                </div>
                {/* Available sets*/}
                <div className="flex gap-2.5 items-center">
                  <Users className=" size-7 text-lime-500" />
                  <p className="text-slate-400 text-xl font-semibold">
                    {event?.seats} <span>(Sets Available)</span>
                  </p>
                </div>
                {/* organizer */}
                <div className="flex gap-2.5 items-center">
                  <User className=" size-7 text-lime-500" />
                  <p className="text-slate-400 text-xl font-semibold">
                    {event?.organizer}
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <button
                  onClick={handleBookingRegistration}
                  className="bg-lime-500 hover:bg-lime-400 text-slate-200 tracking-wide text-xl transition duration-300 rounded cursor-pointer px-4 py-2"
                >
                  Register Now
                </button>
              </div>
            </div>
          </div>
          <div className=" lg:col-span-5 order-1 lg:order-2">
            <Image
              className=" w-full"
              src="/images/music.png"
              alt="event image"
              width={650}
              height={400}
            />
          </div>
        </div>

        <h1>hello world</h1>
      </div>
    </div>
  );
};

export default EventDetails;
