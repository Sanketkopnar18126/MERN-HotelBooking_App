import { Header } from "../Header/Header";
import { Outlet } from "react-router-dom";
import { Footer } from "../Footer/Footer";

export const Navigation = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
