import Navbar from "@/src/components/layout/navbar";
import Footer from "@/src/components/layout/footer";
import CheckoutForm from "@/src/components/store/checkout-form";
export default function CheckoutPage() {
  return (
    <>
      <Navbar />
      <CheckoutForm />
      <Footer />
    </>
  );
}
