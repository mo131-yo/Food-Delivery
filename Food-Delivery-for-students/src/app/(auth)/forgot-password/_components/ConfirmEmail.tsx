"use client";

import { Card, CardContent } from "@/components/ui/card";
import { DynamicCardHeader } from "@/components/card";
import { BackButton } from "@/components/button";
import { FooterButtons } from "@/components/auth";
import { handleSendPasswordResetMail } from "@/lib";
import { useState } from "react";
import { toast } from "sonner";
type ConfirmEmailProps = {
  email: string;
  handlePrevious: () => void;
};

export const ConfirmEmail = ({ email, handlePrevious }: ConfirmEmailProps) => {
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    setIsSending(true);
    try {
      await handleSendPasswordResetMail({ email: email });
      toast.success("Verification link sent to your email!");
    } catch (error) {
      toast.error("Failed to send email. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Card className="w-[416px] border-none shadow-none gap-6 flex flex-col">
      <BackButton handleClick={handlePrevious} />

      <div>
        <DynamicCardHeader title="Please verify Your Email" />
        <p className="text-muted-foreground mt-2">
          We just sent an email to <span className="text-primary font-medium">{email}</span>. 
          Click the link in the email to verify your account.
        </p>
      </div>

      <CardContent className="p-0 h-fit">
        <FooterButtons
          buttonText={isSending ? "Sending..." : "Resend link"}
          buttonDisable={isSending}
          handleClick={handleSend}
        />
      </CardContent>
    </Card>
  );
};