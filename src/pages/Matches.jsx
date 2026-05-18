// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import {
//   Search, Heart, MapPin, Briefcase, BookOpen,
//   ChevronDown, ChevronUp, RotateCcw, SlidersHorizontal, X
// } from "lucide-react";
// // import { profiles } from "../data/profiles";
// import axiosInstance from "../services/axiosInstance";


// const AVATAR_BG = [
//   ["#d4cfc9", "#b8b0a6"], ["#d2cbc3", "#b5aca0"], ["#cfc9c0", "#b3ab9e"],
//   ["#d4cac9", "#b8a6a6"], ["#cec8bf", "#b2a99d"], ["#d4cfc2", "#b8b0a0"],
// ];

// function AvatarPlaceholder({ name }) {
//   const initials = name?.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
//   const [g1, g2] = AVATAR_BG[initials?.charCodeAt(0) % AVATAR_BG.length];
//   return (
//     <div className="w-full h-full flex items-center justify-center" style={{ background: `linear-gradient(145deg, ${g1}, ${g2})` }}>
//       <span className="text-[3rem] font-bold tracking-[2px]" style={{ color: "rgba(255,255,255,0.85)", fontFamily: "'Cormorant Garamond', serif" }}>
//         {initials}
//       </span>
//     </div>
//   );
// }

// function FilterSection({ title, children, defaultOpen = true }) {
//   const [open, setOpen] = useState(defaultOpen);
//   return (
//     <div className="border-b border-[#f0ede9] pb-4 mb-4">
//       <button
//         onClick={() => setOpen(!open)}
//         className="flex justify-between items-center w-full mb-2.5 bg-transparent border-none cursor-pointer text-[#1c1917] text-[0.73rem] font-bold tracking-[0.08em] uppercase"
//       >
//         {title}
//         {open ? <ChevronUp size={13} className="text-gray-400" /> : <ChevronDown size={13} className="text-gray-400" />}
//       </button>
//       {open && <div>{children}</div>}
//     </div>
//   );
// }

// function CheckboxOption({ label, checked, onChange }) {
//   return (
//     <label className="flex items-center gap-2.5 cursor-pointer mb-2 text-[0.82rem]">
//       <div
//         onClick={onChange}
//         className="flex items-center justify-center flex-shrink-0 w-[15px] h-[15px] rounded-[4px] cursor-pointer transition-all duration-150"
//         style={{ background: checked ? "#c2852a" : "transparent", border: checked ? "2px solid #c2852a" : "1.5px solid #d1c9be" }}
//       >
//         {checked && (
//           <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
//             <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//           </svg>
//         )}
//       </div>
//       <span className="transition-all duration-150" style={{ color: checked ? "#1c1917" : "#6b7280", fontWeight: checked ? 500 : 400 }}>
//         {label}
//       </span>
//     </label>
//   );
// }

// function SidebarContent({ t, maritalStatus, setMaritalStatus, minAge, setMinAge, maxAge, setMaxAge, religions, setReligions, cities, setCities, professions, setProfessions, workingFilter, setWorkingFilter, clearAll, toggleArr, MARITAL_OPTIONS,RELIGION_OPTIONS,CITY_OPTIONS,PROFESSION_OPTIONS,WORKING_OPTIONS }) {
//   return (
//     <>
//       <div className="flex justify-between items-center mb-[1.4rem]">
//         <div className="flex items-center gap-2">
//           <SlidersHorizontal size={18} className="text-[#c2852a]" />
//           <span className="text-[#1c1917] font-bold text-[0.88rem] tracking-tight">{t("matches.filters")}</span>
//         </div>
//         <button onClick={clearAll} className="flex items-center gap-[3px] text-[#c2852a] text-[0.7rem] font-semibold tracking-[0.04em] uppercase bg-transparent border-none cursor-pointer">
//           <RotateCcw size={10} /> {t("matches.reset")}
//         </button>
//       </div>

//       <FilterSection title={t("matches.filterSections.maritalStatus")}>
//         {MARITAL_OPTIONS.map(opt => <CheckboxOption key={opt} label={t(`data.maritalStatus.${opt}`)}  checked={maritalStatus.includes(opt)} onChange={() => toggleArr(setMaritalStatus, opt)} />)}
//       </FilterSection>

//       <FilterSection title={t("matches.filterSections.ageRange")}>
//         <div className="flex justify-between items-center mb-3">
//           <span className="text-[0.78rem] font-semibold text-[#1c1917] bg-[#fdf3e3] border border-[#e8c98a] px-2.5 py-[2px] rounded-full">{minAge}</span>
//           <span className="text-[0.7rem] text-gray-400">{t("matches.filterSections.to")}</span>
//           <span className="text-[0.78rem] font-semibold text-[#1c1917] bg-[#fdf3e3] border border-[#e8c98a] px-2.5 py-[2px] rounded-full">{maxAge}</span>
//         </div>
//         <input type="range" min={18} max={50} value={minAge} onChange={e => setMinAge(Number(e.target.value))} className="w-full mb-2 h-[2px] accent-[#c2852a] cursor-pointer" />
//         <input type="range" min={18} max={50} value={maxAge} onChange={e => setMaxAge(Number(e.target.value))} className="w-full h-[2px] accent-[#c2852a] cursor-pointer" />
//       </FilterSection>

