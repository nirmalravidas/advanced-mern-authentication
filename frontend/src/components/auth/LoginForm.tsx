import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { userLoginSchema, type LoginInputState } from "@/schema/userSchema";
import { userStore } from "@/store/useUserStore";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [input, setInput] = useState<LoginInputState>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState<Partial<LoginInputState>>({});
  const { login, loading } = userStore();
  const changeEventhandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const loginSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const result = userLoginSchema.safeParse(input);
    if (!result.success) {
      const flattened = z.flattenError(result.error);
      const fieldErrors = flattened.fieldErrors;
      setErrors(fieldErrors as Partial<LoginInputState>);
      return;
    }

    // console.log(input);

    try {
      await login(input);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-1 flex-col justify-center px-4 py-10 lg:px-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h3 className="mt-2 text-center text-lg font-bold text-foreground dark:text-foreground">
            Login into your account
          </h3>
        </div>

        <Card className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
          <CardContent>
            <form onSubmit={loginSubmitHandler} className="space-y-4">
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
                  name="email"
                  value={input.email}
                  onChange={changeEventhandler}
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

              {loading ? (
                <Button disabled className="mt-4 w-full py-2 font-medium">
                  <Loader2 />
                </Button>
              ) : (
                <Button type="submit" className="mt-4 w-full py-2 font-medium">
                  Login
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
          Don't have an account?{" "}
          <a
            href="/signup"
            className="font-medium text-primary hover:text-primary/90 dark:text-primary hover:dark:text-primary/90"
          >
            Signup
          </a>
        </p>
      </div>
    </div>
  );
}
