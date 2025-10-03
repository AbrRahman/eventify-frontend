import { jwtDecode } from "jwt-decode";

type TVerifyUser = {
  email: string;
  exp: number;
  iat: number;
  role: "user" | "admin";
  _id: string;
};

export const verifyToken = (token: string) => {
  const user = jwtDecode(token) as TVerifyUser;
  return user;
};
