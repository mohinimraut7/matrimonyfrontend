import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  MapPin, Briefcase, GraduationCap, Heart, ArrowLeft,
  Star, Lock, CheckCircle
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
    <div
      className="w-full h-full flex items-center justify-center"
      style={{ background: `linear-gradient(145deg, ${g1}, ${g2})` }}
    >
      <span
        className="font-bold tracking-[4px]"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "5rem", color: "rgba(255,255,255,0.82)" }}
      >
        {initials}
      </span>
    </div>
  );
}

function CardTitle({ children }) {
  return (
    <h2
      className="flex items-center gap-2.5 m-0 mb-[1.1rem] text-[1.2rem] font-bold text-[#1c1917] tracking-tight"
      style={{ fontFamily: "'Cormorant Garamond', serif" }}
    >
      <span className="w-[3px] h-5 rounded-[2px] bg-[#c2852a] flex-shrink-0" />
      {children}
    </h2>
  );
}

function DetailItem({ icon, label, value }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-[#f9f7f4] transition-colors">
      {icon && <span className="text-[#c2852a] mt-0.5 flex-shrink-0">{icon}</span>}
      <div>
        <p className="text-[0.67rem] font-bold tracking-[0.06em] uppercase text-gray-400 m-0 mb-0.5">{label}</p>
        <p className="text-[0.83rem] font-semibold text-[#1c1917] m-0">{value}</p>
      </div>
    </div>
  );
}

