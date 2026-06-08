// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   MapPin, Briefcase, GraduationCap, Heart, ArrowLeft,
//   Star, Lock, CheckCircle
// } from "lucide-react";
// import { useTranslation } from "react-i18next";
// import { useShortlist } from "../context/ShortlistContext";
// import { useInterest } from "../context/InterestContext";
// import axiosInstance from "../services/axiosInstance";

// const AVATAR_BG = [
//   ["#d4cfc9", "#b8b0a6"],
//   ["#c9cfd4", "#c6ced3"],
//   ["#cfd4cc", "#adb8a8"],
//   ["#d4cac9", "#b8a6a6"],
// ];

// function AvatarPlaceholder({ name }) {
//   const initials = name?.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
//   const [g1, g2] = AVATAR_BG[initials?.charCodeAt(0) % AVATAR_BG.length];
//   return (
//     <div
//       className="w-full h-full flex items-center justify-center"
//       style={{ background: `linear-gradient(145deg, ${g1}, ${g2})` }}
//     >
//       <span
//         className="font-bold tracking-[4px]"
//         style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "5rem", color: "rgba(255,255,255,0.82)" }}
//       >
//         {initials}
//       </span>
//     </div>
//   );
// }

// function CardTitle({ children }) {
//   return (
//     <h2
//       className="flex items-center gap-2.5 m-0 mb-[1.1rem] text-[1.2rem] font-bold text-[#1c1917] tracking-tight"
//       style={{ fontFamily: "'Cormorant Garamond', serif" }}
//     >
//       <span className="w-[3px] h-5 rounded-[2px] bg-[#c2852a] flex-shrink-0" />
//       {children}
//     </h2>
//   );
// }

// function DetailItem({ icon, label, value }) {
//   if (!value) return null;
//   return (
//     <div className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-[#f9f7f4] transition-colors">
//       {icon && <span className="text-[#c2852a] mt-0.5 flex-shrink-0">{icon}</span>}
//       <div>
//         <p className="text-[0.67rem] font-bold tracking-[0.06em] uppercase text-gray-400 m-0 mb-0.5">{label}</p>
//         <p className="text-[0.83rem] font-semibold text-[#1c1917] m-0">{value}</p>
//       </div>
//     </div>
//   );
// }

// export default function ViewProfile() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { t } = useTranslation();
//   const { addToShortlist, isShortlisted } = useShortlist();
//   const { sendInterest, hasSentInterest } = useInterest();
//   const [isUnlocked, setIsUnlocked] = useState(false);

//   // ✅ Real API state
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);

//   // ✅ Fetch profile by ID from API
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         setLoading(true);
//         setError(false);
//         const res = await axiosInstance.get(`/users/${id}/profile`);
//         const u = res.data.user;

//         // Map backend fields to UI fields
//         setProfile({
//           id:            u._id,
//           name:          u.fullName || u.userName,
//           age:           u.dob ? Math.floor((new Date() - new Date(u.dob)) / 31557600000) : null,
//           height:        u.height || "",
//           photo:         u.photos?.[0] || null,
//           city:          u.currentCity || u.city || "",
//           country:       u.country || "",
//           religion:      u.religion || "",
//           caste:         u.caste || "",
//           maritalStatus: u.maritalStatus || "",
//           diet:          u.diet || "",
//           about:         u.about || "",
//           working:       u.employmentType || "",
//           // Professional
//           profession:    u.occupation || "",
//           jobRole:       u.occupation || "",
//           workingSector: u.employmentType || "",
//           annualIncome:  u.income || "",
//           workLocation:  u.workLocation || "",
//           workType:      u.employmentType || "",
//           // Education
//           education:     u.education || "",
//           fieldOfStudy:  u.fieldOfStudy || "",
//           college:       u.college || "",
//           // Lifestyle
//           hobbies:       Array.isArray(u.hobbies) ? u.hobbies.join(", ") : u.hobbies || "",
//           languages:     Array.isArray(u.languages) ? u.languages.join(", ") : u.languages || "",
//           // Family
//           fatherName:    u.fatherName || "",
//           motherName:    u.motherName || "",
//           familyType:    u.familyType || "",
//           siblings:      u.brothers || u.sisters
//             ? `${u.brothers || 0} Brothers, ${u.sisters || 0} Sisters`
//             : "",
//           // Partner preferences
//           preferences:   u.partnerDesc || "",
//         });
//       } catch (err) {
//         console.error("Failed to fetch profile:", err);
//         setError(true);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) fetchProfile();
//   }, [id]);