//       <FilterSection title={t("matches.filterSections.religion")}>
//         {RELIGION_OPTIONS.map(opt => <CheckboxOption key={opt} label={t(`data.religion.${opt}`)} checked={religions.includes(opt)} onChange={() => toggleArr(setReligions, opt)} />)}
//       </FilterSection>

//       <FilterSection title={t("matches.filterSections.city")} defaultOpen={false}>
//         {CITY_OPTIONS.map(opt => <CheckboxOption key={opt} label={t(`data.city.${opt}`)} checked={cities.includes(opt)} onChange={() => toggleArr(setCities, opt)} />)}
//       </FilterSection>

//       <FilterSection title={t("matches.filterSections.profession")} defaultOpen={false}>
//         {PROFESSION_OPTIONS.map(opt => <CheckboxOption key={opt} label={t(`data.profession.${opt}`)} checked={professions.includes(opt)} onChange={() => toggleArr(setProfessions, opt)} />)}
//       </FilterSection>

//       <FilterSection title={t("matches.filterSections.workingStatus")} defaultOpen={false}>
//         {["Working", "Not working"].map(opt => <CheckboxOption key={opt}  label={t(`data.working.${opt}`)} checked={workingFilter === opt} onChange={() => setWorkingFilter(prev => prev === opt ? "" : opt)} />)}
//       </FilterSection>
//     </>
//   );
// }

// export default function Matches() {
//   const navigate = useNavigate();
//   const { t } = useTranslation();
//   // const [results, setResults] = useState(profiles);
//   const [search, setSearch] = useState("");
//   const [sortBy, setSortBy] = useState("Newest First");
//   const [maritalStatus, setMaritalStatus] = useState([]);
//   const [minAge, setMinAge] = useState(22);
//   const [maxAge, setMaxAge] = useState(35);
//   const [religions, setReligions] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [professions, setProfessions] = useState([]);
//   const [workingFilter, setWorkingFilter] = useState("");
//   const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
//   const [searchFocused, setSearchFocused] = useState(false);
//   const [allProfiles, setAllProfiles] = useState([]);
// const [results, setResults] = useState([]);
// const [loading, setLoading] = useState(true);



// const MARITAL_OPTIONS = Object.keys(t("data.maritalStatus", { returnObjects: true }));
// const RELIGION_OPTIONS = Object.keys(t("data.religion", { returnObjects: true }));
// const CITY_OPTIONS = Object.keys(t("data.city", { returnObjects: true }));
// const PROFESSION_OPTIONS = Object.keys(t("data.profession", { returnObjects: true }));
// const WORKING_OPTIONS = Object.keys(t("data.working", { returnObjects: true }));

//   const toggleArr = (setArr, val) => setArr(prev => prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val]);

//   const clearAll = () => {
//     setMaritalStatus([]); setMinAge(18); setMaxAge(50);
//     setReligions([]); setCities([]); setProfessions([]);
//     setWorkingFilter(""); setSearch("");
//   };

//   const activeFilterCount = maritalStatus.length + religions.length + cities.length + professions.length + (workingFilter ? 1 : 0);


//   // Fetch real users on mount
// useEffect(() => {
//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const res = await axiosInstance.get("/users"); // your getUsers route
//       const users = res.data.users;

//       // Map backend fields to what your card expects
//       const mapped = users.map(u => ({
//         id:            u._id,
//         name:          u.fullName || u.userName,
//         age:           u.dob ? Math.floor((new Date() - new Date(u.dob)) / 31557600000) : null,
//         height:        u.height || "",
//         photo:         u.photos?.[0] || null,
//         city:          u.currentCity || u.city || "",
//         country:       u.country || "",
//         profession:    u.occupation || u.profession || "",
//         religion:      u.religion || "",
//         caste:         u.caste || "",
//         maritalStatus: u.maritalStatus || "",
//         working:       u.employmentType ? "Working" : "Not working",
//       }));

//       setAllProfiles(mapped);
//       setResults(mapped);
//     } catch (err) {
//       console.error("Failed to fetch users:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchUsers();
// }, []);

