import React, { useState, useEffect, useContext } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { FaPhone, FaUser, FaLock } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import SERVER_URL from "../../sevices/Serverurl";
import { updateAdminAPI } from "../../sevices/Allapi";
import { toast } from "react-toastify";
import { AdminProfileUpdateContext } from "../../context/Context";

export default function AdminProfile() {
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    phone: "",
    profile: "",
    password: "",
  });

  const [preview, setPreview] = useState("");
  const [existingImg, setExistingImg] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👁️

  const { setAdminProfileUpdated } = useContext(AdminProfileUpdateContext);

  useEffect(() => {
    getUserProfile();
  }, []);

  const getUserProfile = () => {
    const data = JSON.parse(sessionStorage.getItem("users"));

    if (data) {
      setProfile({
        ...profile,
        username: data.username,
        email: data.email,
        phone: data.phone,
        password: data.password,
      });

      if (data.profile) {
        setExistingImg(`${SERVER_URL}/uploads/${data.profile}`);
      }
    }
  };

  const handleImage = (e) => {
    setProfile({ ...profile, profile: e.target.files[0] });
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const updateProfile = async () => {
    const { username, phone, password } = profile;

    if (username && phone && password) {
      const token = sessionStorage.getItem("token");

      const reqHeader = {
        authorization: `Bearer ${token}`,
      };

      try {
        if (preview) {
          const reqBody = new FormData();

          for (let key in profile) {
            reqBody.append(key, profile[key]);
          }

          const result = await updateAdminAPI(reqBody, reqHeader);

          if (result.status === 200) {
            toast.success("Admin profile updated successfully");
            sessionStorage.setItem("users", JSON.stringify(result.data));
            setAdminProfileUpdated(result.data);
          }
        } else {
          const result = await updateAdminAPI(profile, reqHeader);

          if (result.status === 200) {
            toast.success("Admin profile updated successfully");
            sessionStorage.setItem("users", JSON.stringify(result.data));
            setAdminProfileUpdated(result.data);
          }
        }
      } catch (err) {
        console.log(err);
        toast.error("Profile update failed");
      }
    } else {
      toast.warning("Please fill all required fields");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="md:flex">
        <AdminSidebar/>

        <main className="flex-1 p-6 md:pt-10">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">

            {/* Header */}
            <div className="relative h-40 bg-gradient-to-r from-orange-400 to-orange-500">
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=60"
                alt="profile-bg"
                className="absolute inset-0 w-full h-full object-cover opacity-20"
              />
            </div>

            {/* Avatar */}
            <div className="flex justify-center -mt-12 mb-6">
              <div className="relative">
                <label htmlFor="file" className="cursor-pointer">
                  {preview ? (
                    <img
                      src={preview}
                      alt="preview"
                      className="w-[100px] h-[100px] rounded-full border-4 border-white shadow-lg object-cover"
                    />
                  ) : existingImg ? (
                    <img
                      src={existingImg}
                      alt="profile"
                      className="w-[100px] h-[100px] rounded-full border-4 border-white shadow-lg object-cover"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faCircleUser}
                      className="text-[100px]"
                      style={{ color: "#aaaeb6" }}
                    />
                  )}
                </label>

                <input type="file" id="file" hidden onChange={handleImage} />
              </div>
            </div>

            {/* Form */}
            <div className="p-6">
              <h1 className="text-2xl font-bold text-center">
                Admin Profile
              </h1>
              <p className="text-gray-600 mt-1 text-center">
                Update your personal details.
              </p>

              {/* Name */}
              <div className="flex items-center gap-3 mt-6">
                <FaUser className="text-gray-400 w-5 h-5" />
                <input
                  value={profile.username}
                  onChange={(e) =>
                    setProfile({ ...profile, username: e.target.value })
                  }
                  placeholder="Admin Name"
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                />
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3 mt-4">
                <FaPhone className="text-gray-400 w-5 h-5" />
                <input
                  value={profile.phone}
                  onChange={(e) =>
                    setProfile({ ...profile, phone: e.target.value })
                  }
                  placeholder="Phone number"
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                />
              </div>

              {/* Password with Eye */}
              <div className="flex items-center gap-3 mt-4 relative">
                <FaLock className="text-gray-400 w-5 h-5" />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New password"
                  onChange={(e) =>
                    setProfile({ ...profile, password: e.target.value })
                  }
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2 pr-10 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                />

                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 cursor-pointer text-gray-400 hover:text-orange-500"
                >
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                  />
                </span>
              </div>

              {/* Save */}
              <div className="flex justify-center mt-6">
                <button
                  onClick={updateProfile}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg shadow-md transition"
                >
                  Save Changes
                </button>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
