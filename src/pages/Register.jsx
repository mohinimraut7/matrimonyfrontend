// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";

// function Register() {
//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   const [focused, setFocused] = useState("");
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     userName: "",
//     mobileNumber: "",
//     email: "",
//     password: "",
//     lookingFor: ""
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(formData); // your backend payload is ready here
//     navigate("/");
//   };

//   const inputClass = (name) =>
//     `w-full px-3.5 py-2.5 rounded-xl text-[0.85rem] text-[#1c1917] outline-none transition-all duration-150 border-[1.5px] ${
//       focused === name
//         ? "border-[#c2852a] bg-[#fffdf9]"
//         : "border-[#e5e0d8] bg-white"
//     }`;

//   return (
//     <>
//       <div
//         className="fixed inset-0 bg-cover bg-center"
//         style={{
//           backgroundImage:
//             "url('https://imgs.search.brave.com/vLSQbXzsQDHKlZrbNiK9Br-QT69MoTtDh6yk8gMOJC0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bGluYW5kamlyc2Eu/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8w/MDA3LU1OLVBlbGlj/YW4tSGlsbC1TYW5n/ZWV0LVdlZGRpbmct/UGhvdG9zLmpwZw')",
//         }}
//       >
//         <div
//           className="absolute inset-0"
//           style={{
//             background:
//               "linear-gradient(135deg, rgba(28,25,23,0.72) 0%, rgba(60,35,10,0.55) 100%)",
//           }}
//         />
//       </div>

//       <div className="mt-20 relative z-10 min-h-screen flex items-center justify-center p-6">
//         <div className="w-full max-w-[440px] bg-white rounded-[20px] border border-[#ede8e1] shadow-[0_24px_64px_rgba(0,0,0,0.18)] overflow-hidden">

//           <div className="bg-[#daccb8] px-8 pt-7 pb-6 text-center">
//             <div className="inline-block text-[0.65rem] font-bold tracking-[0.12em] uppercase text-[#c2852a] bg-[rgba(194,133,42,0.15)] border border-[rgba(232,201,138,0.3)] px-3 py-[3px] rounded-full mb-3">
//               {t("register.tag")}
//             </div>
//             <h2
//               className="text-[1.9rem] font-bold text-black tracking-tight leading-tight m-0 mb-1"
//               style={{ fontFamily: "'Cormorant Garamond', serif" }}
//             >
//               {t("register.title")} 
//               <span className="text-[#c2852a] italic">
//                 {t("register.titleHighlight")}
//               </span>
//             </h2>
//             <p className="text-[0.75rem] text-black/[0.48] m-0">
//              {t("register.subtitle")}</p>
//             <div className="flex items-center justify-center gap-2.5 mt-4">
//               <div className="h-px w-11" style={{ background: "linear-gradient(to right, transparent, rgba(232,201,138,0.45))" }} />
//               <div className="w-[5px] h-[5px] bg-[#c2852a] rotate-45 rounded-[1px]" />
//               <div className="h-px w-11" style={{ background: "linear-gradient(to left, transparent, rgba(232,201,138,0.45))" }} />
//             </div>
//           </div>

//           <div className="h-px bg-[#ede8e1]" />

//           <div className="px-8 pt-6 pb-8 bg-[#f9f7f4]">
//             <form onSubmit={handleSubmit}>

//               <div className="grid grid-cols-2 gap-2.5 mb-4">
//                 <div>
//                   <label className="block text-[0.7rem] font-bold tracking-[0.07em] uppercase text-gray-500 mb-1.5">
//                     {t("register.firstNameLabel")}
//                   </label>
//                   <input
//                     type="text"
//                     name="firstName"              
//                     value={formData.firstName}
//                     onChange={handleChange}
//                     placeholder={t("register.firstNamePlaceholder")}
//                     className={inputClass("first")}
//                     onFocus={() => setFocused("first")}
//                     onBlur={() => setFocused("")}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-[0.7rem] font-bold tracking-[0.07em] uppercase text-gray-500 mb-1.5">
//                     {t("register.lastNameLabel")}
//                   </label>
//                   <input
//                     type="text"
//                     name="lastName"               
//                     value={formData.lastName}
//                     onChange={handleChange}
//                     placeholder={t("register.lastNamePlaceholder")}
//                     className={inputClass("last")}
//                     onFocus={() => setFocused("last")}
//                     onBlur={() => setFocused("")}
//                   />
//                 </div>
//               </div>

//               <div className="mb-4">
//                 <label className="block text-[0.7rem] font-bold tracking-[0.07em] uppercase text-gray-500 mb-1.5">
//                   {t("register.usernameLabel")}
//                 </label>
//                 <input
//                   type="text"
//                   name="userName"                 
//                   value={formData.userName}
//                   onChange={handleChange}
//                   placeholder={t("register.usernamePlaceholder")}
//                   className={inputClass("name")}
//                   onFocus={() => setFocused("name")}
//                   onBlur={() => setFocused("")}
//                 />
//               </div>

