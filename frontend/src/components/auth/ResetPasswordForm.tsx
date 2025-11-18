import { useState, type FormEvent } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { userStore } from "@/store/useUserStore";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function ResetPasswordForm() {
  const [newPassword, setNewPassword] = useState<string>("");
  const { resetPassword, loading } = userStore();
  const navigate = useNavigate();

  const { token } = useParams();

  if (!token) {
    return (
      <div className="text-center text-red-500">
        Invalid or missing reset token
      </div>
    );
  }

  const resetPasswordSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await resetPassword(token, newPassword);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Reset Password</CardTitle>
          <CardDescription>Enter your new password below.</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={resetPasswordSubmitHandler} className="space-y-4">
            <div>
              <Label>New Password</Label>
              <Input
                type="password"
                required
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-2"
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Resetting..." : "Reset Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
