import EventCard from "@/component/eventCard/EventCard";
import { TEvent } from "@/types/events.types";
const page = () => {
  const events: TEvent[] = [
    {
      _id: "evt1",
      title: "Summer Music Festival",
      category: "Music",
      date: "2025-07-15",
      location: "Central Park, New York",
      description:
        "A vibrant outdoor music festival featuring popular bands and DJs.",
      seats: 500,
      price: 50,
      image: "https://example.com/images/music-festival.jpg",
      organizer: "NYC Music Group",
    },
    {
      _id: "evt2",
      title: "Tech Innovators Conference",
      category: "Tech",
      date: "2025-08-20",
      location: "San Francisco Convention Center",
      description:
        "A conference showcasing the latest in AI, blockchain, and future technologies.",
      seats: 300,
      price: 199,
      image: "https://example.com/images/tech-conference.jpg",
      organizer: "TechWorld Inc.",
    },
    {
      _id: "evt3",
      title: "National Basketball League Finals",
      category: "Sports",
      date: "2025-06-10",
      location: "Staples Center, Los Angeles",
      description:
        "The thrilling finals of the national basketball championship.",
      seats: 1000,
      price: 120,
      image: "https://example.com/images/basketball-finals.jpg",
      organizer: "NBA League",
    },
    {
      _id: "evt4",
      title: "Startup Pitch Night",
      category: "Business",
      date: "2025-05-12",
      location: "Downtown Business Hub, Chicago",
      description:
        "An event where startups pitch their ideas to investors and mentors.",
      seats: 200,
      price: 30,
      image: "https://example.com/images/pitch-night.jpg",
      organizer: "Chicago Startup Network",
    },
    {
      _id: "evt5",
      title: "Health & Wellness Expo",
      category: "Health",
      date: "2025-09-05",
      location: "Miami Beach Convention Center",
      description:
        "Explore fitness, nutrition, and wellness products with live sessions.",
      seats: 400,
      price: 20,
      image: "https://example.com/images/health-expo.jpg",
      organizer: "WellLife Association",
    },
    {
      _id: "evt6",
      title: "Art & Culture Fair",
      category: "Art",
      date: "2025-10-18",
      location: "Louvre, Paris",
      description:
        "An international fair showcasing fine art, crafts, and cultural exhibits.",
      seats: 350,
      price: 60,
      image: "https://example.com/images/art-fair.jpg",
      organizer: "Paris Art Council",
    },
    {
      _id: "evt7",
      title: "Food & Wine Festival",
      category: "Food",
      date: "2025-11-12",
      location: "Napa Valley, California",
      description:
        "Taste gourmet dishes and exquisite wines from around the world.",
      seats: 600,
      price: 80,
      image: "https://example.com/images/food-wine.jpg",
      organizer: "Culinary World Group",
    },
    {
      _id: "evt8",
      title: "Film Premiere: The Future Awaits",
      category: "Entertainment",
      date: "2025-06-25",
      location: "Hollywood Boulevard, Los Angeles",
      description:
        "Exclusive red carpet premiere of the upcoming blockbuster film.",
      seats: 300,
      price: 100,
      image: "https://example.com/images/film-premiere.jpg",
      organizer: "Hollywood Studios",
    },
    {
      _id: "evt9",
      title: "Climate Change Awareness Summit",
      category: "Environment",
      date: "2025-12-01",
      location: "Berlin International Center",
      description:
        "Global leaders and activists discuss solutions for climate change.",
      seats: 500,
      price: 45,
      image: "https://example.com/images/climate-summit.jpg",
      organizer: "Global Green Foundation",
    },
  ];
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

export default page;
