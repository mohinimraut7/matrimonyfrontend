// import { useState } from "react";
// import { useProfile } from "../context/ProfileContext";
// import { useTranslation } from "react-i18next";

// export default function ProfileBanner({ onOpen, onDismiss }) {
//   const [gone, setGone] = useState(false);
//   const { profileData } = useProfile();
//   const { t } = useTranslation();

//   const isLoggedIn = !!profileData;
//   const completionPercent = profileData?.completionPercent ?? 0;
//   const isProfileComplete = completionPercent >= 100;

//   if (!isLoggedIn || isProfileComplete || gone) return null;

//   return (
//     <div
//       className="w-full fixed top-[52px] md:top-[64px] left-0 right-0 z-40"
//       style={{
//         background: "#fdf6ec",
//         borderBottom: "1px solid #f0ddb8",
//         boxShadow: "0 2px 8px rgba(194,133,42,0.08)",
//       }}
//     >
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 flex items-center gap-3 flex-wrap">

//         <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
//           style={{ background: "rgba(194,133,42,0.12)" }}>
//           <span className="text-xs">👤</span>
//         </div>

//         <div className="hidden sm:flex flex-1 min-w-0">
//           <span className="text-[0.81rem] font-semibold text-[#1c1917]">
//             {t("profileBanner.heading")}
//           </span>
//           <span className="text-[0.81rem] text-[#7a6d5e]">
//             {t("profileBanner.subtext")}
//           </span>
//         </div>

//         <div className="flex-1 sm:hidden" />

//         <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
//           <div className="w-24 h-1.5 bg-[#f0ddb8] rounded-full overflow-hidden">
//             <div
//               className="h-full bg-[#c2852a] rounded-full transition-all duration-500"
//               style={{ width: `${completionPercent}%` }}
//             />
//           </div>
//           <span className="text-[0.7rem] font-bold text-[#c2852a]">
//             {completionPercent}%
//           </span>
//         </div>

//         <button
//           onClick={onOpen}
//           className="flex-shrink-0 text-white text-[0.77rem] font-semibold px-4 py-1.5 rounded-lg transition-colors duration-200 cursor-pointer border-none"
//           style={{ background: "#c2852a" }}
//           onMouseEnter={e => e.currentTarget.style.background = "#a8701f"}
//           onMouseLeave={e => e.currentTarget.style.background = "#c2852a"}
//         >
//           {t("profileBanner.cta")}
//         </button>

//         <button
//           onClick={() => { setGone(true); onDismiss?.(); }}
//           className="flex-shrink-0 text-lg leading-none cursor-pointer bg-transparent border-none p-0 transition-colors"
//           style={{ color: "#c0b0a0" }}
//           onMouseEnter={e => e.currentTarget.style.color = "#7a6d5e"}
//           onMouseLeave={e => e.currentTarget.style.color = "#c0b0a0"}
//           aria-label="Dismiss"
//         >×</button>

//       </div>
//     </div>
//   );
// }







import { useState } from "react";
import { useProfile } from "../context/ProfileContext";
import { useTranslation } from "react-i18next";

const REQUIRED_FIELDS = [
  "firstName", "lastName", "dob", "gender", "maritalStatus", "profileFor",
  "height", "weight", "motherTongue", "religion", "caste", "community",
  "currentCity", "currentState",
  "fatherName", "motherName", "familyType", "familyValues",
  "education", "occupation", "income",
  "diet", "smoking", "drinking",
  "partnerAgeMin", "partnerAgeMax", "partnerReligion", "partnerEducation",
];

function calcCompletion(data) {
  if (!data) return 0;
  const filled = REQUIRED_FIELDS.filter(key => {
    const val = data[key];
    if (Array.isArray(val)) return val.length > 0;
    return val !== "" && val !== null && val !== undefined;
  });
  return Math.round((filled.length / REQUIRED_FIELDS.length) * 100);
}

export default function ProfileBanner({ onOpen, onDismiss }) {
  const [gone, setGone] = useState(false);
  const { profileData, isLoggedIn } = useProfile(); // ✅ isLoggedIn from context
  const { t } = useTranslation();

  const completionPercent = calcCompletion(profileData);
  const isProfileComplete = completionPercent >= 100;

  if (!isLoggedIn || isProfileComplete || gone) return null;

  return (
    <div
      className="w-full fixed top-[52px] md:top-[64px] left-0 right-0 z-40"
      style={{
        background: "#fdf6ec",
        borderBottom: "1px solid #f0ddb8",
        boxShadow: "0 2px 8px rgba(194,133,42,0.08)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 flex items-center gap-3 flex-wrap">

        <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(194,133,42,0.12)" }}>
          <span className="text-xs">👤</span>
        </div>

        <div className="hidden sm:flex flex-1 min-w-0">
          <span className="text-[0.81rem] font-semibold text-[#1c1917]">
            {t("profileBanner.heading")}
          </span>
          <span className="text-[0.81rem] text-[#7a6d5e]">
            {t("profileBanner.subtext")}
          </span>
        </div>

        <div className="flex-1 sm:hidden" />

        <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
          <div className="w-24 h-1.5 bg-[#f0ddb8] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#c2852a] rounded-full transition-all duration-500"
              style={{ width: `${completionPercent}%` }}
            />
          </div>
          <span className="text-[0.7rem] font-bold text-[#c2852a]">
            {completionPercent}%
          </span>
        </div>

        <button
          onClick={onOpen}
          className="flex-shrink-0 text-white text-[0.77rem] font-semibold px-4 py-1.5 rounded-lg transition-colors duration-200 cursor-pointer border-none"
          style={{ background: "#c2852a" }}
          onMouseEnter={e => e.currentTarget.style.background = "#a8701f"}
          onMouseLeave={e => e.currentTarget.style.background = "#c2852a"}
        >
          {t("profileBanner.cta")}
        </button>

        <button
          onClick={() => { setGone(true); onDismiss?.(); }}
          className="flex-shrink-0 text-lg leading-none cursor-pointer bg-transparent border-none p-0 transition-colors"
          style={{ color: "#c0b0a0" }}
          onMouseEnter={e => e.currentTarget.style.color = "#7a6d5e"}
          onMouseLeave={e => e.currentTarget.style.color = "#c0b0a0"}
          aria-label="Dismiss"
        >×</button>

      </div>
    </div>
  );
}