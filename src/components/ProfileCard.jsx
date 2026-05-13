import { useNavigate } from "react-router-dom";
import { MapPin, Briefcase, Eye } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ProfileCard({ profile }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <article
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 hover:border-indigo-100 transition-all duration-300 hover:-translate-y-1 group"
      aria-label={`Profile of ${profile.name}`}
    >
      {/* Image Section */}
      <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 overflow-hidden">
        {profile.photo ? (
          <>
            <img
              src={profile.photo}
              alt={`${profile.name}'s profile`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-24 h-24 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
              <span className="text-4xl font-bold bg-gradient-to-br from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {profile.name.charAt(0)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">

        {/* Name + Age */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 tracking-tight">
            {profile.name}
            <span className="text-gray-500 font-semibold">, {profile.age}</span>
          </h3>
        </div>

        {/* Profession & City */}
        <div className="space-y-2">
          {profile.profession && (
            <p className="flex items-center gap-2 text-sm text-gray-700 font-medium">
              <Briefcase size={16} className="text-gray-400 flex-shrink-0" strokeWidth={2} />
              <span className="truncate">{profile.profession}</span>
            </p>
          )}
          {profile.city && (
            <p className="flex items-center gap-2 text-sm text-gray-500">
              <MapPin size={16} className="text-gray-400 flex-shrink-0" strokeWidth={2} />
              <span className="truncate">{profile.city}</span>
            </p>
          )}
        </div>

        {/* CTA Button */}
        <button
          onClick={() => navigate(`/profile/${profile.id}`)}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/30 active:scale-[0.98] transition-all duration-200"
          aria-label={`View ${profile.name}'s full profile`}
        >
          <Eye size={18} strokeWidth={2.5} />
          <span>{t("profileCard.viewProfile")}</span>
        </button>
      </div>
    </article>
  );
}