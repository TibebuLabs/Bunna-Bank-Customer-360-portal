import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HiEnvelope, HiLockClosed, HiEye, HiEyeSlash,
  HiArrowRight, HiBuildingLibrary
} from "react-icons/hi2";

// Demo credentials
const DEMO_USERS = [
  { username: "admin",   password: "Admin@123",  fullName: "Admin User",    role: "supervisor" },
  { username: "officer", password: "Officer@123", fullName: "Bank Officer",  role: "officer"    },
  { username: "teller",  password: "Teller@123",  fullName: "Bank Teller",   role: "teller"     },
  { username: "demo",    password: "demo",         fullName: "Demo User",     role: "officer"    },
];

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.username) errs.username = "Username is required";
    if (!formData.password) errs.password = "Password is required";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) return setErrors(errs);

    setLoading(true);
    // Simulate network delay
    await new Promise(r => setTimeout(r, 600));

    // Try demo credentials first
    const demoUser = DEMO_USERS.find(
      u => u.username === formData.username && u.password === formData.password
    );

    if (demoUser) {
      localStorage.setItem("token", "demo-token-" + Date.now());
      localStorage.setItem("user", JSON.stringify({
        id: 1,
        fullName: demoUser.fullName,
        username: demoUser.username,
        role: demoUser.role,
      }));
      setLoading(false);
      navigate("/dashboard");
      return;
    }

    // Try real backend (optional — gracefully falls back)
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: formData.username, password: formData.password }),
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard");
      } else {
        setErrors({ general: "Invalid credentials. Try: admin / Admin@123" });
      }
    } catch {
      // Backend not available — show hint
      setErrors({ general: "Invalid credentials. Try: admin / Admin@123" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#fdf8f5]">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-2/5 bg-gradient-to-br from-[#3d1209] to-[#2d0d07] flex-col items-center justify-center p-12 text-white">
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl">
            <HiBuildingLibrary className="text-white text-3xl w-10 h-10" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-300 to-amber-100 bg-clip-text text-transparent mb-2">
            Bunna Bank
          </h1>
          <p className="text-amber-200/80 text-sm">Customer 360 — Staff Portal</p>
          <div className="mt-10 space-y-3 w-full max-w-xs">
            {["Instant Customer Lookup", "Branch Management", "AI-Powered IT Support", "Reports & Analytics"].map((f) => (
              <div key={f} className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3">
                <div className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
                <span className="text-sm text-amber-100">{f}</span>
              </div>
            ))}
          </div>
          {/* Demo credentials hint */}
          <div className="mt-8 bg-white/10 rounded-xl px-4 py-3 w-full max-w-xs text-left">
            <p className="text-amber-300 text-xs font-semibold mb-1">Demo Credentials</p>
            <p className="text-amber-100/80 text-xs">Username: <span className="font-mono text-white">admin</span></p>
            <p className="text-amber-100/80 text-xs">Password: <span className="font-mono text-white">Admin@123</span></p>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <div className="flex lg:hidden items-center gap-3 mb-8 justify-center">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
              <HiBuildingLibrary className="text-white w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-[#3d1209]">Bunna Bank</h1>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-1">Sign In</h2>
          <p className="text-gray-500 text-sm mb-6">Enter your credentials to continue</p>

          {/* Mobile demo hint */}
          <div className="lg:hidden mb-5 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800">
            Demo: <span className="font-mono font-semibold">admin</span> / <span className="font-mono font-semibold">Admin@123</span>
          </div>

          {errors.general && (
            <div className="mb-5 p-3 bg-red-50 border-l-4 border-[#3d1209] rounded-r-lg text-sm text-[#3d1209]">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Username</label>
              <div className="relative">
                <HiEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input type="text" name="username" value={formData.username} onChange={handleChange}
                  placeholder="e.g. admin"
                  className={`w-full pl-9 pr-4 py-3 rounded-xl border-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#3d1209]/20 ${errors.username ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-[#3d1209]"}`} />
              </div>
              {errors.username && <p className="mt-1 text-xs text-red-600">{errors.username}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <HiLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange}
                  placeholder="Enter your password"
                  className={`w-full pl-9 pr-10 py-3 rounded-xl border-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#3d1209]/20 ${errors.password ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-[#3d1209]"}`} />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#3d1209] transition-colors">
                  {showPassword ? <HiEyeSlash className="w-4 h-4" /> : <HiEye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
            </div>

            <button type="submit" disabled={loading}
              className="w-full bg-[#3d1209] hover:bg-[#5a1b0e] text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
              {loading
                ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Signing in...</>
                : <>Sign In <HiArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-[#3d1209] font-semibold hover:text-amber-700 transition-colors">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
