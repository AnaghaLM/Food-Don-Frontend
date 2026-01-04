import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { registerAPI,loginAPI,googleloginAPI } from "../sevices/Allapi";
import {toast} from 'react-toastify'
import { GoogleLogin } from '@react-oauth/google';


import {jwtDecode} from 'jwt-decode'


function Auth({ register }) {

  const [userInput, setUserInput] = useState({
    username: "",
    email: "",
    password: "",
    role: "Donor"
  });

  console.log(userInput)

 
  const [viewPasswordStatus, setViewPasswordStatus] = useState(false);

  const navigate=useNavigate()





    const handleRegister = async (e) => {
    e.preventDefault();
    const { username, email, password, role} = userInput;
    console.log("inside the handleRegister", userInput);

    if (username && email && password) {
      try {
        const res = await registerAPI(userInput);
        console.log(res);

        if (res.status === 200) {
          toast.success("Registration successfull... Please login");
          navigate("/login");
          setUserInput({ username: "", email: "", password: "", role: "Donor" });
        } else if (res.status === 409) {
          toast.warning(res.response.data);
        } else {
          toast.error("Something went wrong");
        }
      } catch (err) {
        console.log(err);
        toast.error("Server error");
      }
    } else {
      toast.warning("Please fill the form completely");
    }
  };





  const handleLogin = async () => {

    const { email, password } = userInput

    if (email && password) {

      try {

        const res = await loginAPI({ email, password })
        console.log(res);


        if (res.status == 200) {
          toast.success("Logged in Successfull")
          sessionStorage.setItem("users",JSON.stringify(res.data.users))
          sessionStorage.setItem("token", (res.data.token))

          setTimeout(() => {

            if (res.data.users.role == "Donor") {
              navigate('/donor/dashboard')
            }
            else if (res.data.users.role == "Volunteer") {
              navigate('/volunteer/dashboard')
            }
            else if (res.data.users.role == "Admin") {
              navigate('/admin/dashboard')
            }

          }, 1000);
        }
        else if (res.status == 401) {
          toast.warning(res.response.data)
          setUserInput({ name: "", password: "", email: "", role:"Donor"})
        }
        else if (res.status == 404) {
          toast.warning(res.response.data)
          setUserInput({ name: "", password: "", email: "", role: "Donor" })
        }
        else {
          toast.warning("Somthing went wrong")
          setUserInput({ name: "", password: "", email: "", role: "Donor" })
        }


      }
      catch (err) {
        console.log(err);

      }

    }
    else {
      toast.warning("Please fill the form completely")
    }

  }

 const handleGoogleLogin = async (credentialResponse) => {
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

   
    sessionStorage.setItem(
      "token",
      result.data.token
    );

    setTimeout(() => {
      if (result.data.users.role === "Admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/donor/dashboard"); 
      }
    }, 1000);
  }
};


  return (
    <main className="relative min-h-screen flex items-center justify-center">

      <img
        src="/food.jpg"
        className="absolute inset-0 w-full h-full object-cover"
        alt="Food Sharing Background"
      />

     
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70"></div>

      
      <div className="relative z-10 w-[90%] max-w-md p-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
        
        <h1 className="text-center font-['Playfair_Display'] text-4xl mb-6 tracking-wide text-white">
          FOOD DONATION
        </h1>

        <h2 className="text-center text-3xl font-semibold mb-8 text-white">
          {register ? "Create Account" : "Welcome Back"}
        </h2>

        <form className="flex flex-col">

          
          {register && (
            <div className="flex justify-around my-4">
            
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="Donor"
                  checked={userInput.role === "Donor"}
                  onChange={(e) => setUserInput({ ...userInput, role: e.target.value })}
                  className="hidden peer"
                />
                <div className="px-4 py-2 rounded-lg border border-white text-white peer-checked:bg-orange-500 peer-checked:text-white transition">
                  Donor
                </div>
              </label>

            
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="Volunteer"
                  checked={userInput.role === "Volunteer"}
                  onChange={(e) => setUserInput({ ...userInput, role: e.target.value })}
                  className="hidden peer"
                />
                <div className="px-4 py-2 rounded-lg border border-white text-white peer-checked:bg-orange-500 peer-checked:text-white transition">
                  Volunteer
                </div>
              </label>
            </div>
          )}

          
          {register && (
            <input
              type="text"
              placeholder="Full Name"
              value={userInput.username}
              onChange={(e) => setUserInput({ ...userInput, username: e.target.value })}
              className="bg-white/20 placeholder-gray-300 border border-white/30 text-white rounded-md my-2 p-3 focus:bg-white/30 focus:border-white transition"
            />
          )}

      
          <input
            type="email"
            placeholder="Email Address"
            value={userInput.email}
            onChange={(e) => setUserInput({ ...userInput, email: e.target.value })}
            className="bg-white/20 placeholder-gray-300 border border-white/30 text-white rounded-md my-2 p-3 focus:bg-white/30 focus:border-white transition"
          />

          <div className="flex items-center justify-end relative">
            <input
              type={viewPasswordStatus ? "text" : "password"}
              placeholder="Password"
              value={userInput.password}
              onChange={(e) =>
                setUserInput({ ...userInput, password: e.target.value })
              }
              className="bg-white/20 placeholder-gray-300 border border-white/30 text-white w-full rounded-md my-2 p-3 pr-10 focus:bg-white/30 focus:border-white transition"
            />

            {viewPasswordStatus ? (
              <FontAwesomeIcon
                icon={faEye}
                onClick={() => setViewPasswordStatus(false)}
                className="text-white cursor-pointer absolute right-3"
              />
            ) : (
              <FontAwesomeIcon
                icon={faEyeSlash}
                onClick={() => setViewPasswordStatus(true)}
                className="text-white cursor-pointer absolute right-3"
              />
            )}
          </div>

          <p className="text-gray-200 text-xs mb-3 text-right">
            * Never share your password
          </p>

        
          <button
            type="button"
              onClick={register ? handleRegister :handleLogin} 
            className="bg-[#f97316] text-white font-semibold p-3 rounded-md hover:bg-[#ea580c] transition shadow-lg"
          >
            {register ? "Register" : "Log In"}
          </button>
          {!register && (
  <div className="text-center mt-6">
    <p className="text-white/70 text-sm mb-4">
      ---------- or ----------
    </p>

    <div className="flex justify-center">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
          handleGoogleLogin(credentialResponse);
          
        }}
        onError={() => {
          console.log("Google Login Failed");
        }}
      />
    </div>
  </div>
)}


         
          {register ? (
            <div className="text-center mt-6">
              <p className="text-lg text-white/90">
                Already have an account?{" "}
                <Link to="/login" className="text-[#f97316] underline">
                  Log In
                </Link>
              </p>
            </div>
          ) : (
            <div className="text-center mt-6">
            

              <p className="text-lg text-white/90 mt-4">
                New user?{" "}
                <Link to="/register" className="text-[#f97316] underline">
                  Register
                </Link>
              </p>
            </div>
          )}
        </form>
      </div>
    </main>
  );
}

export default Auth;
