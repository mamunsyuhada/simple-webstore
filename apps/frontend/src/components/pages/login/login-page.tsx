'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AuthService from "@/view-model/auth/services/service"
import { useEffect, useState } from "react";
import cookies from "@/services/cookies"
import { useRouter } from "next/navigation"
import { jwtDecode } from "jwt-decode"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const payload = { email, password };
    try {
      const { result, error } = await AuthService.login(payload);
      if (error) {
        setErrorMessage(error.response.data.message);
        console.error("Login failed:", error.response.data.message);
      } else {
        console.log("Login successful:", result);
        if (result) {
          cookies.set("access_token", result.token);
          // Decode the JWT token
          const decodedToken: { role: string } = jwtDecode(result.token);
          if(decodedToken.role==='admin'){
            router.push('/admin')
          } else {
            router.push('/client')
          }
        }
      }
    } catch (err) {
      setErrorMessage("An unexpected error occurred. Please try again.");
      console.error("An unexpected error occurred:", err);
    }
  };

  useEffect(() => {
    if(cookies.get("access_token")){
      router.push('/admin')
    }
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  onChange={e=>setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  onChange={e=>setPassword(e.target.value)}
                  required
                />
              </div>
              {errorMessage && (
                <div className="text-red-500 text-sm">
                  {errorMessage}
                </div>
              )}
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}