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
import { useState } from "react";
import cookies from "@/services/cookies"
import { jwtDecode } from "jwt-decode"
import { useRouter } from "next/navigation"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const payload = { email, password };
    try {
      const { result, error } = await AuthService.login(payload);
      if (error) {
        alert(`Login failed: ${error}`);
        console.error("Login failed:", error);
      } else {
        console.log("Login successful:", result);
        cookies.set("access_token", result.token);

        // Decode the JWT token
        const decodedToken: { role: string } = jwtDecode(result.token);
        if(decodedToken.role==='admin'){
          router.push('/dashboard')
        }
      }
    } catch (err) {
      console.error("An unexpected error occurred:", err);
    }
  };

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
          <form>
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
              <Button onClick={onLogin} type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
