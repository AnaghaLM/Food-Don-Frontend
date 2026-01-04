import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faPlusCircle,
  faList,
  faUser,
  faRightFromBracket,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import SERVER_URL from "../../sevices/Serverurl";

import { DonorProfileUpdateContext } from "../../context/Context";
import { useContext } from "react";


function DonorSidebar() {
  const [showMenu, setShowMenu] = useState(false);
  const [donor, setDonor] = useState({ username: "", profile: "" });
  const navigate = useNavigate();

  const {profileUpdated}=useContext(DonorProfileUpdateContext)

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("users"));
    if (user) {
      setDonor({ username: user.username, profile: user.profile });
    }
  }, [profileUpdated]);

  const handleLogout = () => {
     sessionStorage.clear()
    navigate('/login')
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="md:hidden fixed top-4 right-4 z-50 p-2 rounded-lg bg-[#1a1a1a] text-white shadow-lg"
      >
        <FontAwesomeIcon icon={faBars} />
      </button>

      {/* Overlay */}
      {showMenu && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setShowMenu(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-40 h-screen w-64 bg-[#1a1a1a] text-white flex flex-col justify-between px-4 py-6 transition-transform duration-300 ${
          showMenu ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Header with profile */}
        <div className="text-center mb-8">
          <img
            src={donor.profile === "" ? "/user_icon.png" : `${SERVER_URL}/uploads/${donor.profile}`}
            alt="profile"
            className="h-20 w-20 mx-auto rounded-full mb-2"
          />
          <h2 className="text-xl font-bold text-white">{donor.username}</h2>
          <p className="text-sm text-white/60">Donor Panel</p>
        </div>

        {/* Menu */}
        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <Link
                to="/donor/dashboard"
                onClick={() => setShowMenu(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/70 hover:bg-[#f97316] hover:text-white transition-all"
              >
                <FontAwesomeIcon icon={faHouse} />
                Dashboard
              </Link>
            </li>

            <li>
              <Link
                to="/donor/create-donation"
                onClick={() => setShowMenu(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/70 hover:bg-[#f97316] hover:text-white transition-all"
              >
                <FontAwesomeIcon icon={faPlusCircle} />
                Create Donation
              </Link>
            </li>

            <li>
              <Link
                to="/donor/history"
                onClick={() => setShowMenu(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/70 hover:bg-[#f97316] hover:text-white transition-all"
              >
                <FontAwesomeIcon icon={faList} />
                My Donations
              </Link>
            </li>

            <li>
              <Link
                to="/donor/profile"
                onClick={() => setShowMenu(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/70 hover:bg-[#f97316] hover:text-white transition-all"
              >
                <FontAwesomeIcon icon={faUser} />
                Profile
              </Link>
            </li>
          </ul>
        </nav>

        {/* Footer */}
        <div className="pt-4 border-t border-white/10 text-xs text-white/50 flex flex-col gap-2">
          <Link to="/contact" className="text-[#f97316] hover:underline">
            Contact Support
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-white/80 hover:text-white hover:bg-red-600 px-4 py-2 rounded-xl transition-all font-medium"
          >
            <FontAwesomeIcon icon={faRightFromBracket} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default DonorSidebar;
