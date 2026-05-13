import { useState } from "react";
import { useProfile } from "../context/ProfileContext";
import { useTranslation } from "react-i18next";

export default function ProfileBanner({ onOpen, onDismiss }) {
  const [gone, setGone] = useState(false);
  const { profileData } = useProfile();
  const { t } = useTranslation();

  
  const isSaved = profileData?.firstName && profileData.firstName.trim() !== "";
  if (gone || isSaved) return null;

  return (
    <div
  className="w-full z-40 sticky top-[52px] md:top-[64px]" 
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

    {/* Hide text on mobile, show on sm+ */}
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
        <div className="h-full bg-[#c2852a] rounded-full" style={{ width: "0%" }} />
      </div>
      <span className="text-[0.7rem] font-bold text-[#c2852a]">0%</span>
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


