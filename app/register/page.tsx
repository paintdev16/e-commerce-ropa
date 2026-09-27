import Navbar from "@/src/components/layout/navbar";
import Footer from "@/src/components/layout/footer";
import DemoForm from "@/src/components/account/demo-form";
export default function RegisterPage() {
  return (
    <>
      <Navbar />
      <DemoForm register />
      <Footer />
    </>
  );
}