//               <div className="mb-4">
//                 <label className="block text-[0.7rem] font-bold tracking-[0.07em] uppercase text-gray-500 mb-1.5">
//                   {t("register.emailLabel")}
//                 </label>
//                 <input
//                   type="email"
//                   name="email"                    
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder={t("register.emailPlaceholder")}
//                   className={inputClass("email")}
//                   onFocus={() => setFocused("email")}
//                   onBlur={() => setFocused("")}
//                 />
//               </div>

//               <div className="mb-4">
//                 <label className="block text-[0.7rem] font-bold tracking-[0.07em] uppercase text-gray-500 mb-1.5">
//                   {t("register.passwordLabel")}
//                 </label>
//                 <input
//                   type="password"
//                   name="password"                 
//                   value={formData.password}
//                   onChange={handleChange}
//                   placeholder={t("register.passwordPlaceholder")}
//                   className={inputClass("password")}
//                   onFocus={() => setFocused("password")}
//                   onBlur={() => setFocused("")}
//                 />
//               </div>

//               <div className="mb-4">
//                 <label className="block text-[0.7rem] font-bold tracking-[0.07em] uppercase text-gray-500 mb-1.5">
//                   {t("register.mobileLabel")}
//                 </label>
//                 <input
//                   type="text"
//                   name="mobileNumber"             
//                   value={formData.mobileNumber}
//                   onChange={handleChange}
//                   placeholder={t("register.mobilePlaceholder")}
//                   className={inputClass("mobile")}
//                   onFocus={() => setFocused("mobile")}
//                   onBlur={() => setFocused("")}
//                 />
//               </div>

//               <div className="mb-4">
//   <label className="block text-[0.7rem] font-bold tracking-[0.07em] uppercase text-gray-500 mb-1.5">
//     {t("register.lookingForLabel")}
//   </label>

//               <div className="flex gap-2 mt-0.5">
//                 {["Bride", "Groom"].map((opt) => (
//                   <button
//                     key={opt}
//                     type="button"
//                     onClick={() =>
//                       setFormData({ ...formData, lookingFor: opt }) // ✅ backend stays ENGLISH
//                     }
//                     className={`flex-1 py-2.5 rounded-xl border-[1.5px] text-[0.8rem] font-semibold cursor-pointer text-center transition-all duration-150 ${
//                       formData.lookingFor === opt
//                         ? "border-[#c2852a] bg-[#fdf3e3] text-[#c2852a]"
//                         : "border-[#e5e0d8] bg-white text-gray-400"
//                     }`}
//                   >
//                     {opt === "Bride"
//                       ? t("register.bride")
//                       : t("register.groom")}
//                   </button>
//                 ))}
//               </div>
//             </div>

//               <button
//                 type="submit"
//                 className="w-full py-3 mt-1.5 rounded-xl border-none bg-[#1c1917] text-white text-[0.85rem] font-semibold tracking-wide cursor-pointer hover:opacity-80 hover:-translate-y-px transition-all duration-150"
//               >
//                 {t("register.submitBtn")} →
//               </button>

//               <p className="text-center mt-4 text-[0.8rem] text-gray-400">
//                 {t("register.alreadyRegistered")}
//                 <span
//                   className="text-[#c2852a] font-semibold cursor-pointer ml-1 hover:opacity-70 transition-opacity"
//                   onClick={() => navigate("/login")}
//                 >
//                   {t("register.loginLink")}
//                 </span>
//               </p>

//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Register;




