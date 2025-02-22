"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/actions/auth";
import { useActionState } from "react";
import { ActionResponse } from "@/types/types";
import { OAuthButtons } from "./oauth-button";
import { Separator } from "@/components/ui/separator";

const initialState: ActionResponse = {
  success: false,
  message: "",
};

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [state, action, pending] = useActionState(login, initialState);

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-2">
          <CardTitle className="flex items-center justify-center gap-2">
            <span className=" font-bold text-3xl">
              7seb<span className="text-primary">Sub</span>
            </span>
          </CardTitle>
          <CardDescription className="text-center">
            Welcome back! Please sign in to your account
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* OAuth Section */}
          <div className="space-y-4">
            <OAuthButtons />
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with email
              </span>
            </div>
          </div>

          <form action={action} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                required
                disabled={pending}
                className="w-full"
              />
            </div>

            {state.message && (
              <div
                className={cn(
                  "text-sm text-center p-2 rounded-md",
                  state.success
                    ? "bg-green-50 text-green-600"
                    : "bg-red-50 text-red-600"
                )}
              >
                {state.message}
              </div>
            )}

            <Button
              type="submit"
              className="w-full font-semibold"
              disabled={pending}
            >
              {pending ? "Sending link..." : "Send Magic Link"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="text-sm text-center text-muted-foreground">
          <p className="w-full">
            By continuing, you agree to our{" "}
            <a href="/terms" className="underline hover:text-primary">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="underline hover:text-primary">
              Privacy Policy
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
