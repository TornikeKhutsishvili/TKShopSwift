import React from "react";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { authUserSelector } from "../../../store/auth/slice/auth.slice";

const Header: React.FC = () => {
  const user = useSelector(authUserSelector);

  if (!user) return null;

  const { firstName, lastName, role, profileImage } = user;
  const avatar = profileImage ?? "";

  return (
    <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6">
      <Navbar
        name={firstName} fullName={`${firstName} ${lastName}`} role={role} avatar={avatar}
      />
    </header>
  );
};

export default Header;