// import { NavLink, Link, useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import { useState } from "react";
// import { Menu, X, HeartIcon } from "lucide-react";
// import { useShortlist } from "../context/ShortlistContext";
// import { useInterest } from "../context/InterestContext";
// import { MdGroups } from "react-icons/md";
// import { useProfile } from "../context/ProfileContext";
// import { useTranslation } from "react-i18next";

// export default function Navbar() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [open, setOpen] = useState(false);
//   const { t, i18n } = useTranslation();

//   const { shortlist } = useShortlist();
//   const { interests } = useInterest();

//   const { profileData } = useProfile();
//   const hasPhoto = profileData.photos && profileData.photos.length > 0;
//   const avatarInitials = `${profileData.firstName?.[0] || ""}${profileData.lastName?.[0] || ""}`.toUpperCase();

//   const toggleLang = () => {
//   const newLang = i18n.language === "mr" ? "en" : "mr";
//   i18n.changeLanguage(newLang);
//   localStorage.setItem("lang", newLang);
//   document.documentElement.lang = newLang;
// };

//   return (
//     <nav id="main-navbar" className="fixed top-0 left-0 w-full z-50 bg-white/50 backdrop-blur-md border-b border-white/40">
//       <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between"> 

//         {/* Logo */}
//         <Link to="/" className="text-xl font-bold text-black">
//           {t("navbar.name")}
//         </Link>

//         {/* Desktop Links */}
//         <div className="hidden md:flex gap-12 text-sm font-medium text-black">
//           <NavLink to="/" className="hover:text-yellow-600 transition">
//             {t("navbar.home")}
//           </NavLink>
//           <NavLink to="/about" className="hover:text-yellow-600 transition">
//             {t("navbar.about")}
//           </NavLink>
//           <NavLink to="/matches" className="hover:text-yellow-600 transition">
//             {t("navbar.matches")}
//           </NavLink>
//         </div>

//         {/* Desktop Right Section */}
//         <div className="hidden md:flex items-center gap-4">

//           {/* Language Toggle */}
//                   <button
//           onClick={toggleLang}
//           className="px-3 py-1.5 rounded-full text-xs font-semibold border 
//                     border-yellow-500 text-yellow-700 hover:bg-yellow-50 transition"
//         >
//           {i18n.language === "mr" ? "EN" : "मराठी"}
//         </button>

//         <Link
//           to="/shortlist"
//           className="hidden md:flex items-center justify-center relative 
//                     w-10 h-10  text-black rounded-full 
//                     hover:text-yellow-600 transition"
//         >
//           <MdGroups size={30} />

//           {shortlist.length > 0 && (
//             <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
//               {shortlist.length}
//             </span>
//           )}
//         </Link>

//           {/* Interest Icon */}
//           <Link
//             to="/interests"
//             className="hidden md:flex items-center justify-center relative
//                       w-10 h-10 text-black rounded-full transition"
//           >
//             <HeartIcon size={20} className="text-black hover:text-red-400" />
//             {interests.length > 0 && (
//               <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs
//                               w-4 h-4 flex items-center justify-center rounded-full">
//                 {interests.length}
//               </span>
//             )}
//           </Link>

//           <Link
//             to="/login"
//             className="bg-black text-white text-sm px-4 py-2 rounded-lg bg-[#c2852a] hover:bg-[#a8701f] transition"
//           >
//             {t("navbar.login")}
//           </Link>

//           <Link
//             to="/register"
//             className="bg-black text-white text-sm px-4 py-2 rounded-lg bg-[#c2852a] hover:bg-[#a8701f] transition"
//           >
//             {t("navbar.signup")}
//           </Link>

//           <button
//             onClick={() => navigate("/profile")}
//             className="w-9 h-9 rounded-full overflow-hidden hover:ring-2 hover:ring-black transition flex-shrink-0"
//           >
//             {hasPhoto ? (
//               <img
//                 src={profileData.photos[0]}
//                 alt="Profile"
//                 className="w-full h-full object-cover"
//               />
//             ) : avatarInitials ? (
//               <div className="w-full h-full bg-[#1c1917] flex items-center justify-center">
//                 <span className="text-white text-xs font-bold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
//                   {avatarInitials}
//                 </span>
//               </div>
//             ) : (
//               <div className="w-full h-full bg-gray-200 flex items-center justify-center text-sm">👤</div>
//             )}
//           </button>
//         </div>

