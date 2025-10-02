import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Music, Users, DollarSign, User } from "lucide-react";

const EventCard = () => {
  const date = new Date("2025-12-01");
  const formatted = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div>
      <div className="card bg-slate-800 shadow-sm">
        <figure>
          <Image
            src="/images/music.png"
            alt="music image"
            width={650}
            height={400}
          />
        </figure>
        <div className="card-body ">
          <h2 className="card-title text-slate-300">Summer Music Festival</h2>
          <p className="text-slate-400 tracking-wide leading-relaxed">
            A vibrant outdoor music festival featuring popular bands and DJs.
          </p>
          <div className="flex">
            <span className="text-lime-500 font-semibold px-3 py-1 rounded bg-slate-900">
              Music
            </span>
          </div>
          <div className="py-4 space-y-2">
            {/* date and price */}
            <div className="flex gap-4 items-center">
              <div className="flex gap-2.5 items-center">
                <Calendar className=" size-5 text-lime-500" />
                <p className="text-slate-400 font-semibold">{formatted}</p>
              </div>
              <div className="flex gap-0.5 items-center">
                <DollarSign className=" size-5 text-lime-500" />
                <p className="text-slate-400 font-bold">{"100"}</p>
              </div>
            </div>
            {/* location */}
            <div className="flex gap-2.5 items-center">
              <MapPin className=" size-5 text-lime-500" />
              <p className="text-slate-400 font-semibold">
                {"Central Park, New York"}
              </p>
            </div>
          </div>
          <div className="card-actions justify-start">
            <Link
              className="text-white px-4 py-1.5 bg-violet-500 tracking-wide rounded hover:bg-violet-600 transition"
              href={`events/${"id"}`}
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
