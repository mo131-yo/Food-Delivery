import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const HeaderUserInformationSkeleton = () => {
  return (
    <>
      <Skeleton className="h-10 rounded-full bg-secondary min-w-60" />
      <Skeleton className="rounded-full w-9 h-9 bg-secondary" />
      <Skeleton className="rounded-full w-9 h-9 bg-secondary" />
    </>
  );
};

export default HeaderUserInformationSkeleton;
