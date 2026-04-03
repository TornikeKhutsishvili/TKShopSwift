import React from "react";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { authUserSelector } from "../../../store/auth/slice/auth.slice";

const Header: React.FC = () => {
  const user = useSelector(authUserSelector);

  if (!user) return null;

  return (
    <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6">
      <Navbar
        name={user.firstName} fullName={`${user.firstName} ${user.lastName}`} role={user.role} avatar={typeof user.profileImage === "string" ? user.profileImage : ""}
      />
    </header>
  );
};

export default Header;