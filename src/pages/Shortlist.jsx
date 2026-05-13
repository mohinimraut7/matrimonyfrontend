import { useShortlist } from "../context/ShortlistContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Heart, MapPin, Briefcase, BookOpen, Trash2, Star } from "lucide-react";

const AVATAR_BG = [
  ["#d4cfc9","#b8b0a6"],["#c9cfd4","#a6b0b8"],["#cfd4cc","#adb8a8"],
  ["#d4cac9","#b8a6a6"],["#cccfd4","#a8adb8"],["#d4d1c9","#b8b3a6"],
];

function AvatarPlaceholder({ name }) {
  const initials = name?.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  const [g1, g2] = AVATAR_BG[initials?.charCodeAt(0) % AVATAR_BG.length];
  return (
    <div className="w-full h-full flex items-center justify-center" style={{ background: `linear-gradient(145deg, ${g1}, ${g2})` }}>
      <span className="text-[3.2rem] font-bold tracking-[3px]" style={{ fontFamily: "'Cormorant Garamond', serif", color: "rgba(255,255,255,0.82)" }}>
        {initials}
      </span>
    </div>
  );
}

export default function Shortlist() {
  const { shortlist, removeFromShortlist } = useShortlist();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      {shortlist.length === 0 ? (
        <div className="min-h-screen  flex items-center justify-center mt-12 font-sans">
          <div className="text-center p-12 bg-white border border-[#ede8e1] rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.05)] max-w-[340px]">
            <div className="w-14 h-14 rounded-[14px] bg-[#fdf3e3] border border-[#e8c98a] flex items-center justify-center mx-auto mb-5">
              <Star size={22} className="text-[#c2852a]" />
            </div>
            <h2 className="text-[1.4rem] font-bold text-[#1c1917] mb-2 tracking-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {t("shortlist.emptyTitle")}
            </h2>
            <p className="text-[0.82rem] text-gray-400 mb-6 leading-relaxed">{t("shortlist.emptyDesc")}</p>
            <button onClick={() => navigate("/matches")} className="px-6 py-2.5 bg-[#1c1917] text-white border-none rounded-xl text-[0.82rem] font-semibold cursor-pointer hover:opacity-80 transition-opacity tracking-wide">
              {t("shortlist.browseBtn")}
            </button>
          </div>
        </div>
      ) : (
        <div className="min-h-screen px-6 pt-10 pb-16 mt-12">
          <div className="max-w-[1200px] mx-auto">

            <div className="flex items-end justify-between flex-wrap gap-3 mb-8 pb-6 border-b border-[#ede8e1]">
              <div>
                <span className="block text-[0.7rem] font-bold tracking-[0.12em] uppercase text-[#c2852a] mb-1">{t("shortlist.tag")}</span>
                <h1 className="text-[clamp(1.7rem,3vw,2.2rem)] font-bold text-[#1c1917] tracking-tight leading-[1.1] m-0" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {t("shortlist.title")}
                </h1>
                <p className="text-[0.78rem] text-gray-400 mt-1">
                  <span className="font-semibold text-gray-700">{shortlist.length}</span>{" "}
                  {shortlist.length === 1 ? t("shortlist.profileSaved") : t("shortlist.profilesSaved")}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
              {shortlist.map((profile) => (
                <div key={profile.id} className="bg-white border border-[#ede8e1] rounded-2xl overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.05)] hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(0,0,0,0.09)] transition-all duration-200">
                  <div className="relative h-[200px] bg-[#f0ece7] overflow-hidden cursor-pointer" onClick={() => navigate(`/profile/${profile.id}`)}>
                    <div className="w-full h-full transition-transform duration-[400ms] hover:scale-[1.04]">
                      {profile.photo ? <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover" /> : <AvatarPlaceholder name={profile.name} />}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(28,25,23,0.3)] to-transparent" />
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1 bg-[#c2852a] text-white text-[0.62rem] font-bold px-2.5 py-[3px] rounded-full tracking-wide">
                      <Star size={8} fill="white" /> {t("shortlist.badge")}
                    </div>
                  </div>

                  <div className="p-3.5">
                    <h2 className="text-[1.05rem] font-bold text-[#1c1917] tracking-tight leading-tight m-0 mb-0.5 cursor-pointer hover:text-[#c2852a] transition-colors" style={{ fontFamily: "'Cormorant Garamond', serif" }} onClick={() => navigate(`/profile/${profile.id}`)}>
                      {profile.name}
                    </h2>
                    <p className="text-[0.71rem] text-gray-400 font-normal m-0 mb-2.5">{profile.age} yrs{profile.height ? ` · ${profile.height}` : ""}</p>

                    <div className="flex flex-col gap-1.5 mb-3">
                      {profile.city && <div className="flex items-center gap-1.5 text-gray-500 text-[0.74rem] overflow-hidden"><MapPin size={10} className="text-[#c2852a] flex-shrink-0" /><span className="whitespace-nowrap overflow-hidden text-ellipsis">{profile.city}{profile.country ? `, ${profile.country}` : ""}</span></div>}
                      {profile.profession && <div className="flex items-center gap-1.5 text-gray-500 text-[0.74rem] overflow-hidden"><Briefcase size={10} className="text-[#c2852a] flex-shrink-0" /><span className="whitespace-nowrap overflow-hidden text-ellipsis">{profile.profession}</span></div>}
                      {profile.religion && <div className="flex items-center gap-1.5 text-gray-500 text-[0.74rem] overflow-hidden"><BookOpen size={10} className="text-[#c2852a] flex-shrink-0" /><span className="whitespace-nowrap overflow-hidden text-ellipsis">{profile.religion}{profile.caste ? ` · ${profile.caste}` : ""}</span></div>}
                    </div>

                    <div className="h-px bg-[#f3efe9] mb-3" />
                    <div className="flex gap-1.5">
                      <button onClick={() => navigate(`/profile/${profile.id}`)} className="flex-1 py-1.5 px-2.5 rounded-lg border-none bg-[#1c1917] text-white text-[0.72rem] font-semibold flex items-center justify-center gap-1 tracking-wide hover:opacity-80 transition-opacity cursor-pointer">
                        <Heart size={11} fill="white" /> {t("shortlist.viewBtn")}
                      </button>
                      <button onClick={() => removeFromShortlist(profile.id)} className="py-1.5 px-3 rounded-lg border border-red-200 bg-red-50 text-red-500 text-[0.72rem] font-semibold flex items-center justify-center gap-1 hover:bg-red-100 hover:border-red-400 transition-all cursor-pointer">
                        <Trash2 size={11} /> {t("shortlist.removeBtn")}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