//   const shouldBlur = false; // Lock feature hatavli — real users la lock nako

//   // ✅ Loading state
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#f9f7f4]">
//         <p className="text-gray-400 text-sm">Loading profile...</p>
//       </div>
//     );
//   }

//   // ✅ Error / not found
//   if (error || !profile) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#f9f7f4]">
//         <div className="text-center">
//           <p className="text-gray-500">{t("viewProfile.profileNotFound")}</p>
//           <button
//             onClick={() => navigate(-1)}
//             className="mt-4 text-[#c2852a] bg-transparent border-none cursor-pointer text-[0.85rem]"
//           >
//             ← {t("viewProfile.goBack")}
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const lbl = (key) => t(`viewProfile.labels.${key}`);

//   return (
//     <>
//       <div className="min-h-screen px-6 pt-8 pb-16 mt-12">
//         <div className="max-w-[1200px] mx-auto">

//           {/* Back button */}
//           <button
//             onClick={() => navigate(-1)}
//             className="inline-flex items-center gap-1.5 mb-6 text-gray-500 text-[0.8rem] font-medium bg-white border border-[#ede8e1] rounded-lg px-3.5 py-1.5 cursor-pointer hover:text-[#c2852a] hover:border-[#e8c98a] transition-colors"
//           >
//             <ArrowLeft size={13} /> {t("viewProfile.backBtn")}
//           </button>

//           {/* Two-column grid */}
//           <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 items-start">

//             {/* ── LEFT COLUMN ── */}
//             <div className="lg:sticky lg:top-20">
//               <div className="bg-white border border-[#ede8e1] rounded-2xl overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.06)]">

//                 {/* Photo */}
//                 <div className="relative aspect-[3/4] bg-[#f0ece7] overflow-hidden">
//                   {profile.photo
//                     ? <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover" />
//                     : <AvatarPlaceholder name={profile.name} />
//                   }
//                   <div
//                     className="absolute inset-0"
//                     style={{ background: "linear-gradient(to top, rgba(28,25,23,0.28) 0%, transparent 50%)" }}
//                   />

//                   {/* Verified badge */}
//                   <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-[0.65rem] font-semibold tracking-[0.03em] bg-white/90 text-[#1c1917] border border-[#ede8e1] backdrop-blur-sm">
//                     <CheckCircle size={16} className="text-blue-500" fill="currentColor" stroke="white" strokeWidth={3} />
//                     {t("viewProfile.verified")}
//                   </div>
//                 </div>

//                 {/* Name strip */}
//                 <div className="bg-[#1c1917] px-5 pt-5 pb-4">
//                   <h1
//                     className="m-0 mb-1 text-white font-bold tracking-tight leading-tight text-[1.55rem]"
//                     style={{ fontFamily: "'Cormorant Garamond', serif" }}
//                   >
//                     {profile.name}{profile.age ? `, ${profile.age}` : ""}
//                   </h1>
//                   <div className="flex items-center gap-1 text-white/55 text-[0.78rem]">
//                     <MapPin size={12} />
//                     <span>{profile.city}{profile.country ? `, ${profile.country}` : ""}</span>
//                   </div>
//                 </div>

//                 {/* Tag pills */}
//                 <div className="flex flex-wrap gap-1.5 px-5 pt-4">
//                   {profile.religion && (
//                     <span className="px-3 py-1 rounded-full text-[0.7rem] font-medium border bg-[#fdf3e3] text-[#c2852a] border-[#e8c98a]">
//                       {profile.religion}
//                     </span>
//                   )}
//                   {profile.diet && (
//                     <span className="px-3 py-1 rounded-full text-[0.7rem] font-medium border bg-green-50 text-green-600 border-green-200">
//                       {profile.diet}
//                     </span>
//                   )}
//                   {profile.maritalStatus && (
//                     <span className="px-3 py-1 rounded-full text-[0.7rem] font-medium border bg-blue-50 text-blue-600 border-blue-200">
//                       {profile.maritalStatus}
//                     </span>
//                   )}
//                 </div>

//                 {/* Action buttons */}
//                 <div className="px-5 pt-4 pb-5 flex flex-col gap-2">

