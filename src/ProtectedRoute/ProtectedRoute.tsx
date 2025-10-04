"use client";

import { useAppSelector } from "@/redux/features/hooks";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

type protectedRouteProps = {
  children: ReactNode;
  allowedRoles?: string[];
};
const ProtectedRoute = ({ children, allowedRoles }: protectedRouteProps) => {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      router.replace(
        `/signin?from=${encodeURIComponent(window.location.pathname)}`
      );
      return;
    }
  }, [user]);

  if (!user) return null;
  if (allowedRoles && !allowedRoles.includes(user.role)) return null;
  return <>{children}</>;
};

export default ProtectedRoute;
