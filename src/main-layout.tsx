import { ModalWarning } from "./pages/components";
import { Outlet } from "react-router";
import { Toaster } from "@/components/ui/toaster";

const MainLayout = () => {
  return (
    <>
      <Outlet />
      <ModalWarning />
      <Toaster />
    </>
  );
};
export default MainLayout;
