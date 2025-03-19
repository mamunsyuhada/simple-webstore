import { useRouter } from "next/navigation";
import cookies from "@/services/cookies";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  role: string;
}

export function useAuth() {
  const router = useRouter();
  const token = cookies.get("access_token");
  let decodedToken: DecodedToken | null = null;

  if (!token) {
    router.push("/");
    return null;
  } else {
    decodedToken = jwtDecode<DecodedToken>(token);
  }

  if (decodedToken?.role !== "admin") {
    router.push("/");
    return null;
  }

  return decodedToken;
}
