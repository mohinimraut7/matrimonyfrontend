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
          name:            u.fullName || u.userName,
          age:             u.dob ? Math.floor((new Date() - new Date(u.dob)) / 31557600000) : null,
          dob:             u.dob ? new Date(u.dob).toLocaleDateString("en-IN") : "",
          height:          u.height || "",
          weight:          u.weight || "",
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
          brothers:        u.brothers !== undefined ? `${u.brothers}` : "",
          sisters:         u.sisters !== undefined ? `${u.sisters}` : "",
          brothersMarried: u.brothersMarried !== undefined ? `${u.brothersMarried}` : "",
          sistersMarried:  u.sistersMarried !== undefined ? `${u.sistersMarried}` : "",
          familyType:      u.familyType || "",
          familyValues:    u.familyValues || "",
          familyStatus:    u.familyStatus || "",
          familyLocation:  u.familyLocation || "",
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
          <p className="text-gray-400 text-sm">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9f7f4]">
        <div className="text-center">
          <p className="text-gray-500">Profile not found.</p>
          <button onClick={() => navigate(-1)}
            className="mt-4 text-[#c2852a] bg-transparent border-none cursor-pointer text-[0.85rem]">
            ← Go Back
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
          <ArrowLeft size={13} /> Back
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
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-[0.65rem] font-semibold bg-white/90 text-[#1c1917] border border-[#ede8e1] backdrop-blur-sm">
                  <CheckCircle size={16} className="text-blue-500" fill="currentColor" stroke="white" strokeWidth={3} />
                  Verified
                </div>
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
                  {hasSentInterest(profile.id) ? "Interest Sent" : "Send Interest"}
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
                  {isShortlisted(profile.id) ? "Shortlisted" : "Shortlist"}
                </button>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="flex flex-col gap-5">

            {/* About */}
            {profile.about && (
              <SectionCard icon={<User size={14} />} title="About">
                <p className="text-gray-500 text-[0.87rem] leading-[1.75] m-0">{profile.about}</p>
              </SectionCard>
            )}

            {/* Basic Details */}
            <SectionCard icon={<User size={14} />} title="Basic Details">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
                <DetailItem label="Date of Birth"    value={profile.dob} />
                <DetailItem label="Height"           value={profile.height} />
                <DetailItem label="Weight"           value={profile.weight} />
                <DetailItem label="Body Type"        value={profile.bodyType} />
                <DetailItem label="Complexion"       value={profile.complexion} />
                <DetailItem label="Marital Status"   value={profile.maritalStatus} />
                <DetailItem label="Profile For"      value={profile.profileFor} />
                <DetailItem label="Mother Tongue"    value={profile.motherTongue} />
                <DetailItem label="Nationality"      value={profile.nationality} />
                <DetailItem label="Mobile"         value={profile.mobile} />  {/* ✅ add */}
                <DetailItem label="Current City"    value={profile.city} />         {/* ✅ */}
                <DetailItem label="Current State"   value={profile.currentState} /> {/* ✅ */}
                <DetailItem label="Country"         value={profile.country} />      {/* ✅ */}
              </div>
            </SectionCard>

            {/* Astrology */}
            {(profile.rashi || profile.nakshatra || profile.gotra || profile.manglik) && (
              <SectionCard icon={<span className="text-sm">🔯</span>} title="Astrology">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
                  <DetailItem label="Birth City"  value={profile.birthCity} />
                  <DetailItem label="Birth Time"  value={profile.birthTime} />
                  <DetailItem label="Rashi"       value={profile.rashi} />
                  <DetailItem label="Nakshatra"   value={profile.nakshatra} />
                  <DetailItem label="Gotra"       value={profile.gotra} />
                  <DetailItem label="Manglik"     value={profile.manglik} />
                </div>
              </SectionCard>
            )}

            {/* Religion */}
            <SectionCard icon={<span className="text-sm">🕌</span>} title="Religion & Community">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
                <DetailItem label="Religion"            value={profile.religion} />
                <DetailItem label="Caste"               value={profile.caste} />
                <DetailItem label="Sub Caste"           value={profile.subCaste} />
                <DetailItem label="Caste No Bar"        value={profile.casteNoBar} />
                <DetailItem label="Religious Practice"  value={profile.religiousPractice} />
                <DetailItem label="Community"           value={profile.community} />
              </div>
            </SectionCard>

            {/* Professional */}
            <SectionCard icon={<Briefcase size={14} />} title="Professional Details">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
                <DetailItem label="Occupation"       value={profile.occupation} />
                <DetailItem label="Employment Type"  value={profile.employmentType} />
                <DetailItem label="Company"          value={profile.company} />
                <DetailItem label="Annual Income"    value={profile.income} />
                <DetailItem label="Work Location"    value={profile.workLocation} />
              </div>
            </SectionCard>

            {/* Education */}
            <SectionCard icon={<GraduationCap size={14} />} title="Education">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
                <DetailItem label="Education"      value={profile.education} />
                <DetailItem label="Field of Study" value={profile.fieldOfStudy} />
                <DetailItem label="College"        value={profile.college} />
              </div>
            </SectionCard>

            {/* Lifestyle */}
            <SectionCard icon={<Leaf size={14} />} title="Lifestyle">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
                <DetailItem label="Diet"      value={profile.diet} />
                <DetailItem label="Smoking"   value={profile.smoking} />
                <DetailItem label="Drinking"  value={profile.drinking} />
                <DetailItem label="Fitness"   value={profile.fitness} />
                <DetailItem label="Vehicle"   value={profile.vehicle} />
                <DetailItem label="Property"  value={profile.property} />
              </div>
              {profile.hobbies && (
                <div className="mt-3">
                  <p className="text-[0.67rem] font-bold tracking-[0.06em] uppercase text-gray-400 mb-2">Hobbies</p>
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
                  <p className="text-[0.67rem] font-bold tracking-[0.06em] uppercase text-gray-400 mb-2">Languages</p>
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
            <SectionCard icon={<Users size={14} />} title="Family Details">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
                <DetailItem label="Father's Name"        value={profile.fatherName} />
                <DetailItem label="Father's Occupation"  value={profile.fatherOccupation} />
                <DetailItem label="Mother's Name"        value={profile.motherName} />
                <DetailItem label="Mother's Occupation"  value={profile.motherOccupation} />
                <DetailItem label="Brothers"             value={profile.brothers} />
                <DetailItem label="Brothers Married"     value={profile.brothersMarried} />
                <DetailItem label="Sisters"              value={profile.sisters} />
                <DetailItem label="Sisters Married"      value={profile.sistersMarried} />
                <DetailItem label="Family Type"          value={profile.familyType} />
                <DetailItem label="Family Values"        value={profile.familyValues} />
                <DetailItem label="Family Status"        value={profile.familyStatus} />
                <DetailItem label="Family Location"      value={profile.familyLocation} />
              </div>
            </SectionCard>

            {/* Partner Preferences */}
            {(profile.partnerAgeMin || profile.partnerDesc) && (
              <SectionCard icon={<Heart size={14} />} title="Partner Preferences">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
                  <DetailItem label="Age Range"       value={profile.partnerAgeMin && profile.partnerAgeMax ? `${profile.partnerAgeMin} – ${profile.partnerAgeMax}` : ""} />
                  <DetailItem label="Height Range"    value={profile.partnerHeightMin && profile.partnerHeightMax ? `${profile.partnerHeightMin} – ${profile.partnerHeightMax}` : ""} />
                  <DetailItem label="Marital Status"  value={profile.partnerMaritalStatus} />
                  <DetailItem label="Religion"        value={profile.partnerReligion} />
                  <DetailItem label="Caste"           value={profile.partnerCaste} />
                  <DetailItem label="Education"       value={profile.partnerEducation} />
                  <DetailItem label="Income"          value={profile.partnerIncome} />
                  <DetailItem label="Location"        value={profile.partnerLocation} />
                  <DetailItem label="Diet"            value={profile.partnerDiet} />
                  <DetailItem label="Manglik"         value={profile.partnerManglik} />
                </div>
                {profile.partnerDesc && (
                  <div className="mt-4 pt-4 border-t border-[#f0ede9]">
                    <p className="text-[0.67rem] font-bold tracking-[0.06em] uppercase text-gray-400 mb-2">Description</p>
                    <p className="text-gray-500 text-[0.87rem] leading-[1.75] m-0">{profile.partnerDesc}</p>
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