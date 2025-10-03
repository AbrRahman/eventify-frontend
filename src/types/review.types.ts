type TUser = {
  name: string;
  image: string;
};
export type TReview = {
  _id: string;
  comment: string;
  event: string;
  rating: string;
  user: TUser;
};
