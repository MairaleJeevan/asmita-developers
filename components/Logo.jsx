// Logo.jsx
import Link from "next/link";
import Image from "next/image";
import React from "react";
import logo from "../public/assets/logobg1.png"; // adjust path if not in /public

const Logo = () => {
  return (
    <Link href="/" className="block">
      <Image
        src={logo}
        alt="Asmita Developers Logo"
        width={80}   // control width
        height={20}   // control height
        style={{ height: "auto", width: "100%" }} // keep responsive
        priority
      />
    </Link>
  );
};

export default Logo;
