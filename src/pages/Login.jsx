import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Eye, EyeOff } from "lucide-react";
import axiosInstance from "../services/axiosInstance";
import { useProfile } from "../context/ProfileContext";

function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/";
  const [userType, setUserType] = useState("free");
  const [focused, setFocused] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const { refetchProfile, setIsLoggedIn } = useProfile();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axiosInstance.post("/login", formData);
      const data = res.data;

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userType", userType);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setIsLoggedIn(true);
      await refetchProfile();
      await new Promise(resolve => setTimeout(resolve, 0));
      navigate(redirectTo, { replace: true });

    } catch (err) {
      const message =
        err.response?.data?.message || "Network error. Please check your connection.";
      setError(message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (name) =>
    `w-full px-3.5 py-2.5 rounded-xl text-[0.85rem] text-[#1c1917] outline-none transition-all duration-150 border-[1.5px] ${
      focused === name
        ? "border-[#c2852a] bg-[#fffdf9]"
        : "border-[#e5e0d8] bg-white"
    }`;

  return (
    <>
      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://imgs.search.brave.com/vLSQbXzsQDHKlZrbNiK9Br-QT69MoTtDh6yk8gMOJC0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bGluYW5kamlyc2Eu/Y29tL3dwLWNvbnRlbnQvdXBsb2Fkcy8wMDA3LU1OLVBlbGljYW4tSGlsbC1TYW5nZWV0LVdlZGRpbmctUGhvdG9zLmpwZw')",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(28,25,23,0.72) 0%, rgba(60,35,10,0.55) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="mt-20 relative z-10 min-h-screen flex items-center justify-center p-10">
        <div className="w-full max-w-[420px] bg-white rounded-[20px] border border-[#ede8e1] shadow-[0_24px_64px_rgba(0,0,0,0.18)] overflow-hidden">

          {/* Card header */}
          <div className="bg-[#daccb8] px-8 pt-8 pb-7 text-center">
            <div className="inline-block text-[0.65rem] font-bold tracking-[0.12em] uppercase text-[#c2852a] bg-[rgba(194,133,42,0.15)] border border-[rgba(232,201,138,0.3)] px-3 py-[3px] rounded-full mb-3">
              {t("login.tag")}
            </div>
            <h2
              className="text-[2rem] font-bold text-black tracking-tight leading-tight m-0 mb-1"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {t("login.title")}
              <span className="text-[#c2852a] italic"> {t("login.titleHighlight")}</span>
            </h2>
            <p className="text-[0.78rem] text-black/50 m-0">
              {t("login.subtitle")}
            </p>
            <div className="flex items-center justify-center gap-2.5 mt-5">
              <div className="h-px w-12" style={{ background: "linear-gradient(to right, transparent, rgba(232,201,138,0.5))" }} />
              <div className="w-[5px] h-[5px] bg-[#c2852a] rotate-45 rounded-[1px]" />
              <div className="h-px w-12" style={{ background: "linear-gradient(to left, transparent, rgba(232,201,138,0.5))" }} />
            </div>
          </div>

          <div className="h-px bg-[#ede8e1]" />

          {/* Form */}
          <div className="px-8 pt-7 pb-8 bg-[#f9f7f4]">
            <form onSubmit={handleSubmit}>

              {/* Username */}
              <div className="mb-4">
                <label className="block text-[0.7rem] font-bold tracking-[0.07em] uppercase text-gray-500 mb-1.5">
                  {t("login.usernameLabel")}
                </label>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  placeholder={t("login.usernamePlaceholder")}
                  className={inputClass("name")}
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused("")}
                />
              </div>

              <div className="mb-4">
                  <label className="block text-[0.7rem] font-bold tracking-[0.07em] uppercase text-gray-500 mb-1.5">
                    {t("login.passwordLabel")}
                  </label>

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder={t("login.passwordPlaceholder")}
                      className={`${inputClass("password")} pr-10`}
                      onFocus={() => setFocused("password")}
                      onBlur={() => setFocused("")}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(prev => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#c2852a] transition-colors duration-200"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff size={18} strokeWidth={2} />
                      ) : (
                        <Eye size={18} strokeWidth={2} />
                      )}
                    </button>
                  </div>
                </div>

              {error && (
                <p className="text-red-500 text-[0.78rem] text-center mb-3 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 mt-2 rounded-xl border-none bg-[#1c1917] text-white text-[0.85rem] font-semibold tracking-wide cursor-pointer hover:opacity-80 hover:-translate-y-px transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Logging in..." : `${t("login.submitBtn")} →`}
              </button>

              <p className="text-center mt-4 text-[0.8rem] text-gray-400">
                {t("login.noAccount")}
                <span
                  className="text-[#c2852a] font-semibold cursor-pointer ml-1 hover:opacity-75 transition-opacity"
                  onClick={() => navigate("/register")}
                >
                  {t("login.registerLink")}
                </span>
              </p>

            </form>
          </div>

        </div>
      </div>
    </>
  );
}

export default Login;