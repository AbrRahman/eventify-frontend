"use client";
import EventCard from "@/component/eventCard/EventCard";
import { useGetAllEventQuery } from "@/redux/features/event/eventApi";
import { setSearchTerm } from "@/redux/features/event/eventSlice";
import { setActiveMenu } from "@/redux/features/header/headerSlice";
import { useAppDispatch, useAppSelector } from "@/redux/features/hooks";
import { TEvent } from "@/types/events.types";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
const EventPage = () => {
  const { searchTerm } = useAppSelector((state) => state.event);
  const { data: events } = useGetAllEventQuery(searchTerm);
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const from = searchParams.get("from");

  //  navbar event throw coming when set search params value null
  useEffect(() => {
    if (!from && setSearchTerm) {
      dispatch(setSearchTerm(""));
    }
  }, [from, dispatch]);

  useEffect(() => {
    dispatch(setActiveMenu("Events"));
  }, [dispatch]);

  return (
    <div className="bg-slate-900">
      <div className="container mx-auto px-4 lg:px-8 pb-12 lg:pb-20">
        <h1 className="text-slate-200 text-2xl lg:text-3xl text-center">
          Browse Events
        </h1>
        <div className="mt-8 lg:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-4">
          {events?.map((event: TEvent) => (
            <EventCard key={event?._id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventPage;