export default function ViewProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { addToShortlist, isShortlisted } = useShortlist();
  const { sendInterest, hasSentInterest } = useInterest();
  const [isUnlocked, setIsUnlocked] = useState(false);

  // ✅ Real API state
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // ✅ Fetch profile by ID from API
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await axiosInstance.get(`/users/${id}/profile`);
        const u = res.data.user;

        // Map backend fields to UI fields
        setProfile({
          id:            u._id,
          name:          u.fullName || u.userName,
          age:           u.dob ? Math.floor((new Date() - new Date(u.dob)) / 31557600000) : null,
          height:        u.height || "",
          photo:         u.photos?.[0] || null,
          city:          u.currentCity || u.city || "",
          country:       u.country || "",
          religion:      u.religion || "",
          caste:         u.caste || "",
          maritalStatus: u.maritalStatus || "",
          diet:          u.diet || "",
          about:         u.about || "",
          working:       u.employmentType || "",
          // Professional
          profession:    u.occupation || "",
          jobRole:       u.occupation || "",
          workingSector: u.employmentType || "",
          annualIncome:  u.income || "",
          workLocation:  u.workLocation || "",
          workType:      u.employmentType || "",
          // Education
          education:     u.education || "",
          fieldOfStudy:  u.fieldOfStudy || "",
          college:       u.college || "",
          // Lifestyle
          hobbies:       Array.isArray(u.hobbies) ? u.hobbies.join(", ") : u.hobbies || "",
          languages:     Array.isArray(u.languages) ? u.languages.join(", ") : u.languages || "",
          // Family
          fatherName:    u.fatherName || "",
          motherName:    u.motherName || "",
          familyType:    u.familyType || "",
          siblings:      u.brothers || u.sisters
            ? `${u.brothers || 0} Brothers, ${u.sisters || 0} Sisters`
            : "",
          // Partner preferences
          preferences:   u.partnerDesc || "",
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

  const shouldBlur = false; // Lock feature hatavli — real users la lock nako

  // ✅ Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9f7f4]">
        <p className="text-gray-400 text-sm">Loading profile...</p>
      </div>
    );
  }

  // ✅ Error / not found
  if (error || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9f7f4]">
        <div className="text-center">
          <p className="text-gray-500">{t("viewProfile.profileNotFound")}</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 text-[#c2852a] bg-transparent border-none cursor-pointer text-[0.85rem]"
          >
            ← {t("viewProfile.goBack")}
          </button>
        </div>
      </div>
    );
  }

  const lbl = (key) => t(`viewProfile.labels.${key}`);

  return (
    <>
      <div className="min-h-screen px-6 pt-8 pb-16 mt-12">
        <div className="max-w-[1200px] mx-auto">

          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 mb-6 text-gray-500 text-[0.8rem] font-medium bg-white border border-[#ede8e1] rounded-lg px-3.5 py-1.5 cursor-pointer hover:text-[#c2852a] hover:border-[#e8c98a] transition-colors"
          >
            <ArrowLeft size={13} /> {t("viewProfile.backBtn")}
          </button>

          {/* Two-column grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 items-start">

            {/* ── LEFT COLUMN ── */}
            <div className="lg:sticky lg:top-20">
              <div className="bg-white border border-[#ede8e1] rounded-2xl overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.06)]">

                {/* Photo */}
                <div className="relative aspect-[3/4] bg-[#f0ece7] overflow-hidden">
                  {profile.photo
                    ? <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover" />
                    : <AvatarPlaceholder name={profile.name} />
                  }
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(28,25,23,0.28) 0%, transparent 50%)" }}
                  />

                  {/* Verified badge */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-[0.65rem] font-semibold tracking-[0.03em] bg-white/90 text-[#1c1917] border border-[#ede8e1] backdrop-blur-sm">
                    <CheckCircle size={16} className="text-blue-500" fill="currentColor" stroke="white" strokeWidth={3} />
                    {t("viewProfile.verified")}
                  </div>
                </div>

                {/* Name strip */}
                <div className="bg-[#1c1917] px-5 pt-5 pb-4">
                  <h1
                    className="m-0 mb-1 text-white font-bold tracking-tight leading-tight text-[1.55rem]"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {profile.name}{profile.age ? `, ${profile.age}` : ""}
                  </h1>
                  <div className="flex items-center gap-1 text-white/55 text-[0.78rem]">
                    <MapPin size={12} />
                    <span>{profile.city}{profile.country ? `, ${profile.country}` : ""}</span>
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
                </div>

                {/* Action buttons */}
                <div className="px-5 pt-4 pb-5 flex flex-col gap-2">

                  {/* Send Interest */}
                  <button
                    disabled={hasSentInterest(profile.id)}
                    onClick={() => sendInterest(profile)}
                    className={`w-full py-3 rounded-xl text-[0.82rem] font-semibold flex items-center justify-center gap-1.5 tracking-wide transition-all ${
                      hasSentInterest(profile.id)
                        ? "bg-green-100 text-green-700 cursor-not-allowed"
                        : "bg-[#1c1917] text-white hover:opacity-85 cursor-pointer"
                    }`}
                  >
                    <Heart
                      size={13}
                      fill={hasSentInterest(profile.id) ? "none" : "white"}
                      className={hasSentInterest(profile.id) ? "text-green-600" : ""}
                    />
                    {hasSentInterest(profile.id)
                      ? t("viewProfile.interestSent")
                      : t("viewProfile.sendInterest")}
                  </button>

                  {/* Shortlist */}
                  <button
                    onClick={() => addToShortlist(profile)}
                    className={`w-full py-2.5 rounded-xl text-[0.82rem] font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                      isShortlisted(profile.id)
                        ? "bg-[#fdf3e3] border-[1.5px] border-[#e8c98a] text-[#c2852a]"
                        : "bg-white border-[1.5px] border-[#e5e0d8] text-gray-500 hover:border-[#c2852a] hover:text-[#c2852a]"
                    }`}
                  >
                    <Star
                      size={12}
                      fill={isShortlisted(profile.id) ? "#c2852a" : "none"}
                      stroke={isShortlisted(profile.id) ? "#c2852a" : "currentColor"}
                    />
                    {isShortlisted(profile.id)
                      ? t("viewProfile.shortlisted")
                      : t("viewProfile.shortlist")}
                  </button>

                </div>
              </div>
            </div>

            {/* ── RIGHT COLUMN ── */}
            <div className="flex flex-col gap-5">

              {/* About */}
              {profile.about && (
                <div className="bg-white border border-[#ede8e1] rounded-2xl p-7 shadow-[0_2px_10px_rgba(0,0,0,0.045)]">
                  <CardTitle>{t("viewProfile.aboutTitle")}</CardTitle>
                  <p className="text-gray-500 text-[0.87rem] leading-[1.75] m-0">{profile.about}</p>
                  {profile.preferences && (
                    <>
                      <div className="h-px bg-[#f0ede9] my-[1.1rem]" />
                      <CardTitle>{t("viewProfile.preferencesTitle")}</CardTitle>
                      <p className="text-gray-500 text-[0.87rem] leading-[1.75] m-0">{profile.preferences}</p>
                    </>
                  )}
                </div>
              )}

              {/* Professional Details */}
              <div className="bg-white border border-[#ede8e1] rounded-2xl p-7 shadow-[0_2px_10px_rgba(0,0,0,0.045)]">
                <CardTitle>{t("viewProfile.professionalTitle")}</CardTitle>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-1">
                  <DetailItem icon={<Briefcase size={13} />} label={lbl("profession")}   value={profile.profession} />
                  <DetailItem icon={<Briefcase size={13} />} label={lbl("annualIncome")} value={profile.annualIncome} />
                  <DetailItem icon={<MapPin size={13} />}    label={lbl("workLocation")} value={profile.workLocation} />
                  <DetailItem icon={<Briefcase size={13} />} label={lbl("workType")}     value={profile.workType} />
                </div>
              </div>

              {/* Education */}
              <div className="bg-white border border-[#ede8e1] rounded-2xl p-7 shadow-[0_2px_10px_rgba(0,0,0,0.045)]">
                <CardTitle>{t("viewProfile.educationTitle")}</CardTitle>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-1">
                  <DetailItem icon={<GraduationCap size={13} />} label={lbl("education")}    value={profile.education} />
                  <DetailItem icon={<GraduationCap size={13} />} label="Field of Study"      value={profile.fieldOfStudy} />
                  <DetailItem icon={<GraduationCap size={13} />} label="College"             value={profile.college} />
                  <DetailItem label={lbl("hobbies")} value={profile.hobbies} />
                  <DetailItem label="Languages"      value={profile.languages} />
                </div>
              </div>

              {/* Family Details */}
              <div className="bg-white border border-[#ede8e1] rounded-2xl p-7 shadow-[0_2px_10px_rgba(0,0,0,0.045)]">
                <CardTitle>{t("viewProfile.familyTitle")}</CardTitle>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-1">
                  <DetailItem label={lbl("fatherName")} value={profile.fatherName} />
                  <DetailItem label={lbl("motherName")} value={profile.motherName} />
                  <DetailItem label={lbl("siblings")}   value={profile.siblings} />
                  <DetailItem label={lbl("familyType")} value={profile.familyType} />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
