import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";

import AdminJobsTable from "@/components/AdminJobsTable";

export default function ManageJobs() {
  return (
    <>
      <Navbar />

      <AdminJobsTable />

      <Footer />
    </>
  );
}