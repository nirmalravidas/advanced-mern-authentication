import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { useState } from "react";
import { userStore } from "@/store/useUserStore";
import { useNavigate } from "react-router-dom";

export function VerifyEmailForm({
  ...props
}: React.ComponentProps<typeof Card>) {
  const verifyEmail = userStore((state) => state.verifyEmail);
  const loading = userStore((state) => state.loading);

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit code.");
      return;
    }

    setError("");

    try {
      const success = await verifyEmail(otp);
      if (success) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card {...props}>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Enter verification code</CardTitle>
        <CardDescription>We sent a 6-digit code to your email.</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleVerify}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="otp" className="sr-only">
                Verification code
              </FieldLabel>

              <InputOTP
                maxLength={6}
                id="otp"
                required
                value={otp}
                onChange={(value) => setOtp(value)}
              >
                <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>

              <FieldDescription className="text-center">
                Enter the 6-digit code sent to your email.
              </FieldDescription>

              {error && (
                <p className="text-red-500 text-center text-sm mt-2">{error}</p>
              )}
            </Field>

            <Button type="submit" disabled={loading}>
              {loading ? "Verifying..." : "Verify"}
            </Button>

            <FieldDescription className="text-center">
              Didn’t receive the code? <a href="/verify-email">Resend</a>
            </FieldDescription>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