//                   {/* Send Interest */}
//                   <button
//                     disabled={hasSentInterest(profile.id)}
//                     onClick={() => sendInterest(profile)}
//                     className={`w-full py-3 rounded-xl text-[0.82rem] font-semibold flex items-center justify-center gap-1.5 tracking-wide transition-all ${
//                       hasSentInterest(profile.id)
//                         ? "bg-green-100 text-green-700 cursor-not-allowed"
//                         : "bg-[#1c1917] text-white hover:opacity-85 cursor-pointer"
//                     }`}
//                   >
//                     <Heart
//                       size={13}
//                       fill={hasSentInterest(profile.id) ? "none" : "white"}
//                       className={hasSentInterest(profile.id) ? "text-green-600" : ""}
//                     />
//                     {hasSentInterest(profile.id)
//                       ? t("viewProfile.interestSent")
//                       : t("viewProfile.sendInterest")}
//                   </button>

//                   {/* Shortlist */}
//                   <button
//                     onClick={() => addToShortlist(profile)}
//                     className={`w-full py-2.5 rounded-xl text-[0.82rem] font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
//                       isShortlisted(profile.id)
//                         ? "bg-[#fdf3e3] border-[1.5px] border-[#e8c98a] text-[#c2852a]"
//                         : "bg-white border-[1.5px] border-[#e5e0d8] text-gray-500 hover:border-[#c2852a] hover:text-[#c2852a]"
//                     }`}
//                   >
//                     <Star
//                       size={12}
//                       fill={isShortlisted(profile.id) ? "#c2852a" : "none"}
//                       stroke={isShortlisted(profile.id) ? "#c2852a" : "currentColor"}
//                     />
//                     {isShortlisted(profile.id)
//                       ? t("viewProfile.shortlisted")
//                       : t("viewProfile.shortlist")}
//                   </button>

//                 </div>
//               </div>
//             </div>

//             {/* ── RIGHT COLUMN ── */}
//             <div className="flex flex-col gap-5">

//               {/* About */}
//               {profile.about && (
//                 <div className="bg-white border border-[#ede8e1] rounded-2xl p-7 shadow-[0_2px_10px_rgba(0,0,0,0.045)]">
//                   <CardTitle>{t("viewProfile.aboutTitle")}</CardTitle>
//                   <p className="text-gray-500 text-[0.87rem] leading-[1.75] m-0">{profile.about}</p>
//                   {profile.preferences && (
//                     <>
//                       <div className="h-px bg-[#f0ede9] my-[1.1rem]" />
//                       <CardTitle>{t("viewProfile.preferencesTitle")}</CardTitle>
//                       <p className="text-gray-500 text-[0.87rem] leading-[1.75] m-0">{profile.preferences}</p>
//                     </>
//                   )}
//                 </div>
//               )}

//               {/* Professional Details */}
//               <div className="bg-white border border-[#ede8e1] rounded-2xl p-7 shadow-[0_2px_10px_rgba(0,0,0,0.045)]">
//                 <CardTitle>{t("viewProfile.professionalTitle")}</CardTitle>
//                 <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-1">
//                   <DetailItem icon={<Briefcase size={13} />} label={lbl("profession")}   value={profile.profession} />
//                   <DetailItem icon={<Briefcase size={13} />} label={lbl("annualIncome")} value={profile.annualIncome} />
//                   <DetailItem icon={<MapPin size={13} />}    label={lbl("workLocation")} value={profile.workLocation} />
//                   <DetailItem icon={<Briefcase size={13} />} label={lbl("workType")}     value={profile.workType} />
//                 </div>
//               </div>

//               {/* Education */}
//               <div className="bg-white border border-[#ede8e1] rounded-2xl p-7 shadow-[0_2px_10px_rgba(0,0,0,0.045)]">
//                 <CardTitle>{t("viewProfile.educationTitle")}</CardTitle>
//                 <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-1">
//                   <DetailItem icon={<GraduationCap size={13} />} label={lbl("education")}    value={profile.education} />
//                   <DetailItem icon={<GraduationCap size={13} />} label="Field of Study"      value={profile.fieldOfStudy} />
//                   <DetailItem icon={<GraduationCap size={13} />} label="College"             value={profile.college} />
//                   <DetailItem label={lbl("hobbies")} value={profile.hobbies} />
//                   <DetailItem label="Languages"      value={profile.languages} />
//                 </div>
//               </div>

//               {/* Family Details */}
//               <div className="bg-white border border-[#ede8e1] rounded-2xl p-7 shadow-[0_2px_10px_rgba(0,0,0,0.045)]">
//                 <CardTitle>{t("viewProfile.familyTitle")}</CardTitle>
//                 <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-1">
//                   <DetailItem label={lbl("fatherName")} value={profile.fatherName} />
//                   <DetailItem label={lbl("motherName")} value={profile.motherName} />
//                   <DetailItem label={lbl("siblings")}   value={profile.siblings} />
//                   <DetailItem label={lbl("familyType")} value={profile.familyType} />
//                 </div>
//               </div>

