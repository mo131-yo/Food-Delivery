"use client";

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { determineValidationSchema, handleLastSignUp, handleSignUp } from "@/lib";
import { SignUpEmailBox } from "./SignUpEmailBox";
import { SignUpPasswordBox } from "./SignUpPasswordBox";
import { useRouter, useSearchParams } from "next/navigation";

export const Signup = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  
  const [currentStep, setCurrentStep] = useState<number>(0);

  useEffect(() => {
    if (token) {
      setCurrentStep(1);
    }
  }, [token]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: determineValidationSchema(currentStep),
  
  onSubmit: async (values) => {
  if (!token) {
    alert("Maileer irsen verify linken deer darj burtguulne uu");
    return;
  }

  try {
    const data = await handleLastSignUp({ 
      token: token, 
      password: values.password 
    });

    if (data) {
      alert("Burtgel amjilttai");
      push("/login");
    }
  } catch (err: any) {
    alert(err.message || "Aldaa garlaa");
  }
},
  });


const handleNext = async () => {
  if (currentStep === 0) {
    const errors = await formik.validateForm();
    
    if (!errors.email && formik.values.email) {
      try {
        await handleSignUp({ email: formik.values.email });
        alert("Verify mail ilgeesen. Mailee shalgaad linkeer orj irne uu");
      } catch (error: any) {
        alert(error.message || "Mail ilgeehed aldaa garlaa");
      }
    } else {
      formik.setFieldTouched("email", true);
    }
  }
};

  const handlePrevious = () => {
    setCurrentStep((previous) => previous - 1);
  };

  const emailBoxProps = {
    values: formik.values,
    errors: formik.errors,
    touched: formik.touched,
    handleChange: formik.handleChange,
    handleBlur: formik.handleBlur,
    handleNext: handleNext,
  };
  const passwordBoxProps = {
    values: formik.values,
    errors: formik.errors,
    touched: formik.touched,
    handleChange: formik.handleChange,
    handleBlur: formik.handleBlur,
    handleCreateAccount: formik.handleSubmit,
    handleBack: handlePrevious,
  };

  const StepComponents = [
    <SignUpEmailBox key={0} {...emailBoxProps} />,
    <SignUpPasswordBox key={1} {...passwordBoxProps} />,
  ];

  return StepComponents[currentStep];
};
