import Navbar from "@/src/components/layout/navbar";
import Footer from "@/src/components/layout/footer";
import FavoritesPage from "@/src/components/store/favorites-page";
export default function FavoritesRoute() {
  return (
    <>
      <Navbar />
      <FavoritesPage />
      <Footer />
    </>
  );
}
