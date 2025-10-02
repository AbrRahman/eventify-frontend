import React from "react";
import EventCard from "../eventCard/EventCard";

const FeaturedEvents = () => {
  return (
    <div className="bg-slate-900">
      <div className="container mx-auto px-4 lg:px-8 pb-12 lg:pb-20">
        <h1 className="text-slate-200 text-2xl lg:text-3xl">Featured Events</h1>
        <div className="mt-8 lg:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <EventCard />
          {/* <EventCard />
          <EventCard /> */}
        </div>
      </div>
    </div>
  );
};

export default FeaturedEvents;
