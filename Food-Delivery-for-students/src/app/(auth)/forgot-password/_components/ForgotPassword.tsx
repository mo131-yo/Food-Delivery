"use client";

import { useState } from "react";
import { useFormik } from "formik";
import { determineValidationSchema, handleSendPasswordResetMail } from "@/lib";
import { ForgotPasswordEmailCard } from "./ForgotPasswordEmailCard";
import { ConfirmEmail } from "./ConfirmEmail";
import { toast } from "sonner";

export const ForgotPassword = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: determineValidationSchema(currentStep),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        await handleSendPasswordResetMail(values);
        toast.success("Reset link sent!");
        setCurrentStep(1); 
      } catch (error: any) {
        toast.error(error.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handlePrevious = () => {
    setCurrentStep(0);
  };

  const forgotPasswordEmailCardProps = {
    values: formik.values,
    errors: formik.errors,
    touched: formik.touched,
    handleChange: formik.handleChange,
    handleBlur: formik.handleBlur,
    handleNext: formik.handleSubmit,
    isLoading: isLoading,
  };

  const confirmEmailProps = {
    handlePrevious: handlePrevious,
    email: formik.values.email,
  };

  const StepComponents = [
    <ForgotPasswordEmailCard key={0} {...forgotPasswordEmailCardProps} />,
    <ConfirmEmail key={1} {...confirmEmailProps} />,
  ];

  return StepComponents[currentStep];
};