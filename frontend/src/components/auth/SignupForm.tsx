import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { userStore } from "@/store/useUserStore";
import { userSignupSchema, type SignupInputState } from "@/schema/userSchema";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SignupForm() {
  const [input, setInput] = useState<SignupInputState>({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const { signup } = userStore();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<SignupInputState>>({});

  const changeEventhandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const signupSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (input.password !== input.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      return;
    }

    const result = userSignupSchema.safeParse(input);
    if (!result.success) {
      const flattened = z.flattenError(result.error);
      const fieldErrors = flattened.fieldErrors;
      setErrors(fieldErrors as Partial<SignupInputState>);
      return;
    }

    try {
      setLoading(true);
      // console.log(input);
      await signup(input);
      navigate("/verify-email");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-1 flex-col justify-center px-4 py-10 lg:px-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h3 className="mt-2 text-center text-lg font-bold text-foreground dark:text-foreground">
            Create your account
          </h3>
        </div>

        <Card className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
          <CardContent>
            <form onSubmit={signupSubmitHandler} className="space-y-4">
              <div>
                <Label
                  htmlFor="name-login-05"
                  className="text-sm font-medium text-foreground dark:text-foreground"
                >
                  Fullname
                </Label>
                <Input
                  type="text"
                  value={input.fullname}
                  onChange={changeEventhandler}
                  id="fullname"
                  name="fullname"
                  placeholder="Fullname"
                  className="mt-2"
                />
                {errors && (
                  <span className="text-xs text-red-500">
                    {errors.fullname}
                  </span>
                )}
              </div>

              <div>
                <Label
                  htmlFor="email-login-05"
                  className="text-sm font-medium text-foreground dark:text-foreground"
                >
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  value={input.email}
                  onChange={changeEventhandler}
                  name="email"
                  autoComplete="email"
                  placeholder="ephraim@blocks.so"
                  className="mt-2"
                />
                {errors && (
                  <span className="text-xs text-red-500">{errors.email}</span>
                )}
              </div>

              <div>
                <Label
                  htmlFor="password-login-05"
                  className="text-sm font-medium text-foreground dark:text-foreground"
                >
                  Password
                </Label>
                <Input
                  type="password"
                  id="password"
                  value={input.password}
                  onChange={changeEventhandler}
                  name="password"
                  autoComplete="password"
                  placeholder="Password"
                  className="mt-2"
                />
                {errors && (
                  <span className="text-xs text-red-500">
                    {errors.password}
                  </span>
                )}
              </div>

              <div>
                <Label
                  htmlFor="confirm-password-login-05"
                  className="text-sm font-medium text-foreground dark:text-foreground"
                >
                  Confirm password
                </Label>
                <Input
                  type="password"
                  id="confirm-password"
                  name="confirmPassword"
                  value={input.confirmPassword}
                  onChange={changeEventhandler}
                  autoComplete="confirm-password"
                  placeholder="Password"
                  className="mt-2"
                />
                {errors && (
                  <span className="text-xs text-red-500">
                    {errors.confirmPassword}
                  </span>
                )}
              </div>

              {loading ? (
                <Button disabled className="mt-4 w-full py-2 font-medium">
                  <Loader2 className="animate-spin h-4 w-4" />
                </Button>
              ) : (
                <Button type="submit" className="mt-4 w-full py-2 font-medium">
                  Create account
                </Button>
              )}

              <p className="text-center text-xs text-muted-foreground dark:text-muted-foreground">
                By signing in, you agree to our{" "}
                <a
                  href="#"
                  className="capitalize text-primary hover:text-primary/90 dark:text-primary hover:dark:text-primary/90"
                >
                  Terms of use
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="capitalize text-primary hover:text-primary/90 dark:text-primary hover:dark:text-primary/90"
                >
                  Privacy policy
                </a>
              </p>
            </form>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-sm text-muted-foreground dark:text-muted-foreground">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-medium text-primary hover:text-primary/90 dark:text-primary hover:dark:text-primary/90"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
