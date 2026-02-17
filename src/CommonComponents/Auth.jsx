import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { registerAPI, loginAPI, googleloginAPI } from "../sevices/Allapi";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

function Auth({ register }) {
  const [userInput, setUserInput] = useState({
    username: "",
    email: "",
    password: "",
    role: "Donor",
  });

  const [viewPasswordStatus, setViewPasswordStatus] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /* ------------------ REGISTER ------------------ */
  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, email, password } = userInput;

    if (username && email && password) {
      try {
        setLoading(true);

        const res = await registerAPI(userInput);

        if (res.status === 200) {
          toast.success("Registration successful... Please login");
          navigate("/login");
          setUserInput({
            username: "",
            email: "",
            password: "",
            role: "Donor",
          });
        } else if (res.status === 409) {
          toast.warning(res.response?.data || "User already exists");
        } else {
          toast.error("Something went wrong");
        }
      } catch (err) {
        console.log(err);
        toast.error("Server error");
      } finally {
        setLoading(false);
      }
    } else {
      toast.warning("Please fill the form completely");
    }
  };

  /* ------------------ LOGIN ------------------ */
  const handleLogin = async () => {
    const { email, password } = userInput;

    if (email && password) {
      try {
        setLoading(true);

        const res = await loginAPI({ email, password });

        if (res.status === 200) {
          toast.success("Logged in Successfully");

          sessionStorage.setItem(
            "users",
            JSON.stringify(res.data.users)
          );
          sessionStorage.setItem("token", res.data.token);

          setTimeout(() => {
            if (res.data.users.role === "Donor") {
              navigate("/donor/dashboard");
            } else if (res.data.users.role === "Volunteer") {
              navigate("/volunteer/dashboard");
            } else if (res.data.users.role === "Admin") {
              navigate("/admin/dashboard");
            }
          }, 1000);
        } else {
          toast.warning("Invalid credentials");
        }
      } catch (err) {
        console.log(err);
        toast.error("Login failed");
      } finally {
        setLoading(false);
      }
    } else {
      toast.warning("Please fill the form completely");
    }
  };

  /* ------------------ GOOGLE LOGIN ------------------ */
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      setLoading(true);

      const details = jwtDecode(credentialResponse.credential);

      const result = await googleloginAPI({
        username: details.name,
        email: details.email,
        password: "googlepwd",
        profile: details.picture,
      });

      if (result.status === 200) {
        toast.success("Logged in successfully");

        sessionStorage.setItem(
          "users",
          JSON.stringify(result.data.users)
        );
        sessionStorage.setItem("token", result.data.token);

        setTimeout(() => {
          if (result.data.users.role === "Admin") {
            navigate("/admin/dashboard");
          } else {
            navigate("/donor/dashboard");
          }
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      toast.error("Google Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <img
        src="/food.jpg"
        className="absolute inset-0 w-full h-full object-cover"
        alt="Food Sharing Background"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70"></div>

      {/* Card */}
      <div className="relative z-10 w-[90%] max-w-md p-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
        <h1 className="text-center font-['Playfair_Display'] text-4xl mb-6 tracking-wide text-white">
          FOOD DONATION
        </h1>

        <h2 className="text-center text-3xl font-semibold mb-8 text-white">
          {register ? "Create Account" : "Welcome Back"}
        </h2>

        <form className="flex flex-col">
          {/* Role Selection */}
          {register && (
            <div className="flex justify-around my-4">
              {["Donor", "Volunteer"].map((role) => (
                <label key={role} className="cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value={role}
                    checked={userInput.role === role}
                    onChange={(e) =>
                      setUserInput({ ...userInput, role: e.target.value })
                    }
                    className="hidden peer"
                  />
                  <div className="px-4 py-2 rounded-lg border border-white text-white peer-checked:bg-orange-500 transition">
                    {role}
                  </div>
                </label>
              ))}
            </div>
          )}

          {/* Username */}
          {register && (
            <input
              type="text"
              placeholder="Full Name"
              value={userInput.username}
              onChange={(e) =>
                setUserInput({ ...userInput, username: e.target.value })
              }
              className="bg-white/20 placeholder-gray-300 border border-white/30 text-white rounded-md my-2 p-3 focus:bg-white/30 transition"
            />
          )}

          {/* Email */}
          <input
            type="email"
            placeholder="Email Address"
            value={userInput.email}
            onChange={(e) =>
              setUserInput({ ...userInput, email: e.target.value })
            }
            className="bg-white/20 placeholder-gray-300 border border-white/30 text-white rounded-md my-2 p-3 focus:bg-white/30 transition"
          />

          {/* Password */}
          <div className="relative">
            <input
              type={viewPasswordStatus ? "text" : "password"}
              placeholder="Password"
              value={userInput.password}
              onChange={(e) =>
                setUserInput({ ...userInput, password: e.target.value })
              }
              className="bg-white/20 placeholder-gray-300 border border-white/30 text-white w-full rounded-md my-2 p-3 pr-10 focus:bg-white/30 transition"
            />

            <FontAwesomeIcon
              icon={viewPasswordStatus ? faEye : faEyeSlash}
              onClick={() => setViewPasswordStatus(!viewPasswordStatus)}
              className="text-white cursor-pointer absolute right-3 top-5"
            />
          </div>

          {/* Submit Button */}
          <button
            type="button"
            disabled={loading}
            onClick={register ? handleRegister : handleLogin}
            className={`bg-[#f97316] text-white font-semibold p-3 rounded-md transition shadow-lg flex justify-center items-center gap-2
            ${
              loading
                ? "opacity-70 cursor-not-allowed"
                : "hover:bg-[#ea580c]"
            }`}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </>
            ) : register ? (
              "Register"
            ) : (
              "Log In"
            )}
          </button>

          {/* Google Login */}
          {!register && (
            <div className="text-center mt-6">
              <p className="text-white/70 text-sm mb-4">
                ---------- or ----------
              </p>

              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={() =>
                    toast.error("Google Login Failed")
                  }
                />
              </div>
            </div>
          )}

          {/* Switch */}
          <div className="text-center mt-6">
            {register ? (
              <p className="text-white">
                Already have an account?{" "}
                <Link to="/login" className="text-[#f97316] underline">
                  Log In
                </Link>
              </p>
            ) : (
              <p className="text-white">
                New user?{" "}
                <Link to="/register" className="text-[#f97316] underline">
                  Register
                </Link>
              </p>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}

export default Auth;
