import Navbar from "@/src/components/layout/navbar";
import Footer from "@/src/components/layout/footer";
import CartPage from "@/src/components/store/cart-page";
export default function CartRoute() {
  return (
    <>
      <Navbar />
      <CartPage />
      <Footer />
    </>
  );
}
