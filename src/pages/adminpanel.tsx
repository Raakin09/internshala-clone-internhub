import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import AdminDashboard from "@/components/AdminDashboard";

export default function AdminPanel() {
  const router = useRouter();

  const [authorized, setAuthorized] =
    useState(false);

  useEffect(() => {
    const isAdmin =
      localStorage.getItem("isAdmin");

    if (isAdmin === "true") {
      setAuthorized(true);
    } else {
      router.push("/admin/login");
    }
  }, []);

  if (!authorized) {
    return null;
  }

  return (
    <>
      <Navbar />
      <AdminDashboard />
      <Footer />
    </>
  );
}