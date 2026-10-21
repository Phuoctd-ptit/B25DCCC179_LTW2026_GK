import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const Layout = ({ loading, error }) => (
  <div className="app">
    <NavBar />
    <main className="content">
      {loading ? (
        <p className="status">Đang tải...</p>
      ) : error ? (
        <p className="status error">{error}</p>
      ) : (
        <Outlet />
      )}
    </main>
  </div>
);

export default Layout;
