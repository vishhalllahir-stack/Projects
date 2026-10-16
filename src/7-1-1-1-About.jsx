import { NavLink , Outlet } from "react-router-dom";
import "./7-1-1-1-1-About.css";

export default function TwebAbout() {
  return (
    <>
      <div className="AboutHeader">
        <NavLink to="">Toyota In India</NavLink>
        <NavLink to="history">History</NavLink>
        <NavLink to="vision">Vision</NavLink>
        <NavLink to="media">Media</NavLink>
        <NavLink to="award">Awards</NavLink>
      </div>
      <Outlet />
    </>
  );
}