//   useEffect(() => {
//     let f = [...allProfiles];
//     if (search)               f = f.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
//     if (maritalStatus.length) f = f.filter(p => maritalStatus.includes(p.maritalStatus));
//     if (religions.length)     f = f.filter(p => religions.includes(p.religion));
//     if (cities.length)        f = f.filter(p => cities.includes(p.city));
//     if (professions.length)   f = f.filter(p => professions.includes(p.profession));
//     if (workingFilter)        f = f.filter(p => p.working === workingFilter);
//     f = f.filter(p => p.age >= minAge && p.age <= maxAge);
//     if (sortBy === "Age: Low to High")  f.sort((a, b) => a.age - b.age);
//     else if (sortBy === "Age: High to Low") f.sort((a, b) => b.age - a.age);
//     setResults(f);
//   }, [search, maritalStatus, minAge, maxAge, religions, cities, professions, workingFilter, sortBy]);



//   useEffect(() => {
//     document.body.style.overflow = mobileFilterOpen ? "hidden" : "";
//     return () => { document.body.style.overflow = ""; };
//   }, [mobileFilterOpen]);

//   const sidebarProps = { t, maritalStatus, setMaritalStatus, minAge, setMinAge, maxAge, setMaxAge, religions, setReligions, cities, setCities, professions, setProfessions, workingFilter, setWorkingFilter, clearAll, toggleArr, MARITAL_OPTIONS,RELIGION_OPTIONS,CITY_OPTIONS,PROFESSION_OPTIONS,WORKING_OPTIONS };

//   return (
//     <>
//       <style>{`
//         .matches-card { transition: transform 0.22s ease, box-shadow 0.22s ease; }
//         .matches-card:hover { transform: translateY(-3px); box-shadow: 0 16px 36px rgba(0,0,0,0.1) !important; }
//         .matches-card:hover .card-photo { transform: scale(1.04); }
//         .card-photo { transition: transform 0.4s ease; }
//         .sidebar-scroll { scrollbar-width: thin; scrollbar-color: #e5e0d8 transparent; }
//         .sidebar-scroll::-webkit-scrollbar { width: 3px; }
//         .sidebar-scroll::-webkit-scrollbar-thumb { background: #e5e0d8; border-radius: 10px; }
//         select:focus, input:focus { outline: none; }
//         @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
//       `}</style>

//       <div className="min-h-screen mt-12">
//         <div className="max-w-[1360px] mx-auto px-6 py-12 flex gap-6 items-start">

//           {/* DESKTOP SIDEBAR */}
//           <aside className="hidden md:block w-[248px] flex-shrink-0">
//             <div className="sidebar-scroll bg-white rounded-2xl border border-[#ede8e1] shadow-[0_2px_16px_rgba(0,0,0,0.05)] sticky top-20 max-h-[calc(100vh-96px)] overflow-y-auto" style={{ padding: "1.4rem 1.2rem" }}>
//               <SidebarContent {...sidebarProps} />
//             </div>
//           </aside>

//           {/* MOBILE OVERLAY */}
//           {mobileFilterOpen && (
//             <div className="fixed inset-0 bg-black/45 z-[200] backdrop-blur-sm" style={{ animation: "fadeIn 0.2s ease" }} onClick={() => setMobileFilterOpen(false)} />
//           )}

//           {/* MOBILE DRAWER */}
//           <div
//             className={`sidebar-scroll fixed top-0 left-0 bottom-0 w-72 bg-white z-[201] overflow-y-auto shadow-[4px_0_24px_rgba(0,0,0,0.12)] transition-transform duration-[280ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${mobileFilterOpen ? "translate-x-0" : "-translate-x-full"}`}
//             style={{ padding: "1.4rem 1.2rem" }}
//           >
//             <div className="flex justify-end mb-2">
//               <button onClick={() => setMobileFilterOpen(false)} className="bg-[#f3efe9] border-none rounded-lg w-8 h-8 flex items-center justify-center cursor-pointer text-gray-500 hover:bg-[#ede8e1] transition-colors">
//                 <X size={16} />
//               </button>
//             </div>
//             <SidebarContent {...sidebarProps} />
//           </div>

//           {/* MAIN */}
//           <main className="flex-1 min-w-0">

//             <div className="flex justify-between items-start flex-wrap gap-3 mb-5">
//               <div>
//                 <h2 className="text-[3rem] font-bold text-[#1c1917] m-0 tracking-tight leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
//                   {t("matches.title")}
//                 </h2>
//                 <p className="text-gray-400 text-[0.78rem] mt-1 font-normal">{t("matches.subtitle")}</p>
//               </div>

//               <div className="flex items-center gap-2.5 flex-wrap">
//                 <button
//                   onClick={() => setMobileFilterOpen(true)}
//                   className={`md:hidden flex items-center gap-1.5 px-3.5 py-2 rounded-xl border-[1.5px] text-[0.8rem] font-semibold cursor-pointer transition-all ${
//                     activeFilterCount > 0 ? "border-[#c2852a] bg-[#fdf3e3] text-[#c2852a]" : "border-[#e5e0d8] bg-white text-gray-700"
//                   }`}
//                 >
//                   <SlidersHorizontal size={14} />
//                   {t("matches.filters")}
//                   {activeFilterCount > 0 && (
//                     <span className="bg-[#c2852a] text-white rounded-full w-[18px] h-[18px] inline-flex items-center justify-center text-[0.65rem] font-bold ml-0.5">
//                       {activeFilterCount}
//                     </span>
//                   )}
//                 </button>

