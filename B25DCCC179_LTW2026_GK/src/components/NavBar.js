import { NavLink } from "react-router-dom";

const NavBar = () => (
  <nav className="navbar">
    <span className="brand">CLB Lập trình</span>
    <NavLink to="/" end>Trang chủ</NavLink>
    <NavLink to="/events" end>Danh sách</NavLink>
    <NavLink to="/events/new" end>Thêm mới</NavLink>
  </nav>
);

export default NavBar;