//         {/* Mobile Menu Button */}
//         <button
//           onClick={() => setOpen(!open)}
//           className="md:hidden text-black"
//         >
//           {open ? <X size={24} /> : <Menu size={24} />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {open && (
//         <div className="md:hidden bg-white/70 backdrop-blur-md border-t border-white/40 shadow-sm">
//           <div className="flex flex-col px-6 py-4 gap-4 text-sm font-medium text-black">

//             <NavLink to="/" onClick={() => setOpen(false)} className="hover:text-yellow-600 transition">
//               {t("navbar.home")}
//             </NavLink>

//             <NavLink to="/about" onClick={() => setOpen(false)} className="hover:text-yellow-600 transition">
//               {t("navbar.about")}
//             </NavLink>

//             <NavLink to="/matches" onClick={() => setOpen(false)} className="hover:text-yellow-600 transition">
//               {t("navbar.matches")}
//             </NavLink>

//             <NavLink to="/login" onClick={() => setOpen(false)} className="hover:text-yellow-600 transition">
//               {t("navbar.login")}
//             </NavLink>

//             <NavLink to="/register" onClick={() => setOpen(false)} className="hover:text-yellow-600 transition">
//               {t("navbar.signup")}
//             </NavLink>

//             <NavLink to="/shortlist" onClick={() => setOpen(false)} className="hover:text-yellow-600 transition">
//               {t("navbar.shortlist")}
//             </NavLink>

//             <NavLink to="/interests" onClick={() => setOpen(false)} className="hover:text-yellow-600 transition">
//               {t("navbar.interest")}
//             </NavLink>

//             <button
//               onClick={() => { navigate("/profile"); setOpen(false); }}
//               className="text-left hover:text-yellow-600 transition"
//             >
//               {t("navbar.profile")}
//             </button>

//             <button
//               onClick={toggleLang}
//               className="px-3 py-2 rounded-full text-xs font-semibold border 
//                         border-yellow-500 text-yellow-700 hover:bg-yellow-50 transition w-fit"
//             >
//               {i18n.language === "mr" ? "EN" : "मराठी"}
//             </button>

//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }




import { NavLink, Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, HeartIcon } from "lucide-react";
import { useShortlist } from "../context/ShortlistContext";
import { useInterest } from "../context/InterestContext";
import { MdGroups } from "react-icons/md";
import { useProfile } from "../context/ProfileContext";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const { shortlist } = useShortlist();
  const { interests } = useInterest();

  const { profileData } = useProfile();
  const hasPhoto = profileData.photos && profileData.photos.length > 0;
  const avatarInitials = `${profileData.firstName?.[0] || ""}${profileData.lastName?.[0] || ""}`.toUpperCase();

  // ✅ token check — login आहे का?
  const isLoggedIn = !!localStorage.getItem("token");

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userType");
    navigate("/login");
    setOpen(false);
  };

  const toggleLang = () => {
    const newLang = i18n.language === "mr" ? "en" : "mr";
    i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang);
    document.documentElement.lang = newLang;
  };

  return (
    <nav id="main-navbar" className="fixed top-0 left-0 w-full z-50 bg-white/50 backdrop-blur-md border-b border-white/40">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between"> 

        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-black">
          {t("navbar.name")}
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-12 text-sm font-medium text-black">
          <NavLink to="/" className="hover:text-yellow-600 transition">
            {t("navbar.home")}
          </NavLink>
          <NavLink to="/about" className="hover:text-yellow-600 transition">
            {t("navbar.about")}
          </NavLink>
          <NavLink to="/matches" className="hover:text-yellow-600 transition">
            {t("navbar.matches")}
          </NavLink>
        </div>

        {/* Desktop Right Section */}
        <div className="hidden md:flex items-center gap-4">

          {/* Language Toggle */}
          <button
            onClick={toggleLang}
            className="px-3 py-1.5 rounded-full text-xs font-semibold border 
                      border-yellow-500 text-yellow-700 hover:bg-yellow-50 transition"
          >
            {i18n.language === "mr" ? "EN" : "मराठी"}
          </button>

          <Link
            to="/shortlist"
            className="hidden md:flex items-center justify-center relative 
                      w-10 h-10  text-black rounded-full 
                      hover:text-yellow-600 transition"
          >
            <MdGroups size={30} />
            {shortlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {shortlist.length}
              </span>
            )}
          </Link>

          {/* Interest Icon */}
          <Link
            to="/interests"
            className="hidden md:flex items-center justify-center relative
                      w-10 h-10 text-black rounded-full transition"
          >
            <HeartIcon size={20} className="text-black hover:text-red-400" />
            {interests.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs
                              w-4 h-4 flex items-center justify-center rounded-full">
                {interests.length}
              </span>
            )}
          </Link>

          {/* ✅ Login/Register — फक्त logged out असताना दाखव */}
          {!isLoggedIn && (
            <>
              <Link
                to="/login"
                className="bg-black text-white text-sm px-4 py-2 rounded-lg bg-[#c2852a] hover:bg-[#a8701f] transition"
              >
                {t("navbar.login")}
              </Link>
              <Link
                to="/register"
                className="bg-black text-white text-sm px-4 py-2 rounded-lg bg-[#c2852a] hover:bg-[#a8701f] transition"
              >
                {t("navbar.signup")}
              </Link>
            </>
          )}

          {/* ✅ Logout — फक्त logged in असताना दाखव */}
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="bg-[#c2852a] hover:bg-[#a8701f] text-white text-sm px-4 py-2 rounded-lg transition"
            >
              {t("Logout") || "Logout"}
            </button>
          )}

          {/* Profile Avatar */}
          <button
            onClick={() => navigate("/profile")}
            className="w-9 h-9 rounded-full overflow-hidden hover:ring-2 hover:ring-black transition flex-shrink-0"
          >
            {hasPhoto ? (
              <img
                src={profileData.photos[0]}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : avatarInitials ? (
              <div className="w-full h-full bg-[#1c1917] flex items-center justify-center">
                <span className="text-white text-xs font-bold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {avatarInitials}
                </span>
              </div>
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-sm">👤</div>
            )}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-black"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white/70 backdrop-blur-md border-t border-white/40 shadow-sm">
          <div className="flex flex-col px-6 py-4 gap-4 text-sm font-medium text-black">

            <NavLink to="/" onClick={() => setOpen(false)} className="hover:text-yellow-600 transition">
              {t("navbar.home")}
            </NavLink>

            <NavLink to="/about" onClick={() => setOpen(false)} className="hover:text-yellow-600 transition">
              {t("navbar.about")}
            </NavLink>

            <NavLink to="/matches" onClick={() => setOpen(false)} className="hover:text-yellow-600 transition">
              {t("navbar.matches")}
            </NavLink>

            {/* ✅ Mobile — Login/Register फक्त logged out असताना */}
            {!isLoggedIn && (
              <>
                <NavLink to="/login" onClick={() => setOpen(false)} className="hover:text-yellow-600 transition">
                  {t("navbar.login")}
                </NavLink>
                <NavLink to="/register" onClick={() => setOpen(false)} className="hover:text-yellow-600 transition">
                  {t("navbar.signup")}
                </NavLink>
              </>
            )}

            {/* ✅ Mobile — Logout फक्त logged in असताना */}
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="text-left text-[#c2852a] font-semibold hover:text-[#a8701f] transition"
              >
                {t("navbar.logout") || "Logout"}
              </button>
            )}

            <NavLink to="/shortlist" onClick={() => setOpen(false)} className="hover:text-yellow-600 transition">
              {t("navbar.shortlist")}
            </NavLink>

            <NavLink to="/interests" onClick={() => setOpen(false)} className="hover:text-yellow-600 transition">
              {t("navbar.interest")}
            </NavLink>

            <button
              onClick={() => { navigate("/profile"); setOpen(false); }}
              className="text-left hover:text-yellow-600 transition"
            >
              {t("navbar.profile")}
            </button>

            <button
              onClick={toggleLang}
              className="px-3 py-2 rounded-full text-xs font-semibold border 
                        border-yellow-500 text-yellow-700 hover:bg-yellow-50 transition w-fit"
            >
              {i18n.language === "mr" ? "EN" : "मराठी"}
            </button>

          </div>
        </div>
      )}
    </nav>
  );
}
