import React from "react";

interface NavbarProps {
  name: string;
  fullName: string;
  role: string;
  avatar: string;
}

const Navbar: React.FC<NavbarProps> = ({ name, fullName, role, avatar }) => {
  return (
    <nav className="flex items-center gap-2 w-full justify-between">
      {/* Left */}
      <div className="flex items-center">
        <h2 className="text-xl font-semibold text-gray-800">
          <span>Welcome, </span>
          {name}
        </h2>
      </div>

      {/* Right */}
      <div className="flex items-center space-x-4">
        <div className="flex flex-col items-end">
          <span className="text-sm font-medium text-gray-900">
            {fullName}
          </span>
          <span className="text-xs text-gray-500 capitalize">
            {role}
          </span>
        </div>

        <img className="h-10 w-10 rounded-full object-cover" src={avatar || "/avatar.png"} alt={name} />
      </div>
    </nav>
  );
};

export default Navbar;