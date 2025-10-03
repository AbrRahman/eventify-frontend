"use client";
import React from "react";
import EventCard from "../eventCard/EventCard";
import { TEvent } from "@/types/events.types";
import { useGetAllEventQuery } from "@/redux/features/event/eventApi";

const FeaturedEvents = () => {
  const { data: events } = useGetAllEventQuery(undefined);

  return (
    <div className="bg-slate-900">
      <div className="container mx-auto px-4 lg:px-8 pb-12 lg:pb-20">
        <h1 className="text-slate-200 text-2xl lg:text-3xl">Featured Events</h1>
        <div className="mt-8 lg:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-4">
          {(events?.length > 3 ? events?.slice(0, 3) : events)?.map(
            (event: TEvent) => (
              <EventCard key={event?._id} event={event} />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedEvents;
