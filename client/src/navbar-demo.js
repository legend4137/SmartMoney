import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./navbar-menu";
import { cn } from "./lib/utils.js";

export default function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }) {
  const [active, setActive] = useState(null);

  return (
    <div className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}>
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Services">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink to="/web-dev">Web Development</HoveredLink>
            <HoveredLink to="/interface-design">Interface Design</HoveredLink>
            <HoveredLink to="/seo">Search Engine Optimization</HoveredLink>
            <HoveredLink to="/branding">Branding</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Products">
        <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink to="/web-dev">Web Development</HoveredLink>
            <HoveredLink to="/interface-design">Interface Design</HoveredLink>
            <HoveredLink to="/seo">Search Engine Optimization</HoveredLink>
            <HoveredLink to="/branding">Branding</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Pricing">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink to="/hobby">Hobby</HoveredLink>
            <HoveredLink to="/individual">Individual</HoveredLink>
            <HoveredLink to="/team">Team</HoveredLink>
            <HoveredLink to="/enterprise">Enterprise</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
      <ProfileMenu setActive={setActive} active={active} />
    </div>
  );
}

function ProfileMenu({ setActive, active }) {
  return (
    <div className="absolute top-0 right-0 mt-4 mr-4">
      <MenuItem setActive={setActive} active={active} item={<ProfileImage />}>
        <div className="flex flex-col space-y-4 text-sm">
          <HoveredLink to="/manage-account">Manage Account</HoveredLink>
          <HoveredLink to="/logout">Log Out</HoveredLink>
        </div>
      </MenuItem>
    </div>
  );
}

function ProfileImage() {
  return (
    <div className="flex justify-center">
      <img
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAd5avdba8EiOZH8lmV3XshrXx7dKRZvhx-A&s"
      alt="Profile"
      className="w-10 h-10 rounded-full border-none border-white shadow-lg"
    />
    </div>
  );
}