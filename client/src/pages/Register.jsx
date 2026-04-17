import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HiUser, HiLockClosed, HiEye, HiEyeSlash,
  HiArrowRight, HiBuildingLibrary, HiIdentification
} from "react-icons/hi2";
import api from "../api/axios";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", username: "", role: "officer", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.fullName) errs.fullName = "Full name is required";
    if (!formData.username) errs.username = "Username is required";
    if (!formData.password) errs.password = "Password is required";
    else if (formData.password.length < 6) errs.password = "Minimum 6 characters";
    if (formData.password !== formData.confirm) errs.confirm = "Passwords do not match";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) return setErrors(errs);
    setLoading(true);
    try {
      await api.post("/auth/register", {
        fullName: formData.fullName,
        username: formData.username,
        password: formData.password,
        role: formData.role,
      });
      setSuccess("Account created! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      const data = err.response?.data;
      // Show the most specific error available
      const msg = data?.errors?.[0] || data?.message || "Registration failed. Please try again.";
      setErrors({ general: msg });
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field) =>
    `w-full pl-9 pr-4 py-3 rounded-xl border-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#3d1209]/20 ${errors[field] ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-[#3d1209]"}`;

  return (
    <div className="min-h-screen flex bg-[#fdf8f5]">
      <div className="hidden lg:flex lg:w-2/5 bg-gradient-to-br from-[#3d1209] to-[#2d0d07] flex-col items-center justify-center p-12 text-white">
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl">
            <HiBuildingLibrary className="text-white w-10 h-10" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-300 to-amber-100 bg-clip-text text-transparent mb-2">Bunna Bank</h1>
          <p className="text-amber-200/80 text-sm">Customer 360 — Staff Portal</p>
          <p className="mt-8 text-amber-100/60 text-sm leading-relaxed max-w-xs">
            Create your staff account to access the Customer 360 dashboard and look up customer information instantly.
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <div className="flex lg:hidden items-center gap-3 mb-8 justify-center">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
              <HiBuildingLibrary className="text-white w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-[#3d1209]">Bunna Bank</h1>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-1">Create Account</h2>
          <p className="text-gray-500 text-sm mb-8">Register your staff credentials</p>

          {errors.general && <div className="mb-5 p-3 bg-red-50 border-l-4 border-[#3d1209] rounded-r-lg text-sm text-[#3d1209]">{errors.general}</div>}
          {success && <div className="mb-5 p-3 bg-green-50 border-l-4 border-green-600 rounded-r-lg text-sm text-green-700">{success}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
              <div className="relative">
                <HiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Your full name" className={inputClass("fullName")} />
              </div>
              {errors.fullName && <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Username</label>
              <div className="relative">
                <HiIdentification className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Choose a username" className={inputClass("username")} />
              </div>
              {errors.username && <p className="mt-1 text-xs text-red-600">{errors.username}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Role</label>
              <select name="role" value={formData.role} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#3d1209] focus:outline-none text-sm bg-white">
                <option value="officer">Bank Officer</option>
                <option value="teller">Teller</option>
                <option value="supervisor">Supervisor</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <HiLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="Min 6 chars"
                    className={`w-full pl-9 pr-8 py-3 rounded-xl border-2 text-sm focus:outline-none ${errors.password ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-[#3d1209]"}`} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#3d1209]">
                    {showPassword ? <HiEyeSlash className="w-3 h-3" /> : <HiEye className="w-3 h-3" />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm</label>
                <div className="relative">
                  <HiLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input type="password" name="confirm" value={formData.confirm} onChange={handleChange} placeholder="Repeat"
                    className={`w-full pl-9 pr-4 py-3 rounded-xl border-2 text-sm focus:outline-none ${errors.confirm ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-[#3d1209]"}`} />
                </div>
                {errors.confirm && <p className="mt-1 text-xs text-red-600">{errors.confirm}</p>}
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full bg-[#3d1209] hover:bg-[#5a1b0e] text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-2">
              {loading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Creating...</> : <>Create Account <HiArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-[#3d1209] font-semibold hover:text-amber-700 transition-colors">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
