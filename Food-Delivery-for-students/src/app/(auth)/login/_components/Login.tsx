"use client";

import { useFormik } from "formik";
import { loginValidationSchema } from "@/lib";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { FormInput } from "@/components/dynamic-inputs";
import { Button } from "@/components/ui/button";
import { DynamicCardHeader } from "@/components/card";
import { LoginFooter } from "./LoginFooter";
import { FooterButtons } from "@/components/auth";
import { loginInitialValues } from "@/constants";
import { useContext, useState } from "react";
import { UserContext } from "@/app/(main)/context";
import axios from "axios";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

export const Login = () => {
  const { push } = useRouter();
  const { login } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: loginInitialValues,
    validationSchema: loginValidationSchema,

    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const user = await login(values.email, values.password);
        
        toast.success("Login successfull!");

        if (user?.role === "ADMIN") {
          push("/food-menu");
        } else {
          push("/");
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          const message = error.response?.data?.message || "error";
          
          if (status === 404) {
            toast.error("user oldsongui, burtgelgui user bn esvel.");
            push("/sign-up");
            return;
          }
          toast.error(message);
        } else {
          toast.error("error .");
        }
      } finally {
        setIsLoading(false);
      }
    },
  });

  
  const passwordInputProps = {
    name: "password",
    placeholder: "Password",
    type: showPassword ? "text" : "password",
    value: formik.values.password,
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    inputError: formik.touched.password && formik.errors.password,
    inputErrorMessage: formik.errors.password,
    suffix: (
      <button type="button" onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    )
  };

  return (
    <Card className="w-[416px] border-none shadow-none gap-6 flex flex-col">
      <DynamicCardHeader
        title="Log in"
        description="Log in to enjoy your favorite dishes."
      />

      <CardContent className="p-0">
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
          <div className="grid items-start w-full gap-4 relative">
            <FormInput
              name="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}  
              onBlur={formik.handleBlur}
              inputError={formik.touched.email && formik.errors.email}
              inputErrorMessage={formik.errors.email}
            />
            
            <div className="relative w-full">
              <FormInput {...passwordInputProps} />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <Button 
              type="button"
              variant="link"
              className="p-0 underline w-fit"
              onClick={() => push("/forgot-password")}
            >
              Forgot password ?
            </Button>
          </div>
          
          <FooterButtons
            buttonDisable={formik.isSubmitting || !formik.isValid || !formik.dirty}
            buttonText={isLoading ? "Уншиж байна..." : "Let's Go"} 
          />
        </form>
      </CardContent>
      <LoginFooter />
    </Card>
  );
};