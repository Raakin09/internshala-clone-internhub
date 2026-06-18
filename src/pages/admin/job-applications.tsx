import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";

import AdminJobApplicationsTable from "@/components/AdminJobApplicationsTable";

export default function JobApplications() {
  return (
    <>
      <Navbar />

      <AdminJobApplicationsTable />

      <Footer />
    </>
  );
}