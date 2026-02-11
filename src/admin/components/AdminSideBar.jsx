import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUserCheck,
  faHandHoldingHeart,
  faUser,
  faRightFromBracket,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { AdminProfileUpdateContext } from "../../context/Context";
import SERVER_URL from "../../sevices/Serverurl";

function AdminSidebar() {
  const [showMenu, setShowMenu] = useState(false);
  const [admin, setAdmin] = useState({ username: "", profile: "" });
  const navigate = useNavigate();
  const { adminProfileUpdated } = useContext(AdminProfileUpdateContext);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("users"));
    if (user) {
      setAdmin({
        username: user.username,
        profile: user.profile,
      });
    }
  }, [adminProfileUpdated]);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("users"); // ✅ better cleanup
    navigate("/login");
  };

  return (
    <>
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="md:hidden fixed top-4 right-4 z-50 p-2 rounded-lg bg-[#1a1a1a] text-white shadow-lg"
      >
        <FontAwesomeIcon icon={faBars} />
      </button>

      {showMenu && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setShowMenu(false)}
        />
      )}

      <aside
        className={`fixed md:sticky top-0 left-0 z-40 h-screen w-64 bg-[#1a1a1a] text-white flex flex-col justify-between px-4 py-6 transition-transform duration-300 ${
          showMenu ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="text-center mb-8">
          <img
            src={
              admin.profile
                ? `${SERVER_URL}/uploads/${admin.profile}`
                : "/user_icon.png"
            }
            alt="profile"
            className="h-20 w-20 mx-auto rounded-full mb-2 object-cover"
          />
          <h2 className="text-xl font-bold">{admin.username}</h2>
          <p className="text-sm text-white/60">Admin Panel</p>
        </div>

        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <Link
                to="/admin/dashboard"
                onClick={() => setShowMenu(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/70 hover:bg-[#f97316] hover:text-white transition-all"
              >
                <FontAwesomeIcon icon={faHouse} />
                Dashboard
              </Link>
            </li>

            <li>
              <Link
                to="/admin/manage-donations"
                onClick={() => setShowMenu(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/70 hover:bg-[#f97316] hover:text-white transition-all"
              >
                <FontAwesomeIcon icon={faHandHoldingHeart} />
                Manage Donations
              </Link>
            </li>

            <li>
              <Link
                to="/admin/manage-volunteers"
                onClick={() => setShowMenu(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/70 hover:bg-[#f97316] hover:text-white transition-all"
              >
                <FontAwesomeIcon icon={faUserCheck} />
                Manage Volunteers
              </Link>
            </li>

            <li>
              <Link
                to="/admin/profile"
                onClick={() => setShowMenu(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/70 hover:bg-[#f97316] hover:text-white transition-all"
              >
                <FontAwesomeIcon icon={faUser} />
                Profile
              </Link>
            </li>
          </ul>
        </nav>

        <div className="pt-4 border-t border-white/10 text-xs text-white/50">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-white/80 hover:text-white hover:bg-red-600 px-4 py-2 rounded-xl transition-all font-medium w-full"
          >
            <FontAwesomeIcon icon={faRightFromBracket} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar;