//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }










import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  MapPin, Briefcase, GraduationCap, Heart, ArrowLeft,
  Star, CheckCircle, User, Home, BookOpen, Leaf, Users
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useShortlist } from "../context/ShortlistContext";
import { useInterest } from "../context/InterestContext";
import axiosInstance from "../services/axiosInstance";

const AVATAR_BG = [
  ["#d4cfc9", "#b8b0a6"],
  ["#c9cfd4", "#c6ced3"],
  ["#cfd4cc", "#adb8a8"],
  ["#d4cac9", "#b8a6a6"],
];

function AvatarPlaceholder({ name }) {
  const initials = name?.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  const [g1, g2] = AVATAR_BG[initials?.charCodeAt(0) % AVATAR_BG.length];
  return (
    <div className="w-full h-full flex items-center justify-center"
      style={{ background: `linear-gradient(145deg, ${g1}, ${g2})` }}>
      <span className="font-bold tracking-[4px]"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "5rem", color: "rgba(255,255,255,0.82)" }}>
        {initials}
      </span>
    </div>
  );
}

function CardTitle({ icon, children }) {
  return (
    <h2 className="flex items-center gap-2.5 m-0 mb-5 text-[1.1rem] font-bold text-[#1c1917] tracking-tight"
      style={{ fontFamily: "'Cormorant Garamond', serif" }}>
      <span className="w-[3px] h-5 rounded-[2px] bg-[#c2852a] flex-shrink-0" />
      {icon && <span className="text-[#c2852a]">{icon}</span>}
      {children}
    </h2>
  );
}

function DetailItem({ label, value }) {
  if (!value) return null;
  return (
    <div className="flex flex-col gap-0.5 p-2.5 rounded-xl hover:bg-[#f9f7f4] transition-colors">
      <p className="text-[0.67rem] font-bold tracking-[0.06em] uppercase text-gray-400 m-0">{label}</p>
      <p className="text-[0.83rem] font-semibold text-[#1c1917] m-0">{value}</p>
    </div>
  );
}

function SectionCard({ icon, title, children }) {
  return (
    <div className="bg-white border border-[#ede8e1] rounded-2xl p-7 shadow-[0_2px_10px_rgba(0,0,0,0.045)]">
      <CardTitle icon={icon}>{title}</CardTitle>
      {children}
    </div>
  );
}

function formatHeight(raw) {
  if (!raw) return "";
  const parts = String(raw).split("-");
  const ft = parts[0];
  const inch = parts[1];
  if (!ft) return "";
  if (inch !== undefined && inch !== "" && inch !== "0") return `${ft}'${inch}`;
  return `${ft}`;
}

function formatWeight(raw) {
  if (!raw) return "";
  const str = String(raw).trim();
  if (str.toLowerCase().includes("kg")) return str; // already has kg
  return `${str} kg`;
}