//                 <div className="relative">
//                   <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//                   <input
//                     type="text"
//                     placeholder={t("matches.searchPlaceholder")}
//                     value={search}
//                     onChange={e => setSearch(e.target.value)}
//                     onFocus={() => setSearchFocused(true)}
//                     onBlur={() => setSearchFocused(false)}
//                     className={`pl-8 pr-3.5 py-2 rounded-xl border text-[0.8rem] bg-white text-[#1c1917] w-[180px] transition-colors duration-150 outline-none ${searchFocused ? "border-[#c2852a]" : "border-[#e5e0d8]"}`}
//                   />
//                 </div>

//                 <div className="relative">
//                   <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="appearance-none pl-3 pr-7 py-2 rounded-xl border border-[#e5e0d8] text-[0.8rem] text-gray-700 bg-white cursor-pointer outline-none">
//                     <option value="Newest First">{t("matches.sort.newestFirst")}</option>
//                     <option value="Age: Low to High">{t("matches.sort.ageLow")}</option>
//                     <option value="Age: High to Low">{t("matches.sort.ageHigh")}</option>
//                   </select>
//                   <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//                 </div>
//               </div>
//             </div>

//             <p className="text-[0.78rem] text-gray-400 mb-4">
//               <span className="font-semibold text-gray-700">{results.length}</span> {t("matches.matchesFound")}
//             </p>

//             {results.length === 0 ? (
//               <div className="text-center py-20 text-gray-400">
//                 <p className="text-base font-medium text-gray-500">{t("matches.noMatches")}</p>
//                 <p className="text-[0.8rem] mt-1.5">{t("matches.noMatchesHint")}</p>
//               </div>
//             ) : (
//               <>
//                 <div className="md:hidden flex flex-col gap-4 h-[calc(100svh-220px)] overflow-y-scroll snap-y snap-mandatory scroll-smooth pr-1" style={{ scrollbarWidth: "none" }}>
//                   {results.map(p => (
//                     <div key={p.id} className="snap-start snap-always flex-shrink-0">
//                       <ProfileCard profile={p} onView={() => navigate(`/profile/${p.id}`)} connectLabel={t("matches.connect")} />
//                     </div>
//                   ))}
//                 </div>
//                 <div className="hidden md:grid md:grid-cols-2 xl:grid-cols-3 gap-4">
//                   {results.map(p => <ProfileCard key={p.id} profile={p} onView={() => navigate(`/profile/${p.id}`)} connectLabel={t("matches.connect")} />)}
//                 </div>
//               </>
//             )}
//           </main>
//         </div>
//       </div>
//     </>
//   );
// }

// function ProfileCard({ profile: p, onView, connectLabel }) {
//   const { t } = useTranslation(); 
//   return (
//     <div className="matches-card bg-white rounded-2xl overflow-hidden border border-[#ede8e1] shadow-[0_1px_6px_rgba(0,0,0,0.05)]">
//       <div className="relative h-[220px] bg-[#f0ece7] cursor-pointer overflow-hidden" onClick={onView}>
//         <div className="card-photo w-full h-full">
//           {p.photo ? <img src={p.photo} alt={p.name} className="w-full h-full object-cover" /> : <AvatarPlaceholder name={p.name} />}
//         </div>
//         <div className="absolute inset-0 bg-gradient-to-t from-[rgba(28,25,23,0.32)] to-transparent" />
//       </div>
//       <div className="p-3.5">
//         <div className="flex justify-between items-start mb-2.5">
//           <div>
//             <h3 onClick={onView} className="font-bold text-[1.75rem] text-[#1c1917] cursor-pointer leading-tight m-0 tracking-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
//               {p.name}
//             </h3>
//             <p className="text-[#686f7c] text-[0.71rem] mt-0.5 font-normal">{p.age} yrs · {p.height}</p>
//           </div>
//         </div>
//         <div className="flex flex-col gap-1.5 mb-3">
//           {[
//             { icon: <MapPin size={15} />,    text: `${t(`data.city.${p.city}`)}, ${p.country}` },
//             { icon: <Briefcase size={15} />, text: t(`data.profession.${p.profession}`) },            { icon: <BookOpen size={15} />,  text: `${t(`data.religion.${p.religion}`)} · ${p.caste}` },
//           ].map(({ icon, text }, i) => (
//             <div key={i} className="flex items-center gap-1.5 text-gray-500 text-[0.74rem]">
//               <span className="text-[#c2852a] flex-shrink-0">{icon}</span>
//               <span className="overflow-hidden text-ellipsis whitespace-nowrap">{text}</span>
//             </div>
//           ))}
//         </div>
//         <div className="h-px bg-[#f3efe9] mb-3" />
//         <div className="flex gap-1.5">
//           <button
//             type="button"
//             onClick={(e) => { e.stopPropagation(); onView(); }}
//             className="flex-1 py-2 rounded-lg border-none bg-[#1c1917] text-white text-[0.72rem] font-semibold flex items-center justify-center gap-1 tracking-wide hover:opacity-85 active:opacity-70 transition-opacity cursor-pointer"
//           >
//             <Heart size={11} fill="white" /> {connectLabel}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }




