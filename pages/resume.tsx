import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Resume() {
  const router = useRouter();
  useEffect(() => {
    router.push("/docs/DevinNguyen-SoftwareEngineer.pdf");
  }, []);
}