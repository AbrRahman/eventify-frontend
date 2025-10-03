export type TEvent = {
  _id: string;
  title: string;
  category: string;
  date: string;
  location: string;
  description: string;
  seats: number;
  price: number;
  image: string;
  organizer: string;
};

export type TEventInput = {
  title: string;
  category: string;
  description: string;
  date: string;
  location: string;
  seats: string;
  price: string;
  image: FileList;
  organizer: string;
};
