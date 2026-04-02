import React from "react";
import FooterTemplate from "./FooterTemplate";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t mt-10">
      <FooterTemplate currentYear={currentYear} />
    </footer>
  );
};

export default Footer;