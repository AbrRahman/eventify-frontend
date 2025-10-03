export type TSignUpInput = {
  name: string;
  email: string;
  image: FileList;
  password: string;
  phone: string;
};

export type TUser = {
  _id: string;
  email: string;
  role: "user" | "admin";
  iat: number;
  exp: number;
};
