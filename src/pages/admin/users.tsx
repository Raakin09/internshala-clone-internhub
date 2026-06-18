import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import AdminUsersTable from "@/components/AdminUsersTable";

export default function Users() {
  return (
    <>
      <Navbar />
      <AdminUsersTable />
      <Footer />
    </>
  );
}