export default function ViewProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { addToShortlist, isShortlisted } = useShortlist();
  const { sendInterest, hasSentInterest } = useInterest();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await axiosInstance.get(`/users/${id}/profile`);
        const u = res.data.user;
        setProfile({
          // Basic
          id:              u._id,
          name: (u.firstName && u.lastName)
            ? `${u.firstName.charAt(0).toUpperCase() + u.firstName.slice(1).toLowerCase()} ${u.lastName.charAt(0).toUpperCase() + u.lastName.slice(1).toLowerCase()}`
            : u.fullName || u.userName,          
          age:             u.dob ? Math.floor((new Date() - new Date(u.dob)) / 31557600000) : null,
          dob:             u.dob ? new Date(u.dob).toLocaleDateString("en-IN") : "",
          height: u.height || "",
          weight: u.weight || "",
          bodyType:        u.bodyType || "",
          complexion:      u.complexion || "",
          gender:          u.gender || "",
          maritalStatus:   u.maritalStatus || "",
          profileFor:      u.profileFor || "",
          mobile:          u.mobile || "",
          about:           u.about || "",
          photo:           u.photos?.[0] || null,
          // Location
          city:            u.currentCity || "",
          currentState:    u.currentState || "",
          country:         u.country || "",
          motherTongue:    u.motherTongue || "",
          nationality:     u.nationality || "",
          district:        u.district || "",
          taluka:          u.taluka || "",
          pincode:         u.pincode || "",
          // Astrology
          birthCity:       u.birthCity || "",
          birthTime:       u.birthTime || "",
          rashi:           u.rashi || "",
          nakshatra:       u.nakshatra || "",
          gotra:           u.gotra || "",
          manglik:         u.manglik || "",
          // Religion
          religion:        u.religion || "",
          caste:           u.caste || "",
          subCaste:        u.subCaste || "",
          casteNoBar:      u.casteNoBar || "",
          religiousPractice: u.religiousPractice || "",
          community:       u.community || "",
          // Family
          fatherName:      u.fatherName || "",
          fatherOccupation: u.fatherOccupation || "",
          motherName:      u.motherName || "",
          motherOccupation: u.motherOccupation || "",
          familyType:      u.familyType || "",
          familyValues:    u.familyValues || "",
          familyStatus:    u.familyStatus || "",
          familyLocation:  u.familyLocation || "",
          fatherDistrict:         u.fatherDistrict || "",
          fatherTaluka:           u.fatherTaluka || "",
          fatherVillage:          u.fatherVillage || "",
          fatherRelativeSurname: u.fatherRelativeSurname || "",
          motherDistrict:         u.motherDistrict || "",
          motherTaluka:           u.motherTaluka || "",
          motherVillage:          u.motherVillage || "",
          motherRelativeSurname: u.motherRelativeSurname || "",
          // Education & Career
          education:       u.education || "",
          fieldOfStudy:    u.fieldOfStudy || "",
          college:         u.college || "",
          employmentType:  u.employmentType || "",
          occupation:      u.occupation || "",
          company:         u.company || "",
          income:          u.income || "",
          workLocation:    u.workLocation || "",
          // Lifestyle
          diet:            u.diet || "",
          smoking:         u.smoking || "",
          drinking:        u.drinking || "",
          fitness:         u.fitness || "",
          hobbies:         Array.isArray(u.hobbies) ? u.hobbies.join(", ") : u.hobbies || "",
          languages:       Array.isArray(u.languages) ? u.languages.join(", ") : u.languages || "",
          vehicle:         u.vehicle || "",
          property:        u.property || "",
          // Partner preferences
          partnerAgeMin:   u.partnerAgeMin || "",
          partnerAgeMax:   u.partnerAgeMax || "",
          partnerHeightMin: u.partnerHeightMin || "",
          partnerHeightMax: u.partnerHeightMax || "",
          partnerMaritalStatus: u.partnerMaritalStatus || "",
          partnerReligion: u.partnerReligion || "",
          partnerCaste:    u.partnerCaste || "",
          partnerEducation: u.partnerEducation || "",
          partnerIncome:   u.partnerIncome || "",
          partnerLocation: u.partnerLocation || "",
          partnerDiet:     u.partnerDiet || "",
          partnerManglik:  u.partnerManglik || "",
          partnerDesc:     u.partnerDesc || "",
          preferredSurname: u.preferredSurname || "",
        });
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProfile();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9f7f4]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#c2852a] border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">{t("viewProfile.loading")}</p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9f7f4]">
        <div className="text-center">
          <p className="text-gray-500">{t("viewProfile.profileNotFound")}</p>
          <button onClick={() => navigate(-1)}
            className="mt-4 text-[#c2852a] bg-transparent border-none cursor-pointer text-[0.85rem]">
            ← {t("viewProfile.goBack")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 md:px-6 pt-8 pb-16 mt-12 bg-[#f9f7f4]">
      <div className="max-w-[1200px] mx-auto">

        {/* Back button */}
        <button onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 mb-6 text-gray-500 text-[0.8rem] font-medium bg-white border border-[#ede8e1] rounded-lg px-3.5 py-1.5 cursor-pointer hover:text-[#c2852a] hover:border-[#e8c98a] transition-colors">
          <ArrowLeft size={13} /> {t("viewProfile.backBtn")}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 items-start">

          {/* ── LEFT COLUMN ── */}
          <div className="lg:sticky lg:top-20 flex flex-col gap-4">
            <div className="bg-white border border-[#ede8e1] rounded-2xl overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.06)]">

              {/* Photo */}
              <div className="relative aspect-[3/4] bg-[#f0ece7] overflow-hidden">
                {profile.photo
                  ? <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover" />
                  : <AvatarPlaceholder name={profile.name} />
                }
                <div className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(28,25,23,0.28) 0%, transparent 50%)" }} />
                
              </div>

              {/* Name strip */}
              <div className="bg-[#1c1917] px-5 pt-5 pb-4">
                <h1 className="m-0 mb-1 text-white font-bold tracking-tight leading-tight text-[1.55rem]"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {profile.name}{profile.age ? `, ${profile.age}` : ""}
                </h1>
                <div className="flex items-center gap-1 text-white/55 text-[0.78rem]">
                  <MapPin size={12} />
                  <span>{[profile.city, profile.currentState, profile.country].filter(Boolean).join(", ")}</span>
                </div>
              </div>

              {/* Tag pills */}
              <div className="flex flex-wrap gap-1.5 px-5 pt-4">
                {profile.religion && (
                  <span className="px-3 py-1 rounded-full text-[0.7rem] font-medium border bg-[#fdf3e3] text-[#c2852a] border-[#e8c98a]">
                    {profile.religion}
                  </span>
                )}
                {profile.diet && (
                  <span className="px-3 py-1 rounded-full text-[0.7rem] font-medium border bg-green-50 text-green-600 border-green-200">
                    {profile.diet}
                  </span>
                )}
                {profile.maritalStatus && (
                  <span className="px-3 py-1 rounded-full text-[0.7rem] font-medium border bg-blue-50 text-blue-600 border-blue-200">
                    {profile.maritalStatus}
                  </span>
                )}
                {profile.motherTongue && (
                  <span className="px-3 py-1 rounded-full text-[0.7rem] font-medium border bg-purple-50 text-purple-600 border-purple-200">
                    {profile.motherTongue}
                  </span>
                )}
              </div>

              {/* Action buttons */}
              <div className="px-5 pt-4 pb-5 flex flex-col gap-2">
                <button
                  disabled={hasSentInterest(profile.id)}
                  onClick={() => sendInterest(profile)}
                  className={`w-full py-3 rounded-xl text-[0.82rem] font-semibold flex items-center justify-center gap-1.5 tracking-wide transition-all ${
                    hasSentInterest(profile.id)
                      ? "bg-green-100 text-green-700 cursor-not-allowed"
                      : "bg-[#1c1917] text-white hover:opacity-85 cursor-pointer"
                  }`}>
                  <Heart size={13} fill={hasSentInterest(profile.id) ? "none" : "white"}
                    className={hasSentInterest(profile.id) ? "text-green-600" : ""} />
                    {
                      hasSentInterest(profile.id)
                        ? t("viewProfile.interestSent")
                        : t("viewProfile.sendInterest")
                    }                
                  </button>

                <button
                  onClick={() => addToShortlist(profile)}
                  className={`w-full py-2.5 rounded-xl text-[0.82rem] font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                    isShortlisted(profile.id)
                      ? "bg-[#fdf3e3] border-[1.5px] border-[#e8c98a] text-[#c2852a]"
                      : "bg-white border-[1.5px] border-[#e5e0d8] text-gray-500 hover:border-[#c2852a] hover:text-[#c2852a]"
                  }`}>
                  <Star size={12} fill={isShortlisted(profile.id) ? "#c2852a" : "none"}
                    stroke={isShortlisted(profile.id) ? "#c2852a" : "currentColor"} />
                    {
                      isShortlisted(profile.id)
                        ? t("viewProfile.shortlisted")
                        : t("viewProfile.shortlist")
                    }                
               </button>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="flex flex-col gap-5">

            {/* About */}
            {profile.about && (
              <SectionCard icon={<User size={14} />} title={t("viewProfile.aboutTitle")}>
                <p className="text-gray-500 text-[0.87rem] leading-[1.75] m-0">{profile.about}</p>
              </SectionCard>
            )}

            {/* Basic Details */}
            <SectionCard icon={<User size={14} />} title={t("viewProfile.basicDetailsTitle")}>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
              <DetailItem label={t("viewProfile.labels.dob")}           value={profile.dob} />
              <DetailItem label={t("viewProfile.labels.height")} value={formatHeight(profile.height)} />
              <DetailItem label={t("viewProfile.labels.weight")} value={formatWeight(profile.weight)} />
              <DetailItem label={t("viewProfile.labels.bodyType")}      value={profile.bodyType} />
              <DetailItem label={t("viewProfile.labels.complexion")}    value={profile.complexion} />
              <DetailItem label={t("viewProfile.labels.maritalStatus")} value={profile.maritalStatus} />
              <DetailItem label={t("viewProfile.labels.profileFor")}    value={profile.profileFor} />
              <DetailItem label={t("viewProfile.labels.motherTongue")}  value={profile.motherTongue} />
              <DetailItem label={t("viewProfile.labels.nationality")}   value={profile.nationality} />
              <DetailItem label={t("viewProfile.labels.mobile")}        value={profile.mobile} />
              <DetailItem label={t("viewProfile.labels.city")}          value={profile.city} />
              <DetailItem label={t("viewProfile.labels.currentState")}  value={profile.currentState} />
              <DetailItem label={t("viewProfile.labels.country")}       value={profile.country} />  
              <DetailItem label={t("viewProfile.labels.district")} value={profile.district} />
              <DetailItem label={t("viewProfile.labels.taluka")} value={profile.taluka} />
              <DetailItem label={t("viewProfile.labels.pincode")} value={profile.pincode} />     
              <DetailItem label={t("viewProfile.labels.caste")} value={profile.caste}/>   
              </div>
            </SectionCard>

            {/* Astrology */}
            {(profile.rashi || profile.nakshatra || profile.gotra || profile.manglik) && (
              <SectionCard icon={<span className="text-sm">🔯</span>} title={t("viewProfile.astrologyTitle")}>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
                <DetailItem label={t("viewProfile.labels.birthCity")}  value={profile.birthCity} />
                <DetailItem
                  label={t("viewProfile.labels.birthTime")}
                  value={
                    profile.birthTime
                      ? (() => {
                          let [hours, minutes] = profile.birthTime.split(":");

                          hours = parseInt(hours, 10);

                          const ampm = hours >= 12 ? "PM" : "AM";

                          hours = hours % 12 || 12;

                          return `${hours}:${minutes} ${ampm}`;
                        })()
                      : ""
                  }
                />
                <DetailItem label={t("viewProfile.labels.rashi")}      value={profile.rashi} />
                <DetailItem label={t("viewProfile.labels.nakshatra")}  value={profile.nakshatra} />
                <DetailItem label={t("viewProfile.labels.gotra")}      value={profile.gotra} />
                <DetailItem label={t("viewProfile.labels.manglik")}    value={profile.manglik} />
                </div>
              </SectionCard>
            )}

            

            {/* Professional */}
            <SectionCard icon={<Briefcase size={14} />} title={t("viewProfile.professionalTitle")}>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
                <DetailItem label={t("viewProfile.labels.occupation")}      value={profile.occupation} />
                <DetailItem label={t("viewProfile.labels.employmentType")}  value={profile.employmentType} />
                <DetailItem label={t("viewProfile.labels.company")}         value={profile.company} />
                <DetailItem label={t("viewProfile.labels.annualIncome")}    value={profile.income} />
                <DetailItem label={t("viewProfile.labels.workLocation")}    value={profile.workLocation} />
              </div>
            </SectionCard>

            {/* Education */}
            <SectionCard icon={<GraduationCap size={14} />} title={t("viewProfile.educationTitle")}>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
                <DetailItem label={t("viewProfile.labels.education")}    value={profile.education} />
                <DetailItem label={t("viewProfile.labels.fieldOfStudy")} value={profile.fieldOfStudy} />
                <DetailItem label={t("viewProfile.labels.college")}      value={profile.college} />
              </div>
            </SectionCard>

            {/* Lifestyle */}
            <SectionCard icon={<Leaf size={14} />} title={t("viewProfile.lifestyleTitle")}>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
                <DetailItem label={t("viewProfile.labels.diet")}     value={profile.diet} />
                <DetailItem label={t("viewProfile.labels.smoking")}  value={profile.smoking} />
                <DetailItem label={t("viewProfile.labels.drinking")} value={profile.drinking} />
                <DetailItem label={t("viewProfile.labels.fitness")}  value={profile.fitness} />
                <DetailItem label={t("viewProfile.labels.vehicle")}  value={profile.vehicle} />
                <DetailItem label={t("viewProfile.labels.property")} value={profile.property} />
              </div>
              {profile.hobbies && (
                <div className="mt-3">
                  <p className="text-[0.67rem] font-bold tracking-[0.06em] uppercase text-gray-400 mb-2">{t("viewProfile.labels.hobbies")}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {profile.hobbies.split(", ").map(h => (
                      <span key={h} className="px-3 py-1 rounded-full text-[0.72rem] font-medium bg-[#fdf3e3] text-[#c2852a] border border-[#e8c98a]">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {profile.languages && (
                <div className="mt-3">
                  <p className="text-[0.67rem] font-bold tracking-[0.06em] uppercase text-gray-400 mb-2">{t("viewProfile.labels.languages")}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {profile.languages.split(", ").map(l => (
                      <span key={l} className="px-3 py-1 rounded-full text-[0.72rem] font-medium bg-blue-50 text-blue-600 border border-blue-200">
                        {l}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </SectionCard>

            {/* Family */}
            <SectionCard icon={<Users size={14} />} title={t("viewProfile.familyTitle")}>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
                <DetailItem label={t("viewProfile.labels.fatherName")}        value={profile.fatherName} />
                <DetailItem label={t("viewProfile.labels.fatherOccupation")}  value={profile.fatherOccupation} />
                <DetailItem label={t("viewProfile.labels.motherName")}        value={profile.motherName} />
                <DetailItem label={t("viewProfile.labels.motherOccupation")}  value={profile.motherOccupation} />
                <DetailItem label={t("viewProfile.labels.siblings")} value={profile.siblings}/>
                <DetailItem label={t("viewProfile.labels.married")} value={profile.siblingsMarried} />
                <DetailItem label={t("viewProfile.labels.familyType")}        value={profile.familyType} />
                <DetailItem label={t("viewProfile.labels.familyValues")}      value={profile.familyValues} />
                <DetailItem label={t("viewProfile.labels.familyStatus")}      value={profile.familyStatus} />
                <DetailItem label={t("viewProfile.labels.familyLocation")}    value={profile.familyLocation} />
                <DetailItem label={t("viewProfile.labels.fatherDistrict")} value={profile.fatherDistrict} />
                <DetailItem label={t("viewProfile.labels.fatherTaluka")} value={profile.fatherTaluka} />
                <DetailItem label={t("viewProfile.labels.fatherVillage")} value={profile.fatherVillage} />
                <DetailItem label={t("viewProfile.labels.fatherRelativeSurname")} value={profile.fatherRelativeSurname} />
                <DetailItem label={t("viewProfile.labels.motherDistrict")} value={profile.motherDistrict} />
                <DetailItem label={t("viewProfile.labels.motherTaluka")} value={profile.motherTaluka} />
                <DetailItem label={t("viewProfile.labels.motherVillage")} value={profile.motherVillage} />
                <DetailItem label={t("viewProfile.labels.motherRelativeSurname")} value={profile.motherRelativeSurname} />
              </div>
            </SectionCard>

            {/* Partner Preferences */}
            {(profile.partnerAgeMin || profile.partnerDesc) && (
              <SectionCard icon={<Heart size={14} />} title={t("viewProfile.partnerTitle")}>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
                  <DetailItem label={t("viewProfile.labels.ageRange")}        value={profile.partnerAgeMin && profile.partnerAgeMax ? `${profile.partnerAgeMin} – ${profile.partnerAgeMax}` : ""} />
                  <DetailItem
                        label={t("viewProfile.labels.heightRange")}
                        value={
                          profile.partnerHeightMin && profile.partnerHeightMax
                            ? `${formatHeight(profile.partnerHeightMin)} – ${formatHeight(profile.partnerHeightMax)}`
                            : ""
                        }
                  />                  
                  <DetailItem label={t("viewProfile.labels.partnerMaritalStatus")} value={profile.partnerMaritalStatus} />
                  <DetailItem label={t("viewProfile.labels.partnerReligion")}      value={profile.partnerReligion} />
                  <DetailItem label={t("viewProfile.labels.partnerCaste")}         value={profile.partnerCaste} />
                  <DetailItem label={t("viewProfile.labels.partnerEducation")}     value={profile.partnerEducation} />
                  <DetailItem label={t("viewProfile.labels.partnerIncome")}        value={profile.partnerIncome} />
                  <DetailItem label={t("viewProfile.labels.partnerLocation")}      value={profile.partnerLocation} />
                  <DetailItem label={t("viewProfile.labels.partnerDiet")}          value={profile.partnerDiet} />
                  <DetailItem label={t("viewProfile.labels.partnerManglik")}       value={profile.partnerManglik} />
                  <DetailItem label={t("viewProfile.labels.preferredSurname")}     value={profile.preferredSurname}/>
                </div>
                {profile.partnerDesc && (
                  <div className="mt-4 pt-4 border-t border-[#f0ede9]">
                    <p className="text-[0.67rem] font-bold tracking-[0.06em] uppercase text-gray-400 mb-2">Description</p>
                    <p className="text-gray-500 text-[0.87rem] leading-[1.75] m-0">{t("viewProfile.partnerDesc")}</p>
                  </div>
                )}
              </SectionCard>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}