import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Register() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [focused, setFocused] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    mobileNumber: "",
    email: "",
    password: "",
    lookingFor: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed. Please try again.");
        return;
      }

      console.log("Registered successfully:", data);
      navigate("/login");

    } catch (err) {
      setError("Network error. Please check your connection.");
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

      <div className="mt-20 relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-[440px] bg-white rounded-[20px] border border-[#ede8e1] shadow-[0_24px_64px_rgba(0,0,0,0.18)] overflow-hidden">

          <div className="bg-[#daccb8] px-8 pt-7 pb-6 text-center">
            <div className="inline-block text-[0.65rem] font-bold tracking-[0.12em] uppercase text-[#c2852a] bg-[rgba(194,133,42,0.15)] border border-[rgba(232,201,138,0.3)] px-3 py-[3px] rounded-full mb-3">
              {t("register.tag")}
            </div>
            <h2
              className="text-[1.9rem] font-bold text-black tracking-tight leading-tight m-0 mb-1"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {t("register.title")} 
              <span className="text-[#c2852a] italic">
                {t("register.titleHighlight")}
              </span>
            </h2>
            <p className="text-[0.75rem] text-black/[0.48] m-0">
             {t("register.subtitle")}</p>
            <div className="flex items-center justify-center gap-2.5 mt-4">
              <div className="h-px w-11" style={{ background: "linear-gradient(to right, transparent, rgba(232,201,138,0.45))" }} />
              <div className="w-[5px] h-[5px] bg-[#c2852a] rotate-45 rounded-[1px]" />
              <div className="h-px w-11" style={{ background: "linear-gradient(to left, transparent, rgba(232,201,138,0.45))" }} />
            </div>
          </div>

          <div className="h-px bg-[#ede8e1]" />

          <div className="px-8 pt-6 pb-8 bg-[#f9f7f4]">
            <form onSubmit={handleSubmit}>

              <div className="grid grid-cols-2 gap-2.5 mb-4">
                <div>
                  <label className="block text-[0.7rem] font-bold tracking-[0.07em] uppercase text-gray-500 mb-1.5">
                    {t("register.firstNameLabel")}
                  </label>
                  <input
                    type="text"
                    name="firstName"              
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder={t("register.firstNamePlaceholder")}
                    className={inputClass("first")}
                    onFocus={() => setFocused("first")}
                    onBlur={() => setFocused("")}
                  />
                </div>
                <div>
                  <label className="block text-[0.7rem] font-bold tracking-[0.07em] uppercase text-gray-500 mb-1.5">
                    {t("register.lastNameLabel")}
                  </label>
                  <input
                    type="text"
                    name="lastName"               
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder={t("register.lastNamePlaceholder")}
                    className={inputClass("last")}
                    onFocus={() => setFocused("last")}
                    onBlur={() => setFocused("")}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-[0.7rem] font-bold tracking-[0.07em] uppercase text-gray-500 mb-1.5">
                  {t("register.usernameLabel")}
                </label>
                <input
                  type="text"
                  name="userName"                 
                  value={formData.userName}
                  onChange={handleChange}
                  placeholder={t("register.usernamePlaceholder")}
                  className={inputClass("name")}
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused("")}
                />
              </div>

              <div className="mb-4">
                <label className="block text-[0.7rem] font-bold tracking-[0.07em] uppercase text-gray-500 mb-1.5">
                  {t("register.emailLabel")}
                </label>
                <input
                  type="email"
                  name="email"                    
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t("register.emailPlaceholder")}
                  className={inputClass("email")}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused("")}
                />
              </div>

              <div className="mb-4">
                <label className="block text-[0.7rem] font-bold tracking-[0.07em] uppercase text-gray-500 mb-1.5">
                  {t("register.passwordLabel")}
                </label>
                <input
                  type="password"
                  name="password"                 
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={t("register.passwordPlaceholder")}
                  className={inputClass("password")}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused("")}
                />
              </div>

              <div className="mb-4">
                <label className="block text-[0.7rem] font-bold tracking-[0.07em] uppercase text-gray-500 mb-1.5">
                  {t("register.mobileLabel")}
                </label>
                <input
                  type="text"
                  name="mobileNumber"             
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  placeholder={t("register.mobilePlaceholder")}
                  className={inputClass("mobile")}
                  onFocus={() => setFocused("mobile")}
                  onBlur={() => setFocused("")}
                />
              </div>

              <div className="mb-4">
                <label className="block text-[0.7rem] font-bold tracking-[0.07em] uppercase text-gray-500 mb-1.5">
                  {t("register.lookingForLabel")}
                </label>
                <div className="flex gap-2 mt-0.5">
                  {["Bride", "Groom"].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, lookingFor: opt }) // ✅ backend stays ENGLISH
                      }
                      className={`flex-1 py-2.5 rounded-xl border-[1.5px] text-[0.8rem] font-semibold cursor-pointer text-center transition-all duration-150 ${
                        formData.lookingFor === opt
                          ? "border-[#c2852a] bg-[#fdf3e3] text-[#c2852a]"
                          : "border-[#e5e0d8] bg-white text-gray-400"
                      }`}
                    >
                      {opt === "Bride"
                        ? t("register.bride")
                        : t("register.groom")}
                    </button>
                  ))}
                </div>
              </div>

              {/* ✅ Error Message */}
              {error && (
                <p className="text-red-500 text-[0.78rem] text-center mb-3 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              {/* ✅ Submit Button with loading state */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 mt-1.5 rounded-xl border-none bg-[#1c1917] text-white text-[0.85rem] font-semibold tracking-wide cursor-pointer hover:opacity-80 hover:-translate-y-px transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating Account..." : `${t("register.submitBtn")} →`}
              </button>

              <p className="text-center mt-4 text-[0.8rem] text-gray-400">
                {t("register.alreadyRegistered")}
                <span
                  className="text-[#c2852a] font-semibold cursor-pointer ml-1 hover:opacity-70 transition-opacity"
                  onClick={() => navigate("/login")}
                >
                  {t("register.loginLink")}
                </span>
              </p>

            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;