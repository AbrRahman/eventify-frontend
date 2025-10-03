export type TBooking = {
  _id: string;
  user: string;
  event: { title: string; seats: string; date: string };
  ticket: string;
  phone: string;
  paymentMethod: string;
  paymentStatus: "paid" | "unpaid";
};