import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Search, Heart, MapPin, Briefcase, BookOpen,
  ChevronDown, ChevronUp, RotateCcw, SlidersHorizontal, X
} from "lucide-react";
import axiosInstance from "../services/axiosInstance";


const AVATAR_BG = [
  ["#d4cfc9", "#b8b0a6"], ["#d2cbc3", "#b5aca0"], ["#cfc9c0", "#b3ab9e"],
  ["#d4cac9", "#b8a6a6"], ["#cec8bf", "#b2a99d"], ["#d4cfc2", "#b8b0a0"],
];

function AvatarPlaceholder({ name }) {
  const initials = name?.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  const [g1, g2] = AVATAR_BG[initials?.charCodeAt(0) % AVATAR_BG.length];
  return (
    <div className="w-full h-full flex items-center justify-center" style={{ background: `linear-gradient(145deg, ${g1}, ${g2})` }}>
      <span className="text-[3rem] font-bold tracking-[2px]" style={{ color: "rgba(255,255,255,0.85)", fontFamily: "'Cormorant Garamond', serif" }}>
        {initials}
      </span>
    </div>
  );
}

function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-[#f0ede9] pb-4 mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full mb-2.5 bg-transparent border-none cursor-pointer text-[#1c1917] text-[0.73rem] font-bold tracking-[0.08em] uppercase"
      >
        {title}
        {open ? <ChevronUp size={13} className="text-gray-400" /> : <ChevronDown size={13} className="text-gray-400" />}
      </button>
      {open && <div>{children}</div>}
    </div>
  );
}

