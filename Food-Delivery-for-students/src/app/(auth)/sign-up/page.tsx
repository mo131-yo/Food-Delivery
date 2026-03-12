import { Signup } from "@/app/(auth)/sign-up/_components";
import { Suspense } from "react";

export default function SignUpPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Уншиж байна...</div>}>
      <Signup />
    </Suspense>
  )
}
