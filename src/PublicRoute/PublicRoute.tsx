"use client";

import { useAppSelector } from "@/redux/features/hooks";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

type PublicRouteProps = {
  children: ReactNode;
};
const PublicRoute = ({ children }: PublicRouteProps) => {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      router.replace("/");
      return;
    }
  }, [user]);

  if (user) return null;
  return <>{children}</>;
};

export default PublicRoute;