function CheckboxOption({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer mb-2 text-[0.82rem]">
      <div
        onClick={onChange}
        className="flex items-center justify-center flex-shrink-0 w-[15px] h-[15px] rounded-[4px] cursor-pointer transition-all duration-150"
        style={{ background: checked ? "#c2852a" : "transparent", border: checked ? "2px solid #c2852a" : "1.5px solid #d1c9be" }}
      >
        {checked && (
          <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
            <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <span className="transition-all duration-150" style={{ color: checked ? "#1c1917" : "#6b7280", fontWeight: checked ? 500 : 400 }}>
        {label}
      </span>
    </label>
  );
}

function SidebarContent({ t, maritalStatus, setMaritalStatus, minAge, setMinAge, maxAge, setMaxAge, religions, setReligions, cities, setCities, professions, setProfessions, workingFilter, setWorkingFilter, clearAll, toggleArr, MARITAL_OPTIONS, RELIGION_OPTIONS, CITY_OPTIONS, PROFESSION_OPTIONS, WORKING_OPTIONS }) {
  return (
    <>
      <div className="flex justify-between items-center mb-[1.4rem]">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={18} className="text-[#c2852a]" />
          <span className="text-[#1c1917] font-bold text-[0.88rem] tracking-tight">{t("matches.filters")}</span>
        </div>
        <button onClick={clearAll} className="flex items-center gap-[3px] text-[#c2852a] text-[0.7rem] font-semibold tracking-[0.04em] uppercase bg-transparent border-none cursor-pointer">
          <RotateCcw size={10} /> {t("matches.reset")}
        </button>
      </div>

      <FilterSection title={t("matches.filterSections.maritalStatus")}>
        {MARITAL_OPTIONS.map(opt => <CheckboxOption key={opt} label={t(`data.maritalStatus.${opt}`)} checked={maritalStatus.includes(opt)} onChange={() => toggleArr(setMaritalStatus, opt)} />)}
      </FilterSection>

      <FilterSection title={t("matches.filterSections.ageRange")}>
        <div className="flex justify-between items-center mb-3">
          <span className="text-[0.78rem] font-semibold text-[#1c1917] bg-[#fdf3e3] border border-[#e8c98a] px-2.5 py-[2px] rounded-full">{minAge}</span>
          <span className="text-[0.7rem] text-gray-400">{t("matches.filterSections.to")}</span>
          <span className="text-[0.78rem] font-semibold text-[#1c1917] bg-[#fdf3e3] border border-[#e8c98a] px-2.5 py-[2px] rounded-full">{maxAge}</span>
        </div>
        <input type="range" min={18} max={50} value={minAge} onChange={e => setMinAge(Number(e.target.value))} className="w-full mb-2 h-[2px] accent-[#c2852a] cursor-pointer" />
        <input type="range" min={18} max={50} value={maxAge} onChange={e => setMaxAge(Number(e.target.value))} className="w-full h-[2px] accent-[#c2852a] cursor-pointer" />
      </FilterSection>

      <FilterSection title={t("matches.filterSections.religion")}>
        {RELIGION_OPTIONS.map(opt => <CheckboxOption key={opt} label={t(`data.religion.${opt}`)} checked={religions.includes(opt)} onChange={() => toggleArr(setReligions, opt)} />)}
      </FilterSection>

      <FilterSection title={t("matches.filterSections.city")} defaultOpen={false}>
        {CITY_OPTIONS.map(opt => <CheckboxOption key={opt} label={t(`data.city.${opt}`)} checked={cities.includes(opt)} onChange={() => toggleArr(setCities, opt)} />)}
      </FilterSection>

      <FilterSection title={t("matches.filterSections.profession")} defaultOpen={false}>
        {PROFESSION_OPTIONS.map(opt => <CheckboxOption key={opt} label={t(`data.profession.${opt}`)} checked={professions.includes(opt)} onChange={() => toggleArr(setProfessions, opt)} />)}
      </FilterSection>

      <FilterSection title={t("matches.filterSections.workingStatus")} defaultOpen={false}>
        {["Working", "Not working"].map(opt => <CheckboxOption key={opt} label={t(`data.working.${opt}`)} checked={workingFilter === opt} onChange={() => setWorkingFilter(prev => prev === opt ? "" : opt)} />)}
      </FilterSection>
    </>
  );
}

function formatDisplayName(name) {
  if (!name) return "";
  // Split on camelCase e.g. "rohanRane" → "Rohan Rane"
  const spaced = name.replace(/([a-z])([A-Z])/g, "$1 $2");
  // Capitalize first letter of each word
  return spaced
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export default function Matches() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // ✅ States — no duplicates
  const [allProfiles, setAllProfiles] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Newest First");
  const [maritalStatus, setMaritalStatus] = useState([]);
  const [minAge, setMinAge] = useState(22);
  const [maxAge, setMaxAge] = useState(35);
  const [religions, setReligions] = useState([]);
  const [cities, setCities] = useState([]);
  const [professions, setProfessions] = useState([]);
  const [workingFilter, setWorkingFilter] = useState("");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const MARITAL_OPTIONS = Object.keys(t("data.maritalStatus", { returnObjects: true }));
  const RELIGION_OPTIONS = Object.keys(t("data.religion", { returnObjects: true }));
  const CITY_OPTIONS = Object.keys(t("data.city", { returnObjects: true }));
  const PROFESSION_OPTIONS = Object.keys(t("data.profession", { returnObjects: true }));
  const WORKING_OPTIONS = Object.keys(t("data.working", { returnObjects: true }));

  const toggleArr = (setArr, val) => setArr(prev => prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val]);

  const clearAll = () => {
    setMaritalStatus([]); setMinAge(18); setMaxAge(50);
    setReligions([]); setCities([]); setProfessions([]);
    setWorkingFilter(""); setSearch("");
  };

  const activeFilterCount = maritalStatus.length + religions.length + cities.length + professions.length + (workingFilter ? 1 : 0);


  // ✅ Fetch real users from API
 useEffect(() => {
   const fetchUsers = async () => {
  try {
    setLoading(true);
    const res = await axiosInstance.get("/getUsers");
    const users = res.data.users;

    // ✅ Get current logged-in user's ID from localStorage
    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
    const currentUserId = currentUser?.id; 

    const mapped = users
      .filter(u => u._id !== currentUserId) // ✅ Exclude own profile
      .map(u => ({
        id:            u._id,
        name: (u.firstName && u.lastName)
        ? `${u.firstName.charAt(0).toUpperCase() + u.firstName.slice(1).toLowerCase()} ${u.lastName.charAt(0).toUpperCase() + u.lastName.slice(1).toLowerCase()}`
        : u.fullName || u.userName,       
        age:           u.dob ? Math.floor((new Date() - new Date(u.dob)) / 31557600000) : null,
        height:        u.height || "",
        photo:         u.photos?.[0] || null,
        city:          u.currentCity || u.city || "",
        country:       u.country || "",
        profession:    u.occupation || u.profession || "",
        religion:      u.religion || "",
        caste:         u.caste || "",
        maritalStatus: u.maritalStatus || "",
        working:       u.employmentType ? "Working" : "Not working",
      }));

    setAllProfiles(mapped);
    setResults(mapped);
  } catch (err) {
    console.error("Failed to fetch users:", err);
  } finally {
    setLoading(false);
  }
};

    fetchUsers();
  }, []);

  // ✅ Filter useEffect — allProfiles vaparato, profiles nahi
  useEffect(() => {
    let f = [...allProfiles];
    if (search)               f = f.filter(p => p.name?.toLowerCase().includes(search.toLowerCase()));
    if (maritalStatus.length) f = f.filter(p => maritalStatus.includes(p.maritalStatus));
    if (religions.length)     f = f.filter(p => religions.includes(p.religion));
    if (cities.length)        f = f.filter(p => cities.includes(p.city));
    if (professions.length)   f = f.filter(p => professions.includes(p.profession));
    if (workingFilter)        f = f.filter(p => p.working === workingFilter);
    // f = f.filter(p => p.age >= minAge && p.age <= maxAge);

    f = f.filter(p => p.age === null || (p.age >= minAge && p.age <= maxAge));

    if (sortBy === "Age: Low to High")  f.sort((a, b) => a.age - b.age);
    else if (sortBy === "Age: High to Low") f.sort((a, b) => b.age - a.age);
    setResults(f);
  }, [search, maritalStatus, minAge, maxAge, religions, cities, professions, workingFilter, sortBy, allProfiles]);

  useEffect(() => {
    document.body.style.overflow = mobileFilterOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileFilterOpen]);

  const sidebarProps = { t, maritalStatus, setMaritalStatus, minAge, setMinAge, maxAge, setMaxAge, religions, setReligions, cities, setCities, professions, setProfessions, workingFilter, setWorkingFilter, clearAll, toggleArr, MARITAL_OPTIONS, RELIGION_OPTIONS, CITY_OPTIONS, PROFESSION_OPTIONS, WORKING_OPTIONS };

  return (
    <>
      <style>{`
        .matches-card { transition: transform 0.22s ease, box-shadow 0.22s ease; }
        .matches-card:hover { transform: translateY(-3px); box-shadow: 0 16px 36px rgba(0,0,0,0.1) !important; }
        .matches-card:hover .card-photo { transform: scale(1.04); }
        .card-photo { transition: transform 0.4s ease; }
        .sidebar-scroll { scrollbar-width: thin; scrollbar-color: #e5e0d8 transparent; }
        .sidebar-scroll::-webkit-scrollbar { width: 3px; }
        .sidebar-scroll::-webkit-scrollbar-thumb { background: #e5e0d8; border-radius: 10px; }
        select:focus, input:focus { outline: none; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>

      <div className="min-h-screen mt-12">
        <div className="max-w-[1360px] mx-auto px-6 py-12 flex gap-6 items-start">

          {/* DESKTOP SIDEBAR */}
          <aside className="hidden md:block w-[248px] flex-shrink-0">
            <div className="sidebar-scroll bg-white rounded-2xl border border-[#ede8e1] shadow-[0_2px_16px_rgba(0,0,0,0.05)] sticky top-20 max-h-[calc(100vh-96px)] overflow-y-auto" style={{ padding: "1.4rem 1.2rem" }}>
              <SidebarContent {...sidebarProps} />
            </div>
          </aside>

          {/* MOBILE OVERLAY */}
          {mobileFilterOpen && (
            <div className="fixed inset-0 bg-black/45 z-[200] backdrop-blur-sm" style={{ animation: "fadeIn 0.2s ease" }} onClick={() => setMobileFilterOpen(false)} />
          )}

          {/* MOBILE DRAWER */}
          <div
            className={`sidebar-scroll fixed top-0 left-0 bottom-0 w-72 bg-white z-[201] overflow-y-auto shadow-[4px_0_24px_rgba(0,0,0,0.12)] transition-transform duration-[280ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${mobileFilterOpen ? "translate-x-0" : "-translate-x-full"}`}
            style={{ padding: "1.4rem 1.2rem" }}
          >
            <div className="flex justify-end mb-2">
              <button onClick={() => setMobileFilterOpen(false)} className="bg-[#f3efe9] border-none rounded-lg w-8 h-8 flex items-center justify-center cursor-pointer text-gray-500 hover:bg-[#ede8e1] transition-colors">
                <X size={16} />
              </button>
            </div>
            <SidebarContent {...sidebarProps} />
          </div>

          {/* MAIN */}
          <main className="flex-1 min-w-0">

            <div className="flex justify-between items-start flex-wrap gap-3 mb-5">
              <div>
                <h2 className="text-[3rem] font-bold text-[#1c1917] m-0 tracking-tight leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {t("matches.title")}
                </h2>
                <p className="text-gray-400 text-[0.78rem] mt-1 font-normal">{t("matches.subtitle")}</p>
              </div>

              <div className="flex items-center gap-2.5 flex-wrap">
                <button
                  onClick={() => setMobileFilterOpen(true)}
                  className={`md:hidden flex items-center gap-1.5 px-3.5 py-2 rounded-xl border-[1.5px] text-[0.8rem] font-semibold cursor-pointer transition-all ${
                    activeFilterCount > 0 ? "border-[#c2852a] bg-[#fdf3e3] text-[#c2852a]" : "border-[#e5e0d8] bg-white text-gray-700"
                  }`}
                >
                  <SlidersHorizontal size={14} />
                  {t("matches.filters")}
                  {activeFilterCount > 0 && (
                    <span className="bg-[#c2852a] text-white rounded-full w-[18px] h-[18px] inline-flex items-center justify-center text-[0.65rem] font-bold ml-0.5">
                      {activeFilterCount}
                    </span>
                  )}
                </button>

                <div className="relative">
                  <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    placeholder={t("matches.searchPlaceholder")}
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    className={`pl-8 pr-3.5 py-2 rounded-xl border text-[0.8rem] bg-white text-[#1c1917] w-[180px] transition-colors duration-150 outline-none ${searchFocused ? "border-[#c2852a]" : "border-[#e5e0d8]"}`}
                  />
                </div>

                <div className="relative">
                  <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="appearance-none pl-3 pr-7 py-2 rounded-xl border border-[#e5e0d8] text-[0.8rem] text-gray-700 bg-white cursor-pointer outline-none">
                    <option value="Newest First">{t("matches.sort.newestFirst")}</option>
                    <option value="Age: Low to High">{t("matches.sort.ageLow")}</option>
                    <option value="Age: High to Low">{t("matches.sort.ageHigh")}</option>
                  </select>
                  <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <p className="text-[0.78rem] text-gray-400 mb-4">
              <span className="font-semibold text-gray-700">{results.length}</span> {t("matches.matchesFound")}
            </p>

            {/* ✅ Loading state */}
            {loading ? (
              <div className="text-center py-20 text-gray-400 text-sm">Loading profiles...</div>
            ) : results.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <p className="text-base font-medium text-gray-500">{t("matches.noMatches")}</p>
                <p className="text-[0.8rem] mt-1.5">{t("matches.noMatchesHint")}</p>
              </div>
            ) : (
              <>
                <div className="md:hidden flex flex-col gap-4 h-[calc(100svh-220px)] overflow-y-scroll snap-y snap-mandatory scroll-smooth pr-1" style={{ scrollbarWidth: "none" }}>
                  {results.map(p => (
                    <div key={p.id} className="snap-start snap-always flex-shrink-0">
                      <ProfileCard profile={p} onView={() => navigate(`/profile/${p.id}`)} connectLabel={t("matches.connect")} />
                    </div>
                  ))}
                </div>
                <div className="hidden md:grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {results.map(p => <ProfileCard key={p.id} profile={p} onView={() => navigate(`/profile/${p.id}`)} connectLabel={t("matches.connect")} />)}
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </>
  );
}

function ProfileCard({ profile: p, onView, connectLabel }) {
  const { t } = useTranslation();
  return (
    <div className="matches-card bg-white rounded-2xl overflow-hidden border border-[#ede8e1] shadow-[0_1px_6px_rgba(0,0,0,0.05)]">
      <div className="relative h-[220px] bg-[#f0ece7] cursor-pointer overflow-hidden" onClick={onView}>
        <div className="card-photo w-full h-full">
          {p.photo ? <img src={p.photo} alt={p.name} className="w-full h-full object-cover" /> : <AvatarPlaceholder name={p.name} />}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(28,25,23,0.32)] to-transparent" />
      </div>
      <div className="p-3.5">
        <div className="flex justify-between items-start mb-2.5">
          <div>
            <h3 onClick={onView} className="font-bold text-[1.75rem] text-[#1c1917] cursor-pointer leading-tight m-0 tracking-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {p.name}
            </h3>
              <p className="text-[#686f7c] text-[0.71rem] mt-0.5 font-normal">
                {p.age ? `${p.age} yrs` : "Age not specified"}
                {p.height ? ` · ${p.height}` : ""}
              </p>          
          </div>
        </div>
        <div className="flex flex-col gap-1.5 mb-3">
          {[
            { icon: <MapPin size={15} />,    text: `${p.city || "City not specified"} ${p.country || ""}` },
            { icon: <Briefcase size={15} />, text: p.profession || "Not specified" },          
            { icon: <BookOpen size={15} />,  text: `${p.religion || "Religion not specified"} ${p.caste ? `· ${p.caste}` : ""}` },
          ].map(({ icon, text }, i) => (
            <div key={i} className="flex items-center gap-1.5 text-gray-500 text-[0.74rem]">
              <span className="text-[#c2852a] flex-shrink-0">{icon}</span>
              <span className="overflow-hidden text-ellipsis whitespace-nowrap">{text}</span>
            </div>
          ))}
        </div>
        <div className="h-px bg-[#f3efe9] mb-3" />
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onView(); }}
            className="flex-1 py-2 rounded-lg border-none bg-[#1c1917] text-white text-[0.72rem] font-semibold flex items-center justify-center gap-1 tracking-wide hover:opacity-85 active:opacity-70 transition-opacity cursor-pointer"
          >
            <Heart size={11} fill="white" /> {connectLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
