// FILE: admin/src/Root.jsx  (full rewrite  now the PUBLIC layout only)
import { Outlet } from "react-router-dom";
import ScrollToTop from "./Components/ScrollToTop";

export default function Root() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}
